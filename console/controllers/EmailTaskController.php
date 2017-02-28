<?php
namespace console\controllers;

use frontend\models\TaskResult;
use yii\console\Controller;
use frontend\models\EmailTask;
use frontend\tools\ExcelTool;
use frontend\models\TaskTemplate;
use frontend\models\TaskTransport;
use yii\base\Exception;

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
        
        $emailCount = count($excelData) - 1;
        $taskModel->UpdateTaskById($taskId, [
            'total_emails' => count($excelData) - 1
        ]);
        
//         $titleList = $excelData[0];
//         unset($excelData[0]);
        $this->_sendEmails($taskId, $excelData);

        $taskModel->UpdateTaskById($taskId, [
            'task_status' => 3
        ]);
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
            'port' => 25,
            'encryption' => $transport['encryption'],
        ]);
        
        // 获取邮件任务模板
        $template = (new TaskTemplate())->findOne([
            'task_id' => $taskId
        ]);
        if(empty($template)) {
            return false;
        }

        $attachments = [];
        if($template['attachment']) {
            $attachmentDir = \Yii::$app->params['file_upload_path'] . $task['file_path'] . '\attachments\\';
            foreach(scandir($attachmentDir) as $file) {
                if($file == '.' || $file == '..') {
                    continue;
                }
                if(is_file($attachmentDir . $file)) {
                    $attachments[] =  $file;
                }
            }
        }
        
        $titleList = $excelData[0];
        unset($excelData[0]);
        // 循环发送邮件
        foreach ($excelData as $line => $data){
            /* var_dump($data);
            foreach ($data as $key => $val) {
                $data[$this->_getABC($key+1)] = $val;
            } */

            if(!empty($data[0])) {
                $from = $transport['username'];
                $to = $data[$template['to'] - 1];
                $subject = $this->_handleTemplateStr($template['subject'], $data, $titleList);
                $htmlBody = $this->_handleTemplateStr($template['body'], $data, $titleList);
                $htmlBody .= '<img src="http://dev.email.integle.com/email/read?task_id='.$taskId.'&to='.$to.'" width="1px" height="1px"/>';
                $emailAttachments = [];

                $mail = \Yii::$app->mailer->compose();
                $mail->setFrom($transport['username']);
                $mail->setTo($to);
                $mail->setSubject($subject);
                $mail->setHtmlBody($htmlBody);
                foreach($attachments as $attachment) {
                    $excelColContent = iconv('UTF-8', 'gbk', $data[$template['attachment_excel_col'] - 1]);
                    if(strpos($attachment, $excelColContent) === 0) {
                        array_push($emailAttachments, iconv('gbk', 'UTF-8', $attachment));
                        $mail->attach($attachmentDir . $attachment, ['fileName' => iconv('gbk', 'UTF-8', $attachment)]);
                    }
                }

                try {
                    if ($mail->send()) {
                        echo 'send successed...';
                        $resultStatus = 1;
                        $task->updateCounters([
                            'succ_emails' => 1
                        ]);
                    } else {
                        $resultStatus = 2;
                        echo 'send failed...';
                        $task->updateCounters([
                            'fail_emails' => 1
                        ]);
                    }
                } catch(\Exception $e) {
                    $resultMsg = $e->getMessage();
                    $resultStatus = 2;
                }

                $taskResultModel = new TaskResult();
                $taskResultModel->setAttributes([
                    'task_id' => $taskId,
                    'to' => $to,
                    'subject' => $subject,
                    'body' => $htmlBody,
                    'attachments' => implode(';', $emailAttachments),
                    'msg' => isset($resultMsg) ? $resultMsg : '',
                    'status' => $resultStatus
                ]);
                $taskResultModel->save();
            }
        }
    }
    
    /**
     * 处理模板字符串，将字符串中的模板部分替换为对应的数据，如{{A1}}替换为$data['A1']
     * 
     * @author zhu huajun <huajun.h.zhu@integle.com>
     * @param str $str
     * @param array $data
     * @copyright 2017年2月24日 下午3:01:36
     */
    private function _handleTemplateStr($str, $data, $titleArr) {
        $matches = [];
        preg_match_all('/{{(.*?)}}/', $str, $matches);
        $matches = $matches[0];
        
        foreach($matches as $match) {
            $key = trim(substr($match, 2, strlen($match)-4));
            foreach ($titleArr as $col => $title) {
                if($title === $key) {
                    $key = $col;
                    break;
                }
            }
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