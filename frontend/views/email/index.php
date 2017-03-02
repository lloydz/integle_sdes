<link rel="stylesheet" href="/css/task-form.css"/>
<script type="text/javascript" src="/js/lib/jquery-file-upload/jquery.ui.widget.js"></script>
<script type="text/javascript" src="/js/lib/jquery-file-upload/jquery.fileupload.js"></script>
<script type="text/javascript" src="/js/lib/base64-min.js"></script>
<script type="text/javascript" src="/js/create_task.js"></script>
<div class="task-form">
	<div class="form-title">
		<label>任务名称:</label>
		<input id="task-name" type="text" value="任务任务任务" placeholder="请输入任务名称"/>
	</div>
	
	<div class="module">
		<table>
			<tr>
				<th colspan="4">发件服务器配置</th>
			</tr>
			<tr>
				<td><label>SMTP服务器</label></td>
				<td><input id="smtp" type="text" value="smtp.163.com"/></td>
				<td><label>端口</label></td>
				<td><input id="port" type="text" value="25"/></td>
			</tr>
			<tr>
				<td><label>发件邮箱</label></td>
				<td><input id="username" type="text" value="zhhjchxy@163.com"/></td>
				<td><label>邮箱密码</label></td>
				<td><input id="password" type="password" value="wy123456"/></td>
			</tr>
		</table>
	</div>
	
	<div class="module" style="margin-top: -1px;">
		<table>
			<tr>
				<th colspan="2">邮件模板配置</th>
			</tr>
			<tr>
				<td>
					<label>Excel文件上传</label>
					<span class="tip-icon" data-tip="提示：此Excel文件应包含收件人邮箱列，以及待发送邮件中的个性化信息列，如单位名称、课题名称、课题编号等"></span>
<!-- 					<div class="tip">(提示：此Excel文件应包含收件人邮箱列，以及待发送邮件中的个性化信息列，如单位名称、课题名称、课题编号等)</div> -->
				</td>
				<td style="text-align:left;">
					<div class="file-upload-container">
    					<span class="file-upload-button">
                            <span>+选择文件</span>
                            <input id="excel-upload" type="file" name="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                        </span>
                        <div id="excel-upload-progress" class="progress">
                        	<span>上传进度：</span>
                            <div class="progress-bar">
                                <div class="progress-bar-success"></div>
                            </div>
                            <span class="progress-percentage"></span>
                        </div>
                    </div>
				</td>
			</tr>
			<tr id="to-tr" class="disabled">
				<td style="width:250px;">
					<label>收件人</label>
<!-- 					<span class="tip-icon" data-tip="提示：此处请选择所上传Excel文件中的对应收件人的列"></span> -->
				</td>
				<td>
    				<fieldset>
                		<legend>
                			请选择所上传Excel文件中的对应收件人的列
                		</legend>
                		<div id="to-list" class="radio-list"></div>
                	</fieldset>
				</td>
			</tr>
			<tr id="subject-tr" class="disabled">
				<td style="width:250px;">
					<label>邮件主题</label>
					<span class="tip-icon" data-tip="提示：如果主题中想包含个性化信息，如：课题名称,请这样输入{{课题名称}}"></span>
				</td>
				<td><input id="subject" type="text" value="主题主题主题" style="width:100%;text-align:left;"/></td>
			</tr>
			<tr id="body-tr">
				<td id="body-title-td" class="disabled">
					<label>邮件正文</label>
					<span class="tip-icon" data-width="300px" data-tip="提示：如果正文中想包含个性化信息，如：课题名称,请这样输入{{课题名称}}；
					如果需要对个性化信息进行样式选择，如：加粗、调整字体大小颜色,请对个性化信息整体（包含左右的双大括号）选中后进行样式操作；双大括号和其中的个性化信息请手动输入，尽量不要复制粘贴，否则可能会影响显示样式"></span>
				</td>
				<td id="body-content-td" class="disabled">
					<div style="height: 339px; line-height: 339px;">
						<input type="hidden" name="body" class="ewebeditor_hide_ipt"/>
        				<iframe class="editor_iframe" ID="iframe_editor_body" src="/editor/ewebeditor.htm?id=body&style=coolblue" frameborder="0" scrolling="no" width="100%" height="300"></iframe>
					</div>
				</td>
			</tr>
			<tr id="has-attachment-tr" class="disabled">
				<td>
					<label>是否发送附件</label>
					<span class="tip-icon" data-tip="提示：如果发送附件，附件名称应对应所上传Excel文件中的某一列"></span>
				</td>
				<td style="text-align:left;">
					<input id="attachment-checkbox" type="checkbox"/>
					<div id="attachment-setting" style="display: none;">
						<fieldset id="attachment-fieldset" style="display: block;">
							<legend>
								请选择所上传Excel文件中的对应附件名称的列
							</legend>
							<div id="attachment-excel-col" class="radio-list"></div>
						</fieldset>
						<div class="file-upload-container">
    					<span class="file-upload-button">
                            <span>+上传附件</span>
                            <input id="attachment-upload" type="file" name="attachments[]" multiple/>
                        </span>
							<div id="attachment-upload-progress" class="progress">
								<span>上传进度：</span>
								<div class="progress-bar">
									<div class="progress-bar-success"></div>
								</div>
								<span class="progress-percentage"></span>
							</div>
						</div>
					</div>
					<input id="attachment-excel-col" type="text" style="display:none;text-align:left;width:80%;" placeholder="请输入附件名对应在Excel文件中的列"/>
				</td>
			</tr>
<!--			<tr id="attachment-tr" style="display: none;">-->
<!--				<td>附件上传</td>-->
<!--				<td style="text-align:left;">-->
<!--					<div class="file-upload-container">-->
<!--    					<span class="file-upload-button">-->
<!--                            <span>+选择文件</span>-->
<!--                            <input id="attachment-upload" type="file" name="attachments[]" multiple/>-->
<!--                        </span>-->
<!--                        <div id="attachment-upload-progress" class="progress">-->
<!--                        	<span>上传进度：</span>-->
<!--                            <div class="progress-bar">-->
<!--                                <div class="progress-bar-success"></div>-->
<!--                            </div>-->
<!--                            <span class="progress-percentage"></span>-->
<!--                        </div>-->
<!--                    </div>-->
<!--				</td>-->
<!--			</tr>-->
		</table>
	</div>
	<div class="form-bottom">
		<span id="new-task">
            新建任务
        </span>
	</div>
	
<!-- 	<fieldset> -->
<!-- 		<legend> -->
<!-- 			发件服务器配置 -->
<!-- 		</legend> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label>STMP:</label> -->
<!-- 			<input type="text" id="smtp"/> -->
<!-- 		</div> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label>端口:</label> -->
<!-- 			<input type="text" id="port"/> -->
<!-- 		</div> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label>发件邮箱:</label> -->
<!-- 			<input type="email" id="port"/> -->
<!-- 		</div> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label>密码:</label> -->
<!-- 			<input type="password" id="port"/> -->
<!-- 		</div> -->
<!-- 	</fieldset> -->
	
<!-- 	<fieldset> -->
<!-- 		<legend> -->
<!-- 			邮件模板配置 -->
<!-- 		</legend> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label>主题:</label> -->
<!-- 			<input type="text" id="email-subject"/> -->
<!-- 		</div> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label>正文:</label> -->
<!-- 			<input type="text" id="email-body"/> -->
<!-- 		</div> -->
<!-- 		<div class="form-group"> -->
<!-- 			<label>是否发送附件:</label> -->
<!-- 			<input type="checkbox" id="email-attachment"/> -->
<!-- 		</div> -->
<!-- 	</fieldset> -->
</div>