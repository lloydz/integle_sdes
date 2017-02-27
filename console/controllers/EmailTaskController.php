<?php
namespace console\controllers;

use yii\console\Controller;
use frontend\models\EmailTask;
use frontend\tools\ExcelTool;
use frontend\models\TaskTemplate;
use frontend\models\TaskTransport;

class EmailTaskController extends Controller{
    
    function actionIndex() {
    
        //准备启动服务
        \Yii::info('**********************');
    }
    
    public function actionStart() {
        //准备启动服务
        echo '***********************';
        
        // 获取一条待执行的邮件任务
        $taskModel = new EmailTask();
        $task = $taskModel->pickATask();
        if(empty($task)) {
            return true;
        }
        $taskId = $task['id'];
        
        // 获取任务对应的Excel文件
        $excelFile = \Yii::$app->params['file_upload_path'] . $task['file_path'] . '\\' . $task['excel_file'];
        if(!file_exists($excelFile)) {
            return false;
        }
        
        // 读取Excel文件
        $fileType = '';
        if(function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
        }
        if(isset($finfo)) {
            $fileType = finfo_file($finfo, $excelFile);
        }
        $excel = new ExcelTool(ExcelTool::READ, $excelFile, $fileType);
        $excelData = $excel->readExcel($excelFile);
        
        $emailCount = count($excelData) - 2;
        $taskModel->UpdateTaskById($taskId, [
            'total_emails' => count($excelData) - 2
        ]);
        
        $titleList = $excelData[0];
        unset($excelData[0]);
        
        $this->_sendEmails($taskId, $excelData);
    }
    
    private function _sendEmails($taskId, $excelData) {
        //
        $task = (new EmailTask())->findOne($taskId);
        
        // 获取transport
        $transport = (new TaskTransport())->findOne([
            'task_id' => $taskId
        ]);
        if(empty($transport)) {
            return false;
        }
        
        // 设置transport
        \Yii::$app->mailer->setTransport([
            'class' => 'Swift_SmtpTransport',
            'host' => $transport['host'],
            'username' => $transport['username'],
            'password' => $transport['password'],
            'port' => $transport['port'],
            'encryption' => $transport['encryption'],
        ]);
        
        // 获取邮件任务模板
        $template = (new TaskTemplate())->findOne([
            'task_id' => $taskId
        ]);
        if(empty($template)) {
            return false;
        }
        
        // 循环发送邮件
        foreach ($excelData as $line => $data){
            foreach ($data as $key => $val) {
                $data[$this->_getABC($key+1)] = $val;
            }
            
            if(!empty($data[0])) {
                $mail = \Yii::$app->mailer->compose();
                $mail->setFrom($transport['username']);
                $mail->setTo($data[0]);
                $mail->setSubject($template['subject']);
                $mail->setHtmlBody($this->_handleTemplateStr($template['body'], $data));
                if($mail->send()) {
                    echo 'send successed!';
                    $task->updateCounters([
                        'succ_emails' => 1
                    ]);
                } else {
                    echo 'send failed...';
                    $task->updateCounters([
                        'fail_emails' => 1
                    ]);
                }
            }
        }
        
        // var_dump($excelData);
    }
    
    /**
     * 处理模板字符串，将字符串中的模板部分替换为对应的数据，如{{A1}}替换为$data['A1']
     * 
     * @author zhu huajun <huajun.h.zhu@integle.com>
     * @param str $str
     * @param array $data
     * @copyright 2017年2月24日 下午3:01:36
     */
    private function _handleTemplateStr($str, $data) {
        $matches = [];
        preg_match_all('/{{[a-zA-Z]\d*}}/', $str, $matches);
        $matches = $matches[0];
        foreach($matches as $match) {
            $key = trim(substr($match, 2, strlen($match)-4));
            if(isset($data[$key])) {
                $str = str_replace($match, $data[$key], $str);
            }
        }
        return $str;
    }
    
    /**
     * 根据序号转换成Excel头
     * @param $index    数字序号
     * @return string   Excel头
     */
    private function _getABC($index){
        $ABC[0] = chr(90);
        for($i = 65; $i< 90; $i++){
            $ABC[$i-64] = chr($i);
        }
    
        $str = '';
        while($index > 0){
            $remainder = $index % 26;
            $str = $ABC[$remainder] . $str;
            if (0 == $index%26)
                --$index;
                $index = intval($index/26);
        }
    
        return $str;
    }
}