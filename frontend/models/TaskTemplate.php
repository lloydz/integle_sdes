<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "task_template".
 *
 * @property integer $id
 * @property integer $task_id
 * @property string $to
 * @property string $subject
 * @property string $body
 * @property integer $attachment
 * @property string $attachment_excel_col
 */
class TaskTemplate extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'task_template';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['task_id', 'attachment'], 'integer'],
            [['body'], 'string'],
            [['to', 'subject'], 'string', 'max' => 255],
            [['attachment_excel_col'], 'string', 'max' => 16],
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
            'attachment' => 'Attachment',
            'attachment_excel_col' => 'Attachment Excel Col',
        ];
    }
}
