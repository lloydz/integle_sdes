/**
 * 
 */
$(document).ready(function() {
	// Excel文件上传
	$('#excel-upload').fileupload({
        url: '/email/ajax-file-upload',
        dataType: 'json',
        formData: {
        	'is_attachment': 0
        },
        start: function(e) {
        	$("#attachment-tr .file-upload-button").addClass('btn-disabled');
        	$('#excel-upload-progress .progress-bar-success').css('width', '0%');
            $('#excel-upload-progress .progress-percentage').html('0%');
        	$('#excel-upload-progress').css('display', 'inline-block');
        },
        done: function (e, data) {
        	var result = data.result;
        	if(result.status == 1) {
        		$('#excel-upload').attr('task_dir', result.data.task_dir);
        		$('#excel-upload').attr('file_name', result.data.file_name);
        		// $('#excel-upload').attr('save_name', result.data.save_name);
        		$('#attachment-upload').fileupload({
        			formData: {
        	        	'is_attachment': 1, 
        	        	'task_dir': result.data.task_dir
        	        }
        		});
        		$("#attachment-tr .file-upload-button").removeClass('btn-disabled');
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
	
	$('#new-task').click(function() {
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
					password: $('#password').val(),
					port: $('#port').val(),
					encryption: 'tls'
				}, 
				template_data : {
					subject: $('#subject').val(),
					body: '<p>邮件正文<p><p>邮件正文<p><p>邮件正文<p><p>邮件正文<p><p>邮件正文<p>',
					attachment: $('#attachment').is(':checked') ? 1 : 0,
					attachment_excel_col: $('#attachment-excel-col').val()
				}
			},
			success: function(res) {
				console.log(res);
			}
		});
	});
});