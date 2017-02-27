<?php
$projectId= Yii::$app->request->get('project_id') ? : '0';
$controllerId = Yii::$app->controller->id;
$methodId = Yii::$app->controller->action->id;
$managementControllerIds = [
		'sign',
		'fields',
		'management',
];
$managementMethod = [
    'my-chem',
    'info-list'
];
function getCenterStatus($controllerId) {
	return $controllerId == 'center' ? 'on' : '';
}

function getManagementStatus($controllerId, $managementControllerIds) {
	return in_array($controllerId, $managementControllerIds) ? 'on' : '';
}
?>

<div class="layout-left fixed">
	<div>
		<a class="block center insert-btn" href="/chemical/submit-step-1"><i class="create-ico"></i><?php echo $viewlang['new_import'];?></a>
	</div>
	<div class="left-nav">

		<div class="left-nav-scroll">
			<div class="left-nav-box relative on">
				<span class="block bor-b toggle-btn"><i class="data-center-ico"></i><?php echo $viewlang['data_center'];?></span>
				<i class="toggle-ico absolute"></i>
				<?php 
				if(!empty($this->params['access_projects'])){ ?>
				<ul>
					<?php foreach ($this->params['access_projects'] as $project) {
						if ($project['access'] == 1) {
					?>
					<li <?= $projectId == $project['id'] ? 'class="on"' : ""; ?>>
						<a class="a-line" href="/center/index?project_id=<?= $project['id'] ?>" title="<?= $project['name'] ?>">
						<i class="point-ico"></i><?= $project['name'] ?></a>
					</li>
					<?php
						}
					} ?>
				</ul>
				<?php } ?>
			</div>

			<div class="left-nav-box">
				<a class="block bor-b <?=$controllerId == 'chemical-list' ? 'on' : ''; ?>" href="/chemical-list/my-chem"><i class="my-compoun-ico"></i><?php echo $viewlang['my_chemical'];?></a>
			</div>

			<div class="left-nav-box">
				<a class="block bor-b <?=$controllerId == 'analysis' ? 'on' : ''; ?>" href="/analysis/index"><i class="my-analysis-ico"></i><?php echo $viewlang['data_anay'];?></a>
			</div>

			<?php if($this->params['is_admin']){?>
			<div class="left-nav-box relative <?=getManagementStatus($controllerId, $managementControllerIds)?> <?=$methodId == 'info-list' ? 'on' : ''; ?> <?=$controllerId == 'data-up' ? 'on' : ''; ?>">
				<span class="block bor-b toggle-btn"><i class="my-set-ico"></i><?php echo $viewlang['incms_manage'];?></span>
				<i class="toggle-ico absolute"></i>
				<ul>
					<li class="<?=$methodId==$managementMethod[1] ? 'on' : '';?> <?=$controllerId == 'data-up' ? 'on' : ''; ?>"><a href="/chemical-list/info-list" ><i class="point-ico"></i><?php echo $viewlang['info_list'];?></a></li>
					<li class="<?=$controllerId==$managementControllerIds[0] ? 'on' : '';?>"><a href="/sign/sign-list?type=1" ><i class="point-ico"></i><?php echo $viewlang['my_sign'].(isset($this->params['signCount'])?('('.$this->params['signCount'].')'):'');?></a></li>
					<li class="<?=$controllerId==$managementControllerIds[1] ? 'on' : '';?>"><a href="/fields/index" ><i class="point-ico"></i><?php echo $viewlang['temp_setting'];?></a></li>
					<li class="<?=$controllerId==$managementControllerIds[2] ? 'on' : '';?>"><a href="/management/project" ><i class="point-ico"></i><?php echo $viewlang['admin_setting'];?></a></li>
				</ul>
			</div>
			<?php }?>

			<div class="left-nav-box relative <?php if($methodId == 'help'){echo 'on'; }?>">
				<span class="block bor-b toggle-btn"><i class="my-help-ico"></i><?php echo $viewlang['incms_help'];?></span>
				<i class="toggle-ico absolute"></i>
				<ul>
					<li class="<?php if($methodId == 'help'){echo 'on'; }?>"><a href="/site/help"><i class="point-ico"></i><?php echo $viewlang['incms_question'];?></a></li>
					<li class=""><a target="_blank" href="/download/review-document"><i class="point-ico"></i><?php echo $viewlang['incms_document'];?></a></li>
				</ul>
			</div>

		</div>
	</div>
</div>