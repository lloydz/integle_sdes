<?php
/* vim: set expandtab tabstop=4 shiftwidth=4: */
// +----------------------------------------------------------------------+
// | PHP version 5                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 1997-2004 The PHP Group                                |
// +----------------------------------------------------------------------+
// | This source file is subject to version 3.0 of the PHP license,       |
// | that is bundled with this package in the file LICENSE, and is        |
// | available through the world-wide-web at the following url:           |
// | http://www.php.net/license/3_0.txt.                                  |
// | If you did not receive a copy of the PHP license and are unable to   |
// | obtain it through the world-wide-web, please send a note to          |
// | license@php.net so we can mail you a copy immediately.               |
// +----------------------------------------------------------------------+
// | Authors: Original Author <author@example.com>                        |
// |          Your Name <you@example.com>                                 |
// +----------------------------------------------------------------------+
//
// $Id:$
/*
 *######################################
 * eWebEditor V10.3 - Advanced online web based WYSIWYG HTML editor.
 * Copyright (c) 2003-2015 eWebSoft.com
 *
 * For further information go to http://www.ewebeditor.net/
 * This copyright notice MUST stay intact for use.
 *######################################
*/
if (function_exists("date_default_timezone_set") and function_exists("date_default_timezone_get")) {
    @date_default_timezone_set(@date_default_timezone_get());
}
@session_start();
require ("config.php");
function MD5_16($s) {
    return substr(md5($s) , 8, 16);
}
function TrimGet($p) {
    if (isset($_GET[$p])) {
        return trim($_GET[$p]);
    } else {
        return "";
    }
}
function GetSAPIvalue($s_SessionKey, $s_ParamName) {
    $p = "eWebEditor_" . $s_SessionKey . "_" . $s_ParamName;
    if (isset($_SESSION[$p])) {
        return trim($_SESSION[$p]);
    } else {
        return "";
    }
}
function IsInt($str) {
    if ($str == "") {
        return false;
    }
    if (preg_match("/[^0-9]+/", $str)) {
        return false;
    } else {
        return true;
    }
}
function IsOkSParams($s_SParams, $s_EncryptKey) {
    if ($s_SParams == "") {
        return false;
    }
    $n = strpos($s_SParams, "|");
    if ($n === false) {
        return false;
    }
    $s1 = substr($s_SParams, 0, $n);
    $s2 = substr($s_SParams, $n + 1);
    if (MD5_16($s_EncryptKey . $s2) != $s1) {
        return false;
    }
    return true;
}
function Syscode2Pagecode($str, $b) {
    $s_SysCode = "gbk";
    $s_PageCode = "utf-8";
    if (($s_SysCode != $s_PageCode) && (function_exists("iconv"))) {
        if ($b) {
            return iconv($s_SysCode, $s_PageCode, $str);
        } else {
            return iconv($s_PageCode, $s_SysCode, $str);
        }
    } else {
        return $str;
    }
}
function UTF8_to_Pagecode($str, $b) {
    $s_UTF8 = "utf-" . "8";
    $s_PageCode = "utf-8";
    if (($s_UTF8 != $s_PageCode) && (function_exists("iconv"))) {
        if ($b) {
            return iconv($s_UTF8, $s_PageCode, $str);
        } else {
            return iconv($s_PageCode, $s_UTF8, $str);
        }
    } else {
        return $str;
    }
}
function HTMLEncode($str) {
    return htmlspecialchars($str, ENT_COMPAT, "ISO-8859-1");
}
?>
