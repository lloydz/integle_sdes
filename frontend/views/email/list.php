<link rel="stylesheet" href="/css/task-list.css"/>
<div style="margin-top: 40px;">
    <table>
        <thead>
            <tr>
                <th>任务名称</th>
                <th>状态</th>
                <th>邮件总数</th>
                <th>完成进度</th>
                <th>成功</th>
                <th>失败</th>
                <th>创建时间</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($tasks as $task):?>
            <tr>
                <td><?=$task['task_name']?></td>
                <td>
                    <?php if($task['task_status'] == 1):?>
                    未开始
                    <?php elseif($task['task_status'] == 2):?>
                    进行中
                    <?php elseif($task['task_status'] == 3):?>
                    已完成
                    <?php endif;?>
                </td>
                <td><?=(($task['task_status'] == 1) ? '' : $task['total_emails'])?></td>
                <td>
                    <?php if($task['task_status'] == 1 || $task['total_emails'] == 0):?>
                    <?php else:?>
                        <?=(($task['succ_emails'] + $task['fail_emails']) / $task['total_emails'] * 100) . '%'?>
                    <?php endif;?>
                </td>
                <td><?=(($task['task_status'] == 1) ? '' : $task['succ_emails'])?></td>
                <td><?=(($task['task_status'] == 1) ? '' : $task['fail_emails'])?></td>
                <td><?=$task['create_time']?></td>
            </tr>
            <?php endforeach;?>
        </tbody>
    </table>
    <div style="text-align: right;">
        <?=
            \yii\widgets\LinkPager::widget([
                'pagination' => $pages,
            ]);
        ?>
    </div>
</div>