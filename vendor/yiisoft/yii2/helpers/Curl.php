<?php

/**
 *
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */
namespace yii\helpers;

/**
 * cURL for PHP
 *
 * @author Leon <1113692008@qq.com>
 * @copyright 2016-3-9 10:20:42
 */
class Curl {

    /**
     * 模拟POST操作
     *
     * @access public
     * @param string $url 页面的URL
     * @param array $post 需要的数据
     * @param boolean $async 是否异步
     * @return array
     */
    static public function sendPostCurl($url, $data = array(), $async = FALSE, $debug = FALSE) {
        $curl = curl_init(); // 初始化curl模块
        

        // SSL验证
        if (isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off') {
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        }
        
        // 是否异步
        if ($async) {
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_TIMEOUT, 1);
        }
        
        curl_setopt($curl, CURLOPT_URL, $url); // 提交的地址
        curl_setopt($curl, CURLOPT_HEADER, 0); // 是否显示头信息
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 是否自动显示返回的信息
        curl_setopt($curl, CURLOPT_POST, 1); // post方式提交
        if (!empty($data)) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data)); // 要提交的信息
        }
        $content = curl_exec($curl); // 执行cURL
        if ($debug) {
            exit($content);
        }
        curl_close($curl); // 关闭cURL资源，并且释放系统资源
        

        $result = json_decode($content, 1);
        
        // 服务端报错提示
        $result = is_null($result) ? array(
            'status' => 0, 
            'info' => $content, 
            'data' => NULL 
        ) : $result;
        
        return $result;
    }
}
