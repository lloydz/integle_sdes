<?php
namespace frontend\controllers;

use Yii;
use yii\data\Pagination;
use yii\web\Controller;
use yii\web\UploadedFile;
use yii\helpers\FileHelper;
use frontend\models\EmailTask;
use frontend\tools\ExcelTool;
use yii\helpers\Curl;

class EmailController extends Controller
{
    public $enableCsrfValidation = false;
    public $userInfo = [];
    
    public function beforeAction($action) {
        parent::beforeAction($action);
        
        $this->getUserInfo();
        
        if(empty($this->userInfo)) {
            $this->redirect('http://dev.center.integle.com/user/login?referer=http://dev.email.integle.com/email');
            Yii::$app->end();
        }
        
        // var_dump($this->userInfo);die;
        $session = \Yii::$app->session;
        $session['user_info'] = $this->userInfo;
        return true;
    }
    
    public function getUserInfo() {
        $ticket = isset($_COOKIE['dev_ygu']) ? $_COOKIE['dev_ygu'] : NULL;
        if ($ticket) {
            // 获取用户信息
            $url = 'http://dev.center.integle.com/api/user-info';
            $result = (new Curl())->sendPostCurl($url, [
                'ticket' => $ticket
            ]);
            
            if (isset($result['status']) && (1 == $result['status'])) {
                $this->userInfo = $result['data'];
            }
        }
    }
    
    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex() {
        // echo date('Y-m-d: H:i:s');die;
        /* \Yii::$app->mailer->setTransport([
            'class' => 'Swift_SmtpTransport',
            'host' => 'smtp.163.com',
            'username' => 'zhhjchxy@163.com',
            'password' => 'wy123456',
            'port' => '25',
            'encryption' => 'tls',
        ]);
        
        $mail = \Yii::$app->mailer->compose()
            ->setFrom('zhhjchxy@163.com')
            ->setTo('huajun.h.zhu@integle.com')
            ->setSubject('测试')
            ->attach('\\\\192.168.100.18\uploads\files\attachments\0307\1187\58a7be9350579.pdf', ['fileName' => '1.pdf'])
            ->attach('\\\\192.168.100.18\uploads\files\attachments\0307\1187\58a7be9350579.pdf')
            ->setTextBody('现在时间是' . date('Y-m-d H:i:s'));
        if($mail->send()) {
            echo '邮件发送成功..';
        } else {
            echo '邮件发送失败';
        }
        die; */
        
        return $this->render('index');
    }

    public function actionList() {
        $userTasks = EmailTask::find()->andWhere(['creater_id' => '123456']);
        $pages = new Pagination(['totalCount' =>$userTasks->count(), 'pageSize' => '10']);
        $pageTasks = $userTasks->offset($pages->offset)->limit($pages->limit)->orderBy('id DESC')->asArray()->all();

        return $this->render('list',[
            'tasks' => $pageTasks,
            'pages' => $pages,
        ]);

        $tasks = EmailTask::findAll([
            'creater_id' => 123456
        ]);
        return $this->render('list', ['tasks' => $tasks]);
    }
    
    /**
     * 邮件任务的相关文件上传
     * 
     * @author zhu huajun <huajun.h.zhu@integle.com>
     * @copyright 2017年2月21日 下午2:49:22
     */
    public function actionAjaxFileUpload() {
        // 获取参数
        $isAttachment = \Yii::$app->request->post('is_attachment', 0);
        
        // 所传文件非附件
        if(!$isAttachment) {
            // 生成唯一的任务目录
            $taskDir= uniqid('task_');
            $savePath = \Yii::$app->params['file_upload_path'] . $taskDir . '\\';
            if(!FileHelper::createDirectory($savePath)) {
                return $this->ajaxFail('上传失败');
            }
            
            // 未获取到所上传的文件
            $file = UploadedFile::getInstanceByName('file');
            // var_dump($file);die;
            if(empty($file)) {
                return $this->ajaxFail('上传失败');
            }
            
            $fileType = '';
            if(function_exists('finfo_open')) {
                $finfo = finfo_open(FILEINFO_MIME_TYPE);
            }
            if(isset($finfo)) {
                $fileType = finfo_file($finfo, $file->tempName);
            }
            
            $excel = new ExcelTool(ExcelTool::READ, $file->tempName, $fileType);
            $excelTitle = $excel->readTitle($file->tempName);
            $titles = [];
            foreach ($excelTitle as $key => $title) {
                $titles[$this->_getABC($key)] = $title;
            }
            
            // 保存文件
            // $saveName = uniqid('excel_') . '.' . $file->getExtension();
            $saveName = iconv('UTF-8', 'gbk', $file->name);
            if(!$file->saveAs($savePath . $saveName)) {
                return $this->ajaxFail('上传失败');
            }
            
            return $this->ajaxSuccess('上传成功', [
                'task_dir' => $taskDir,
                'file_name' => $file->name,
                'titles' => $titles
            ]);
        // 所传文件为附件
        } else {
            $taskDir = \Yii::$app->request->post('task_dir');
            if(empty($taskDir)) {
                return $this->ajaxFail('上传失败');
            }
            
            $savePath = \Yii::$app->params['file_upload_path'] . $taskDir . '\\attachments\\';
            if(!FileHelper::createDirectory($savePath)) {
                return $this->ajaxFail('上传失败');
            }
            
            $attachments = UploadedFile::getInstancesByName('attachments');
            if(empty($attachments)) {
                return $this->ajaxFail('上传失败');
            }
            
            foreach ($attachments as $attachment) {
                $saveName = iconv('UTF-8', 'gbk', $attachment->name);
                if(!$attachment->saveAs($savePath . $saveName)) {
                    return $this->ajaxFail('上传失败');
                }
            }
            
            return $this->ajaxSuccess('上传成功', null);
        }
    }
    
    public function actionNewTask() {
        $taskData = \Yii::$app->request->post('task_data');
        $transportData = \Yii::$app->request->post('transport_data');
        $templateData = \Yii::$app->request->post('template_data');
        $result = (new EmailTask())->newTask($taskData, $transportData, $templateData);
        
        return $this->ajaxReturn($result['status'], $result['msg'], $result['data']);
    }

    public function actionRead() {
        $taskId = \Yii::$app->request->get('task_id', 8);
        $reader = \Yii::$app->request->get('reader');

        $task = EmailTask::findOne([
            'id' => $taskId
        ]);
        if($task) {
            $task->updateCounters([
                'read_emails' => 1
            ]);
        }
    }
    
    /**
     * @param $status
     * @param $message
     * @param $data
     * @return object json
     */
    public function ajaxReturn($status, $msg, $data) {
        return \Yii::createObject([
            'class' => 'yii\web\Response',
            'format' => \yii\web\Response::FORMAT_JSON,
            'data' => [
                'status' => $status,
                'msg' => $msg,
                'data' => $data
            ]
        ]);
    }
    
    /**
     * @param $data
     * @return object json
     */
    public function ajaxSuccess($msg = '', $data) {
        return $this->ajaxReturn(1, $msg, $data);
    }
    
    /**
     * @param $message
     * @param $data
     * @return object
     */
    public function ajaxFail($msg, $data = '') {
        return $this->ajaxReturn(0, $msg, $data);
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
