<?php header("content-Type: text/html; charset=utf-8");?>
<HTML>
<HEAD>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<TITLE>eWebEditor ： 标准调用示例</TITLE>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<link rel='stylesheet' type='text/css' href='example.css'>
</HEAD>
<BODY>

<FORM method="post" name="myform" action="retrieve.php">
<TABLE border="0" cellpadding="2" cellspacing="1">
<TR>
	<TD>
	<?php $currTime = time();?>
		<INPUT type="text" name="<?php echo $currTime;?>" class="ewebeditor_hide_ipt" value="">
		<IFRAME ID="" src="../ewebeditor.htm?id=<?php echo $currTime;?>&style=coolblue" frameborder="0" scrolling="no" width="1400" height="400"></IFRAME>
	</TD>
</TR>

</TABLE>
<INPUT type=button value="查看源文件" onclick="location.replace('view-source:'+location)"> 
</FORM>
</BODY>
</HTML>

<script type="text/javascript">
	function EWEBEDITOR_EVENT(ev){
  	  	 var editor = document.getElementById(ev.id).contentWindow;
	     switch(ev.flag){
	     case "LoadComplete":           //加载完成
		     console.log(ev.id);
	         break;
	     }
	};
	
    function setEditorValue(id, value){
        var inputObj = document.getElementById(id);
        inputObj.value = value;
    }
  	//给编辑器赋值
//     function setEditorValue(id, value){
// 		var editorObj = document.getElementById(id).contentWindow;
//         editorObj.setHTML(value);
//     }
    
    //获取编辑器的值
    function getEditorValue(id){
        var editorObj = document.getElementById(id).contentWindow;
        return editorObj.getHTML();
    } 
</script>

