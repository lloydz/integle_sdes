<?php

function getSourcePicture($deeppath, $picfilename) {
    $data['t'] = 'source';
    $data['d_p'] = $deeppath;
    $data['r_w'] = '';
    $data['r_h'] = '';
    $data['c_w'] = '';
    $data['c_h'] = '';
    $data['c_r_w'] = '';
    $data['c_r_h'] = '';
    $data['x'] = '';
    $data['y'] = '';
    $data['w'] = '0';
    return urlencode(encrypt(compressArray($data)) . '_' . $picfilename);
}

function getResizePicture($deeppath, $picfilename, $resizeWidth, $resizeHeight, $isWater = '0') {
    $data['t'] = 'resize';
    $data['d_p'] = $deeppath;
    $data['r_w'] = $resizeWidth;
    $data['r_h'] = $resizeHeight;
    $data['c_w'] = '';
    $data['c_h'] = '';
    $data['c_r_w'] = '';
    $data['c_r_h'] = '';
    $data['x'] = '';
    $data['y'] = '';
    $data['w'] = $isWater;
    return urlencode(encrypt(compressArray($data)) . '_' . $picfilename);
}

function getCropPicture($deeppath, $picfilename, $resizeWidth, $resizeHeight, $cropWidth, $cropheight, $x, $y, $isWater = '0') {
    $data['t'] = 'crop';
    $data['d_p'] = $deeppath;
    $data['r_w'] = $resizeWidth;
    $data['r_h'] = $resizeHeight;
    $data['c_w'] = $cropWidth;
    $data['c_h'] = $cropheight;
    $data['c_r_w'] = '';
    $data['c_r_h'] = '';
    $data['x'] = $x;
    $data['y'] = $y;
    $data['w'] = $isWater;
    return urlencode(encrypt(compressArray($data)) . '_' . $picfilename);
}

function getCropResizePicture($deeppath, $picfilename, $resizeWidth, $resizeHeight, $cropWidth, $cropheight, $x, $y, $needWidth, $needHeight) {
    $data['t'] = 'cropresize';
    $data['d_p'] = $deeppath;
    $data['r_w'] = $resizeWidth;
    $data['r_h'] = $resizeHeight;
    $data['c_w'] = $cropWidth;
    $data['c_h'] = $cropheight;
    $data['c_r_w'] = $needWidth;
    $data['c_r_h'] = $needHeight;
    $data['x'] = $x;
    $data['y'] = $y;
    $data['w'] = '0';
    
    return urlencode(encrypt(compressArray($data)) . '_' . $picfilename);
}

function encrypt($input) {
    $key = 'pic.integle.com/';
    
    $size = mcrypt_get_block_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_ECB);
    $input = pkcs5_pad($input, $size);
    $td = mcrypt_module_open(MCRYPT_RIJNDAEL_128, '', MCRYPT_MODE_ECB, '');
    $iv = mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_RAND);
    mcrypt_generic_init($td, $key, $iv);
    $data = mcrypt_generic($td, $input);
    mcrypt_generic_deinit($td);
    mcrypt_module_close($td);
    $data = base64_encode($data);
    return $data;
}

function pkcs5_pad($text, $blocksize) {
    $pad = $blocksize - (strlen($text) % $blocksize);
    return $text . str_repeat(chr($pad), $pad);
}

function compressArray($data) {
    $str = '';
    foreach ($data as $key=>$value) {
        $str .= $value . '?';
    }
    $str = rtrim($str, '?');
    return gzcompress($str, 9);
}

/**
 * 创建图片文件名称
 * 
 * @access public
 * @param string $suffix 图片文件的后缀
 * @return string
 */
function createPicFilename($smiles) {
    static $numStr = '01234567890ABCDEFGHIJKLMNOPQSUVWXYZabcdefghijklmnopqrstuvwxyz';
    /*
     * $num = mt_rand(100, 999) . round(microtime(TRUE) * 1000); $t = ""; $num = intval($num); if ($num === 0) continue; while($num > 0) { $remainder = $num % 62; $t = substr($numStr, $remainder, 1) . $t; $num = floor($num / 62); } $tlen = strlen($t); if ($tlen) { $t = str_pad("", 1, "0", STR_PAD_LEFT) . $t; // 不足一个字节长度，自动前面补充0 }
     */
    $t = base64_encode($smiles . $numStr);
    $t = md5($t);
    return $t;
}


/**
 * 生成存文件深度路径
 *
 * @access public
 * @return string
 */
function createDeepPath() {
    $deep = time() % 2000;
    $deep = str_pad($deep, 4, '0', STR_PAD_LEFT) . '/';
    $time = substr(microtime(TRUE), -6, 5);
    $time = intval(str_replace('.', '', $time));
    $deep .= $time < 5000 ? '0' : '1';
    $deep .= substr($time, -3, 3);
    return $deep;
}


function mkdirs($dir) {
    if (is_dir($dir) || @mkdir($dir))
        return TRUE;
    if (!mkdirs(dirname($dir)))
        return FALSE;
    return @mkdir($dir);
}


