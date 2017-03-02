<?php
use yii\helpers\Html;
use frontend\assets\AppAsset;
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>"/>
    <meta name="renderer" content="webkit" />
    <meta content="telephone=no" name="format-detection" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <?= Html::csrfMetaTags() ?>
    <title>邮件任务系统</title>
    <link rel="stylesheet" href="/css/header.css"/>
    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/modal.css"/>
    
    <script>
        if(!-[1,]){
            confirm('您的浏览器版本过低，您可以下载谷歌浏览器， 以便更好地浏览网站，确认下载吗');
            location.href = 'http://rj.baidu.com/soft/detail/14744.html?ald';
        }
        var csrfToken = '<?= Yii::$app->request->csrfToken ?>';
    </script>

    <script type="text/javascript" src="/js/lib/jquery-3.1.1.js"></script>
    <script type="text/javascript" src="/js/modal.js"></script>
<!--  	<script type="text/javascript" src="/js/mCustomScrollbar.js"></script> -->
    <script type="text/javascript" src="/js/common.js"></script>
</head>
<body>
    <?php $this->beginBody() ?>
	<!-- 内容开始 -->
	<div class="header">
    	<div class="left">
    		<a class="logo" href="http://www.integle.com/" target="_blank" title="返回官网">
    			<img src="/images/logo.png">
    		</a>
    	</div>
    	
    	<div class="right">
    		<?php if(!empty(\Yii::$app->session['user_info'])):?>
    		<a class="account" href="/user/user-info" target="_blank">
    			<i class="user-ico mr5"></i>
    			<?=\Yii::$app->session['user_info']['real_name']?>
			</a>
    		<div class="seperator"></div>
    		<a class="exit" href="/user/logout-account"><i class="signout-ico mr5"></i>退出</a>
    		<div class="seperator"></div>
    		<?php endif;?>
    	</div>
    </div>
	<div class="nav">
		<a class="tab<?= Yii::$app->controller->action->id == 'index' ? ' active' : ''?>" href="/email">新建任务</a>
		<a class="tab<?= Yii::$app->controller->action->id == 'list' ? ' active' : ''?>" href="/email/list">历史任务</a>
		<?php if(Yii::$app->controller->action->id == 'detail'):?>
			<a class="tab active" href="javasrcipt:;">任务详情</a>
		<?php endif;?>
	</div>
	
	<div class="container">
		<?= $content ?>
	</div>
	
	<footer>Copyright©2009-2017 上海鹰谷信息科技有限公司 版权所有 沪ICP备13029136号</footer>
    <?php $this->endBody() ?>
    
    <div class="modal fade pop_modal">
	<div class="modal-dialog" style="margin-top: 288px;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title alert_title">提示</h4>
			</div>
			<div class="modal-body"></div>
			<div class="modal-footer">
				<button type="button" class="cancel btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="submit btn btn-primary pop_modal_submit">确定</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>