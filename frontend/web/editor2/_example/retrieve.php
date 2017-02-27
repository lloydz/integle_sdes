<?php header("content-Type: text/html; charset=utf-8");?>
<HTML>
<HEAD>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
<TITLE>integle editor</TITLE>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<link rel='stylesheet' type='text/css' href='example.css'>
</HEAD>
<BODY>

<?php

echo '实验操作<br><br>'.stripslashes($_POST["reaction_procedure4919"]);
echo "<br><br><p><input type=button value=' 后退 ' onclick='history.back()'></p>";

?>

</BODY>
</HTML>