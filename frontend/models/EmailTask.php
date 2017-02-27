<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "email_task".
 *
 * @property integer $id
 * @property string $task_name
 * @property integer $creater_id
 * @property integer $task_status
 * @property string $file_path
 * @property string $excel_file
 * @property integer $total_emails
 * @property integer $succ_emails
 * @property integer $fail_emails
 * @property integer $read_emails
 */
class EmailTask extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'email_task';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['creater_id', 'task_status', 'total_emails', 'succ_emails', 'fail_emails', 'read_emails'], 'integer'],
            [['task_name', 'file_path', 'excel_file'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'task_name' => 'Task Name',
            'creater_id' => 'Creater ID',
            'task_status' => 'Task Status',
            'file_path' => 'File Path',
            'excel_file' => 'Excel File',
            'total_emails' => 'Total Emails',
            'succ_emails' => 'Succ Emails',
            'fail_emails' => 'Fail Emails',
            'read_emails' => 'Read Emails',
        ];
    }
    
    /**
     * 新建邮件任务
     * 
     * @author zhu huajun <huajun.h.zhu@integle.com>
     * @param unknown $taskData
     * @param unknown $transportData
     * @param unknown $templateData
     * @copyright 2017年2月22日 下午3:04:56
     */
    public function newTask($taskData, $transportData, $templateData) {
        $transaction = \Yii::$app->db->beginTransaction();
        
        $taskModel = new self();
        $taskModel->setAttributes($taskData);
        if(!$taskModel->save()) {
            return $this->modelFail(current($taskModel->getFirstErrors()));
        }
        
        $taskId = $taskModel->id;
        
        $transportModel = new TaskTransport();
        $transportModel->setAttributes($transportData);
        $transportModel->setAttribute('task_id', $taskId);
        if(!$transportModel->save()) {
            $transaction->rollBack();
            return $this->modelFail(current($transportModel->getFirstErrors()));
        }
        
        $templateModel = new TaskTemplate();
        $templateModel->setAttributes($templateData);
        $templateModel->setAttribute('task_id', $taskId);
        if(!$templateModel->save()) {
            $transaction->rollBack();
            return $this->modelFail(current($templateModel->getFirstErrors()));
        }
        
        $transaction->commit();
        
        return $this->modelSuccess('新建任务成功', [
            'task_id' => $taskId
        ]);
    }
    
    /**
     * 
     * 
     * @author zhu huajun <huajun.h.zhu@integle.com>
     * @param unknown $taskId
     * @param unknown $taskData
     * @copyright 2017年2月22日 下午5:30:59
     */
    public function UpdateTaskById($taskId, $taskData) {
        $task = self::findOne([
            'id' => $taskId
            
        ]);
        
        if($task) {
            $task->setAttributes($taskData);
            if(!$task->save()) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * 获取一条等待执行的邮件任务
     * 
     * @author zhu huajun <huajun.h.zhu@integle.com>
     * @copyright 2017年2月22日 下午4:15:01
     */
    public function pickATask() {
        $task = self::findOne([
            'task_status' => 1
        ]);
        
        if($task) {
            // $task['task_status'] = 2;
            if($task->save()) {
                return $task;
            }
        }
        
        return null;
    }
    
    public function modelReturn($status, $msg, $data) {
        return [
            'status' => $status,
            'msg' => $msg,
            'data' => $data
        ];
    }
    
    public function modelSuccess($msg = '', $data) {
        return $this->modelReturn(1, $msg, $data);
    }
    
    public function modelFail($msg, $data = null) {
        return $this->modelReturn(0, $msg, $data);
    }
}
