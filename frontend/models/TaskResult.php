<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "task_result".
 *
 * @property integer $id
 * @property integer $task_id
 * @property string $to
 * @property string $subject
 * @property string $body
 * @property string $attachments
 * @property string $msg
 * @property integer $is_read
 * @property string $read_time
 * @property integer $status
 * @property string $create_time
 */
class TaskResult extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'task_result';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['task_id'], 'required'],
            [['task_id', 'is_read', 'status'], 'integer'],
            [['body'], 'string'],
            [['read_time', 'create_time'], 'safe'],
            [['to', 'subject', 'attachments', 'msg'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'task_id' => 'Task ID',
            'to' => 'To',
            'subject' => 'Subject',
            'body' => 'Body',
            'attachments' => 'Attachments',
            'msg' => 'Msg',
            'is_read' => 'Is Read',
            'read_time' => 'Read Time',
            'status' => 'Status',
            'create_time' => 'Create Time',
        ];
    }
}
