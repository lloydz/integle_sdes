<div class="top-menu clear">
	<div class="left">
		<a class="iblock logo ml30" href="<?=CENTER_URL?>" target="_blank"><img src="/image/logo.png" /></a>
		<select class="choose-group">
		
			<?php if(!empty($this->params['incms_group_ist'])){ foreach ($this->params['incms_group_ist'] as $group){?>
				<option value="<?=$group['id']?>" <?php if(Yii::$app->session['incms_group_id'] == $group['id']){echo 'selected';}?>><?=$group['group_name']?></option>
			<?php }}?>
			
		</select>
		<a class="-btn ml20" data-toggle="modal" data-target=".set-default-group"><?=$viewLang['set_default_group'] ?></a>
	</div>
	
	<div class="right relative">
		<div class="left clear">
			<i class="mouse search-ico open-search"></i>
			<div class="search-box absolute">
				<i class="mouse search-ico search_submit"></i>
				<input type="text" id="top_search" placeholder="<?=$viewLang['enter_key_words'] ?>" class="top_search_text" value="<?=empty(Yii::$app->request->get('key')) ? '' : Yii::$app->request->get('key')?>">
				<i class="mouse indraw-ico"></i>
				<div class="search-select">
					<a type="center" class="mouse data_submit"><?=$viewLang['search_data_center'] ?></a>
					<a type="mine" class="mouse cms_submit"><?=$viewLang['search_my_chem'] ?></a>
					<a type="info" class="mouse info_submit"><?=$viewLang['search_info'] ?></a>
				</div>
				<div class="top-indraw">
					<div class="search_indraw_btn mouse substructure"><?php echo $viewLang['exact_search']?></div>
					<!-- <div class="search_indraw_btn mouse exact">精确搜索</div> 子 -->
					<iframe allowfullscreen="" border="0" mozallowfullscreen="" webkitallowfullscreen="" name="pop_jsdraw_iframe" id="pop_jsdraw_iframe"  width="800px" src=""></iframe>
				</div>
			</div>
		</div>
		<div class="span">
			<div class="span1"></div>
			<div class="span2"></div>
		</div>
		
		<!-- 语言设置 -->
		<?php if(isset(Yii::$app->session['incms_lang'])){?>
    		<?php if(Yii::$app->session['incms_lang'] == Yii::$app->params['language_list']['cn']){?>
    		<a href="javascript:void(0);" class="left relative lang-box change-lang -btn" type="<?php echo Yii::$app->params['language_list']['en'];?>">English</a>
    		<?php }?>
    		<?php if(Yii::$app->session['incms_lang'] == Yii::$app->params['language_list']['en']){?>
    		<a href="javascript:void(0);" class="left relative lang-box change-lang -btn" type="<?php echo Yii::$app->params['language_list']['cn'];?>">中文</a>
    		<?php }?>
		<?php }else{?>
		  <a class="left relative lang-box change-lang -btn" type="<?php echo Yii::$app->params['language_list']['en'];?>">English</a>
		<?php }?>
		<div class="span">
			<div class="span1"></div>
			<div class="span2"></div>
		</div>
		
		
		<a class="left" href="<?php echo CENTER_URL . '/user/user-info'?>" target="_blank"><i class="user-ico mr5"></i><?= $this->params['user_name'];?></a>
		<div class="span">
			<div class="span1"></div>
			<div class="span2"></div>
		</div>
		<a class="left" href="<?php echo Yii::$app->params['center_url'] . 'user/logout-account'?>"><i class="signout-ico mr5"></i><?=$viewLang['login_out'] ?></a>
		<div class="span">
			<div class="span1"></div>
			<div class="span2"></div>
		</div>
		 
	</div>
</div>


<!-- 设置默认鹰群 -->
<div class="modal fade set-default-group">
	<div class="modal-dialog modal-sm">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title alert_title"><?=$viewLang['default_group'] ?></h4>
			</div>
			<div class="modal-body center">
				<p><?=$viewLang['set_default_group'] ?></p>
				<span class="selectbox active">
					<select id="default_group_sel">
    				<?php if(!empty($this->params['incms_group_ist'])){ foreach ($this->params['incms_group_ist'] as $group){?>
        				<option value="<?=$group['id']?>" <?php if(Yii::$app->session['incms_group_id'] == $group['id']){echo 'selected';}?>><?=$group['group_name']?></option>
        			<?php }}?>
				</select>
				</span>
			</div>
			<div class="modal-footer">
				<button type="button" class="submit btn btn-primary default-group-submit"><?=$viewLang['enter'] ?></button>
				<button type="button" class="cancel btn btn-default" data-dismiss="modal"><?=$viewLang['close'] ?></button>
			</div>
		</div>
	</div>
</div>
<!--<span class="left">
			<input type="text" id="top_search" placeholder="<?/*=$viewLang['input_search'] */?>" value="<?/*=empty(Yii::$app->request->get('key')) ? '' : Yii::$app->request->get('key')*/?>" />

			<a class="search_submit ml5" href="javascript:;"><i class="search-ico"></i><?/*=$viewLang['search'] */?></a>
		</span>-->