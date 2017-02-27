<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "task_transport".
 *
 * @property integer $id
 * @property integer $task_id
 * @property string $host
 * @property string $username
 * @property string $password
 * @property integer $port
 * @property string $encryption
 */
class TaskTransport extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'task_transport';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['task_id'], 'required'],
            [['task_id', 'port'], 'integer'],
            [['host', 'username', 'password', 'encryption'], 'string', 'max' => 255],
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
            'host' => 'Host',
            'username' => 'Username',
            'password' => 'Password',
            'port' => 'Port',
            'encryption' => 'Encryption',
        ];
    }
}
