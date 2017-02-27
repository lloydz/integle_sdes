<?php 
$sLicense = "2:35899:4:1:1::dev.eln.integle.com:46922222a16c44aaed581b7cb5484fbb";
define('DS', DIRECTORY_SEPARATOR);
if (strtoupper(substr(PHP_OS, 0, 3)) == 'WIN') { // windows系统(开发用)
    define('UPLOAD_PATH', "\\\\192.168.100.18" . DS . 'uploads' . DS . 'graphics' . DS . 'srcpath' . DS);
} else {
    define('UPLOAD_PATH', '/home' . DS . 'uploads' . DS . 'graphics' . DS . 'srcpath' . DS);
}

if (php_sapi_name() === 'cli' or defined('STDIN')) {
    $hostArray[0] = 'dev';
} else {
    define('PROTOCOL', isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off' ? 'https' : 'http');
    if (!isset($_SERVER["HTTP_HOST"])) {
        exit('host错误');
    }
    $hostArray = explode('.', $_SERVER["HTTP_HOST"]);
    if (count($hostArray) < 2) {
        exit('host错误');
    }
}

define('DOMAIN_HOST', 'integle.com');
if ($hostArray[0] == 'eln') {
    define('ENVIRONMENT', 'www');
    error_reporting(0);
    $environment = '';
    $sLicense = "2:36046:4:1:1::eln.integle.com:616389c6e9e4b1c7ac6e678d59a5370c";
} else {
    define('ENVIRONMENT', $hostArray[0]);
    error_reporting(E_ALL);
    $environment = ENVIRONMENT . '.';
}
define('UPLOAD_URL', PROTOCOL . '://' . $environment . 'pic.' . DOMAIN_HOST . '/');

?>