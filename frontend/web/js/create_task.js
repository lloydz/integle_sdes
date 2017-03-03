/**
 * 
 */
$(document).ready(function() {
	// 生成Excel标题单选框
    function generateRadiosHtml(radios, name) {
        var radioHtml = '';
        for(var key in radios) {
            radioHtml += '<div class="radio">';
            radioHtml += '<input type="radio" name="'+name+'" value="'+key+'"/><label>'+radios[key]+'</label>';
            radioHtml += '</div>';
        }
        return radioHtml;
    }

	function showToRadios(radios) {
		var radioHtml = '';
		for(var key in radios) {
			radioHtml += '<div class="radio">';
			radioHtml += '<input type="radio" name="to" value="'+key+'"/><label>'+radios[key]+'</label>';
			radioHtml += '</div>';
		}
		$('#to-list').html(radioHtml);
	}
	
	// 验证
	function validateForm() {
		if($.trim($('#task-name').val()) == "") {
			$.showAlert('请输入任务名称');
			return false;
		}
		if($.trim($('#smtp').val()) == "") {
			$.showAlert('请输入SMTP服务器');
			return false;
		}
		if($.trim($('#port').val()) == "") {
			$.showAlert('请输入端口');
			return false;
		}
		if($.trim($('#username').val()) == "") {
			$.showAlert('请输入发件邮箱	');
			return false;
		}
		if($.trim($('#password').val()) == "") {
			$.showAlert('请输入邮箱密码');
			return false;
		}
		if(!$('#excel-upload').attr('task_dir')) {
			$.showAlert('请上传Excel文件');
			return false;
		}
		if($('input:radio[name="to"]:checked').length == 0) {
			$.showAlert('请选择收件人对应所上传Excel文件中的栏位');
			return false;
		}
		if($('input:radio[name="attachment_type"]:checked').length == 0) {
			$.showAlert('请选择附件类型');
			return false;
		}
		if($('input:radio[name="attachment_type"]:checked').val() == 2 && $('input:radio[name="attachment_excel_col"]:checked').length == 0) {
			$.showAlert('请选择附件名称对应所上传Excel文件中的栏位');
			return false;
		}
		
		return true;
	}

	// Excel文件上传
	$('#excel-upload').fileupload({
        url: '/email/ajax-file-upload',
        dataType: 'json',
        formData: {
        	'is_attachment': 0
        },
        start: function(e) {
			$('#to-tr, #subject-tr, #body-title-td, #body-content-td, #has-attachment-tr').addClass('disabled');
        	// $("#attachment-tr .file-upload-button").addClass('btn-disabled');
        	$('#excel-upload-progress .progress-bar-success').css('width', '0%');
            $('#excel-upload-progress .progress-percentage').html('0%');
        	$('#excel-upload-progress').css('display', 'inline-block');
        },
        done: function (e, data) {
        	var result = data.result;
        	if(result.status == 1) {
        		$('#excel-upload').attr('task_dir', result.data.task_dir);
        		$('#excel-upload').attr('file_name', result.data.file_name);
                $('#to-list').html(generateRadiosHtml(result.data.titles, 'to'));
                $('#attachment-excel-col').html(generateRadiosHtml(result.data.titles, 'attachment_excel_col'));
        		// $('#excel-upload').attr('save_name', result.data.save_name);
        		$('#attachment-upload').fileupload({
        			formData: {
        	        	'is_attachment': 1, 
        	        	'task_dir': result.data.task_dir
        	        }
        		});
				$('#to-tr, #subject-tr, #body-title-td, #body-content-td, #has-attachment-tr').removeClass('disabled');
        		// $("#attachment-tr .file-upload-button").removeClass('btn-disabled');
        	}
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#excel-upload-progress .progress-bar-success').css('width', progress + '%');
            $('#excel-upload-progress .progress-percentage').html(progress + '%');
        }
    });
	
	// 附件上传
	$('#attachment-upload').fileupload({
        url: '/email/ajax-file-upload',
        dataType: 'json',
        start: function(e) {
        	$('#attachment-upload-progress .progress-bar-success').css('width', '0%');
            $('#attachment-upload-progress .progress-percentage').html('0%');
        	$('#attachment-upload-progress').css('display', 'inline-block');
        },
        done: function (e, data) {
        	var result = data.result;
        	if(result.status != 1) {
        	}
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#attachment-upload-progress .progress-bar-success').css('width', progress + '%');
            $('#attachment-upload-progress .progress-percentage').html(progress + '%');
        }
    });

    $('[name=attachment_type]').click(function() {
    	if($(this).val() == 1) {
    		$('#attachment-fieldset').hide();
    		$('#attachment-setting').show();
    	} else if($(this).val() == 2) {
    		$('#attachment-fieldset').show();
    		$('#attachment-setting').show();
    	} else {
    		$('#attachment-setting').hide();
    	}
    });
	
	$('#new-task').click(function() {
		if(!validateForm()) {
			return false;
		}
		
		$.ajax({
			 url : '/email/new-task',
			type : 'post',
			data : {
				task_data : {
					task_name: $('#task-name').val(),
					file_path: $('#excel-upload').attr('task_dir'),
					excel_file: $('#excel-upload').attr('file_name')
				}, 
				transport_data : {
					host: $('#smtp').val(),
					username: $('#username').val(),
					password: Base64.encode($('#password').val()),
					port: $('#port').val(),
					encryption: 'tls'
				}, 
				template_data : {
					to: $('input:radio[name="to"]:checked').val(),
                    subject: $('#subject').val(),
					body: $('.editor_iframe')[0].contentWindow.getHTML(),
					attachment: $('input:radio[name="attachment_type"]:checked').val(),
					attachment_excel_col: $('input:radio[name="attachment_excel_col"]:checked').val()
				}
			},
			success: function(res) {
				if(res.status == 1) {
					$.showContent('success', '新建邮件任务成功', '新建邮件任务成功，可在历史任务中查看进度和结果，即将跳转至历史任务页面', function() {
						location.href = '/email/list';
					}, false, '确定', '关闭', false);
				} else {
					$.showAlert(res.msg);
				}
			}
		});
	});
});