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
    
    <script>
        if(!-[1,]){
            confirm('您的浏览器版本过低，您可以下载谷歌浏览器， 以便更好地浏览网站，确认下载吗');
            location.href = 'http://rj.baidu.com/soft/detail/14744.html?ald';
        }
        var csrfToken = '<?= Yii::$app->request->csrfToken ?>';
    </script>

   
</head>
<body>
    <?php $this->beginBody() ?>
	<!-- 内容开始 -->
	<div class="header">Integle</div>
	<div class="nav">
		<a class="tab active">新建任务</a>
		<a class="tab">历史任务</a>
	</div>
	
	<div class="container">
		<?= $content ?>
	</div>
	
	<footer>Copyright©2009-2016</footer>
    <?php $this->endBody() ?>
</body>
</html>