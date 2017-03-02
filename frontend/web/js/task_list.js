/**
 * 
 */
$(document).ready(function() {
	$('[action=del-task]').on('click', function() {
		var taskId = $(this).attr('data-id');
		$.showContent('warning', '提示', '确定删除该任务？', function() {
			$.ajax({
				url : '/email/del-task',
				type : 'post',
				data : {
					task_id : taskId
				},
				success: function(res) {
					if(res.status == 1) {
						$.showAlert(res.msg);
						setTimeout(function(){
							location.reload();
						}, 0);
					} else {
						$.showContent('error', '提示', res.msg, function() {
							location.reload();
						}, false, '确定', '关闭', false);
					}
				}
			});
		}, false, '确定', '取消');
	});
});