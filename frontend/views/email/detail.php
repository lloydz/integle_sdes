<link rel="stylesheet" href="/css/task-list.css"/>
<div style="margin-top: 40px;">
	<?php if($task):?>
	<div style="height: 45px;
    font-size: 16px;
    line-height: 45px;
    text-align: center;
    font-weight: bold;
    background-color: #d27373;"><?=$task['task_name']?></div>
	<?php endif;?>
    <table>
        <thead>
            <tr>
                <th style="width:100px;">序号</th>
                <th>收件人</th>
                <th>状态</th>
            </tr>
        </thead>
        <tbody>
        	<?php $i = $pages->offset;?>
            <?php foreach($results as $result):?>
            <?php $i++;?>
            <tr>
                <td><?=$i?></td>
                <td><?=$result['to']?></td>
                <td>
                    <?php if($result['status'] == 1):?>
                    	<?php if($result['is_read'] == 1):?>
                    	发送成功且用户已读该邮件
                    	<?php else:?>
                    	发送成功
                    	<?php endif;?>
                	<?php else:?>
                	发送失败
                	<?php endif;?>
                </td>
            </tr>
            <?php endforeach;?>
            <?php if(empty($results)):?>
            <tr><td colspan="3">暂无数据</td></tr>
            <?php endif;?>
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