<?php
namespace frontend\tools;

    /**
     * Created by PhpStorm.
     * User: txj
     * Date: 2016/4/28
     * Time: 9:28
     */

/**
 * Class ExcelTool
 * @example
 * @package www\tools
 */
class ExcelTool {
    const EXCEL_5 = 'excel5';
    const EXCEL_7 = 'excel2007';
    const CSV = 'csv';

    const MAX_COL = 100;    //最多支持100列读写
    const READ = TRUE;
    const WRITE = FALSE;

    private $readHandle = NULL; //读句柄
    private $writeHandle = NULL;    //写句柄
    private $fileName = 'integle.xlsx'; //文件名称
    private $excelType = '';//文件类型

    private $title = [];        //存储表头键值对
    private $titleCount = 0;    //表格头部长度
    private $titleKey = [];     //存储键名
    private $titleValue = [];   //存储值名

    //存储一行数据
    private $line = [];     //单行
    private $cell = '';     //单个单元格值
    private $iteratorX = 1;  //横坐标
    private $iteratorY = 1;  //纵坐标

    /**
     * ExcelServer constructor.
     * @param string $fileName  文件名，带后缀
     * @param string $type  文件类型
     * @param bool $read    读写操作类型
     */
    function __construct($read = self::READ, $fileName = NULL, $type = self::EXCEL_7) {
        require_once dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'Excel' . DIRECTORY_SEPARATOR . 'PHPExcel.php';
        if (!empty($fileName)) {
            $this->fileName = $fileName;
        }
        $this->excelType = $type;
        if ($read == self::READ) {
            $this->readHandle = \PHPExcel_IOFactory::load($this->fileName);
        } else if ($read == self::WRITE) {
            $this->writeHandle = new \PHPExcel();
        }
    }

    /**
     * 根据序号转换成Excel头
     * @param $index    数字序号
     * @return string   Excel头
     */
    private function _getABC($index){
        $ABC[0] = chr(90);
        for($i = 65; $i< 90; $i++){
            $ABC[$i-64] = chr($i);
        }

        $str = '';
        while($index > 0){
            $remainder = $index % 26;
            $str = $ABC[$remainder] . $str;
            if (0 == $index%26)
                --$index;
            $index = intval($index/26);
        }

        return $str;
    }


    /**
     * 输出头
     */
    private function _setHeader() {
        header("Pragma: public");
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header("Content-Type:application/force-download");
        header("Content-Type:application/vnd.ms-excel; charset=UTF-8");
        header("Content-Type:application/octet-stream");
        header("Content-Type:application/download");
        header("Content-Transfer-Encoding:binary");
        header("Content-Disposition:attachment;filename={$this->fileName}");
    }

    /**
     * 获取激活的sheet
     */
    public function getActiveSheet() {
        if ($this->readHandle instanceof \PHPExcel) {
            return $this->readHandle->getActiveSheet();
        } else {
            return $this->writeHandle->getActiveSheet();
        }
    }

    /**
     * 配置激活的sheet
     */
    public function configSheetStyle($config = []) {
        if (empty($config)) {
            return $this;
        }
    }

    /**
     * 配置单元格的样式
     * @param array $config
     */
    public function configCellStyle($config = [], $rowNumber = NULL, $colNumber = NULL) {
        if (empty($config)) {
            return $this;
        }
        if (empty($rowNumber)) {
            $rowNumber = $this->iteratorY;
        }
        if (empty($colNumber)) {
            $colNumber = $this->iteratorX;
        }
    }

    /**
     * 配置列样式
     * @param array $config
     */
    public function configColumnStyle ($config = [], $colNumber = NULL) {
        if (empty($config)) {
            return $this;
        }

        if (empty($colNumber)) {
            $colNumber = $this->iteratorX;
        }

        foreach ($config as $key => $conf) {
            switch ($key) {
                //配置列宽
                case 'width' :
                    $colCode = $this->_getABC($colNumber);
                    $this->getActiveSheet()->getColumnDimension($colCode)->setWidth(intval($conf));
                    break;
                //配置列宽自适应
                case 'auto-width' :
                    $colCode = $this->_getABC($colNumber);
                    $this->getActiveSheet()->getColumnDimension($colCode)->setAutoSize($conf);
                    break;
                default :
                    break;
            }
        }
        return $this;
    }

    /**
     * 配置行样式
     * @param array $config
     */
    public function configRowStyle ($config = [], $rowNumber = NULL) {
        if (empty($config)) {
            return $this;
        }

        if (empty($rowNumber)) {
            $rowNumber = $this->iteratorY;
        }

        foreach ($config as $key => $conf) {
            switch ($key) {
                //配置行高
                case 'height' :
                    $this->getActiveSheet()->getRowDimension($rowNumber)->setRowHeight(intval($conf));
                    break;
                default :
                    break;
            }
        }
        return $this;
    }

    /**
     * 读取数据表头
     * @param int $lineNumber   行号
     * @return array
     */
    public function readTitle() {
        //重置横、纵坐标
        $this->title = $this->titleKey = $this->titleValue = [];
        $this->titleCount = 0;
        $this->iteratorX = $this->iteratorY = 1;

        //如果没有读句柄
        if (empty($this->readHandle)) {
            return array();
        }

        while(1) {
            $cellValue = $this->readHandle->getActiveSheet()->getCell($this->_getABC($this->iteratorX).$this->iteratorY)->getValue();
            if (empty($cellValue) || $this->iteratorX > self::MAX_COL){  //为空，或者列数超过最大值
                break;
            }
            $this->title[$this->iteratorX] = "$cellValue";
            $this->titleKey[$this->iteratorX] = $this->iteratorX;
            $this->titleValue[$this->iteratorX] = "$cellValue";
            $this->iteratorX++;
        }

        $this->iteratorY++;
        $this->titleCount = count($this->title);

        return $this->title;
    }

    /**
     * 读取一个单元格的数据
     * @param int $lineNumber
     * @param int $rowNumber
     * @return string
     */
    public function readCell($lineNumber = 2, $rowNumber = 1) {
        if (empty($lineNumber) || empty($rowNumber)) {
            return "";
        }
        $this->iteratorX = $rowNumber;   //列
        $this->iteratorY = $lineNumber;  //行
        $this->cell =
            $this->readHandle->getActiveSheet()->getCell($this->_getABC($rowNumber).$lineNumber)->getValue();
        return $cellValue = "$this->cell";
    }

    /**
     * 读取一行Excel数据，并返回以键值对的数组
     * @param int $lineNumber
     * @return array
     */
    public function readLine() {
        $this->iteratorX = 1;
        //如果没有读句柄
        if (empty($this->readHandle)) {
            return array();
        }

        for ($i = $this->iteratorX;  $i <= $this->titleCount; $i++) {
            $cellValue = $this->readHandle->getActiveSheet()->getCell($this->_getABC($i).$this->iteratorY)->getValue();
            $this->line[$this->titleKey[$i]] = "$cellValue";
        }

        $this->iteratorY++;
        return $this->line;
    }

    /**
     * 准备输出excel
     */
    public function beginEcho() {
        $this->iteratorX = $this->iteratorY = 1;
        header("Content-type:application/csv; charset=UTF-8");
        header("Content-Disposition:attachment; filename={$this->fileName}");
        header('Pragma:no-cache');
        header('Expires:0');
        echo pack("ssssss", 0x809, 0x8, 0x0, 0x10, 0x0, 0x0);
        return $this;
    }

    /**
     * 输出单行数据
     * @param array $lineData   单行数据
     * @param bool|TRUE $icon
     */
    public function echoLine($lineData = array(), $icon = TRUE) {
        $this->iteratorX = 1;
        foreach ($lineData as $v) {
            $v = iconv('utf-8', 'gbk', $v);
            $len = strlen($v);
            echo pack("ssssss", 0x204, 8 + $len, $this->iteratorY-1, $this->iteratorX-1, 0x0, $len);
            echo $v;
            $this->iteratorX++;
        }
        $this->iteratorY++;
        return $this;
    }

    /**
     * 结束输出
     */
    public function endEcho() {
        echo pack("ss", 0x0A, 0x00);
        return $this;
    }

    /**
     * 下载制作完成的表格
     * @return $this
     */
    public function download() {
        //制作输出头
        $this->_setHeader();
        $write = NULL;
        switch ($this->excelType) {
            case self::EXCEL_5:
                $write = new \PHPExcel_Writer_Excel5($this->writeHandle);
                break;
            case self::EXCEL_7:
                $write = new \PHPExcel_Writer_Excel2007($this->writeHandle);
                break;
            case self::CSV:
                $write = new \PHPExcel_Writer_CSV($this->writeHandle);
                break;
            default :
                $write = new \PHPExcel_Writer_Excel2007($this->writeHandle);
                break;
        }
        $write->save('php://output');
        return $this;
    }

    /**
     * 写入一行数据
     * @param int $lineNumber   行号
     * @param array $lineData   数据
     * @param bool|TRUE $icon   是否进行转码
     * @return bool
     */
    public function writeLine($lineData = array()) {
        //从行头开始读取数据，横坐标移动到行首
        $this->iteratorX = 1;
        $this->line = $lineData;
        foreach ($this->line as $v) {
            $this->writeCell($v, $this->iteratorY, $this->iteratorX++);
        }
        $this->iteratorY++;
        return $this;
    }

    /**
     * 设置表头
     * @param array $til
     */
    public function writeTitle($til = array()) {
        //清空title
        $this->title = $this->titleKey = $this->titleValue = [];
        $this->titleCount = 0;
        $this->iteratorX = $this->iteratorY = 1;
        $this->title = $til;
        $this->writeLine($til);
        $this->titleCount = count($til);
        return $this;
    }

    /**
     * 写入一个单元格数据
     * @param int $lineNumber   行号
     * @param int $rowNumber    列号
     * @param string $cellValue 值
     * @param bool|TRUE $icon   是否进行转码
     * @return $this
     */
    public function writeCell($cellValue = [], $rowNumber = 2, $colNumber = 1) {
        if (empty($colNumber) || empty($rowNumber)) {
            return $this;
        }
        //保存设置的值
        $this->cell = $cellValue;

        //配置参数
        $config = [];
        if (!empty($cellValue['config']) && is_array($cellValue['config'])) {
            $config = $cellValue['config'];
        }

        //默认可以使用非数组和数组
        if (is_array($cellValue)) {
            switch ($cellValue['type']) {
                //图片类型
                case 'img':
                    $this->writeImageCell($cellValue['value'], $rowNumber, $colNumber, $config);
                    break;
                //文本类型
                case 'text':
                    $this->writeTextCell($cellValue['value'], $rowNumber, $colNumber, $config);
                    break;
                //其他类型
                default :
                    $this->writeStringCell($cellValue['value'], $rowNumber, $colNumber, $config);
                    break;
            }
        } else {
            $this->writeStringCell($cellValue, $rowNumber, $colNumber, $config);
        }

        return $this;
    }

    /**
     * 写入图片
     * @param array $cellValue
     * @param int $rowNumber
     * @param int $columnNumber
     * @return $this
     */
    public function writeImageCell($imgPath = '', $rowNumber = 0, $colNumber = 0, $imgConfig = []) {
        //如果参数有空
        if (empty($rowNumber) || empty($imgPath) || empty($colNumber) || empty($imgPath)) {
            return $this;
        }

        //如果文件不存在
        if (is_dir($imgPath) || !file_exists($imgPath)) {
            return $this;
        }

        $index = $this->_getABC($colNumber) . $rowNumber;
        $img = new \PHPExcel_Worksheet_Drawing();
        $img->setPath($imgPath);
        //配置图片的相关参数
        foreach ($imgConfig as $key => $conf) {
            switch ($key) {
                case 'height' :
                    $img->setHeight(intval($conf));//写入图片高度
                    break;

                case 'width' :
                    $img->setWidth(intval($conf));//写入图片宽度
                    break;

                case 'rotation' :
                    $img->setRotation(intval($conf));//设置旋转角度
                    break;

                case 'Offset_x' :
                    $img->set(intval($conf));//写入图片在指定格中的X坐标值
                    break;

                case 'offset_y' :
                    $img->setOffsetY(intval($conf));//写入图片在指定格中的Y坐标值
                    break;

                case 'visible' :
                    $img->getShadow()->setVisible($conf); //$conf = true or false
                    break;

                case 'direction' :
                    $img->getShadow()->setDirection(intval($conf)); //
                    break;
                default :
                    break;
            }
        }

        $img->setCoordinates($index);//设置图片所在表格位置
        $img->setWorksheet($this->getActiveSheet());//把图片写到当前的表格中
        return $this;
    }

    /**
     * @param string $string
     * @param string $indexCode
     */
    public function writeTextCell($text = '', $rowNumber = 0, $colNumber = 0, $textConfig = []) {
        //如果参数有空
        if (empty($rowNumber) || empty($colNumber)) {
            return $this;
        }

        $richText = new \PHPExcel_RichText();
//        $richText->createText($text);
        $richTextStyle = $richText->createTextRun($text);

        //配置图片的相关参数
        foreach ($textConfig as $key => $conf) {
            switch ($key) {
                //设置加粗 $conf = true or false
                case 'bold':
                    $richTextStyle->getFont()->setBold($conf);
                    break;
                //设置倾斜 $conf = true or false
                case 'italic':
                    $richTextStyle->getFont()->setBold($conf);
                    break;
                //设置颜色 $conf = argb 如 : 'FF000000'
                case 'color':
                    $richTextStyle->getFont()->setColor(new \PHPExcel_Style_Color($conf));
                    break;
                default:
                    break;
            }
        }

        $this->getActiveSheet()->setCellValue($this->_getABC($colNumber) . $rowNumber, $richText);

        return $this;
    }

    /**
     * @param string $string
     * @param string $indexCode
     */
    public function writeStringCell($string = '', $rowNumber = 0, $colNumber = 0, $stringConfig = []) {
        $this->getActiveSheet()->setCellValue($this->_getABC($colNumber) . $rowNumber, $string);
    }

    /**
     * 保存到指定文件目录或者输出到页面
     */
    public function save() {   //是否下载到客户端
        $write = NULL;
        switch ($this->excelType) {
            case self::EXCEL_5:
                $write = new \PHPExcel_Writer_Excel5($this->writeHandle);
                break;
            case self::EXCEL_7:
                $write = new \PHPExcel_Writer_Excel2007($this->writeHandle);
                break;
            case self::CSV:
                $write = new \PHPExcel_Writer_CSV($this->writeHandle);
                break;
            default:
                $write = new \PHPExcel_Writer_Excel2007($this->writeHandle);
                break;
        }
        $write->save($this->fileName);
        return $this;
    }

    /**
     * 读取excel
     * @author mjf<1051020685@qq.com>
     * @copyright 2016-8-8
     * @param string $file
     * @return Ambigous <multitype:, mixed>
     */
    public function readExcel($file){
        $fileType = $this->excelType;

        if (($fileType == 'application/vnd.ms-excel') || ($fileType == 'application/vnd.ms-office')) {
            $read = new \PHPExcel_Reader_Excel5();
        } else if (($fileType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || ($fileType == 'application/zip')) {
            $read = new \PHPExcel_Reader_Excel2007();
        } else {
            return NULL;
        }

        $excel = $read->load($file);
        return $excel->getActiveSheet()->toArray();
    }

    /**
     * 饮食调用获取属性
     * @param $name
     * @return array|null|string
     */
    function __get($name)
    {
        // TODO: Implement __get() method.
        switch(strtolower($name)) {
            case 'line':
                return $this->line;
            case 'cell':
                return $this->cell;
            case 'filename':
                return $this->fileName;
            case 'title':
                return $this->title;
            case 'pointer':
                return [
                    'x' => $this->iteratorX,
                    'y' => $this->iteratorY
                ];
            case 'highestrow':
                return $this->getActiveSheet()->getHighestRow();
            case 'highestcolumn':
                return $this->getActiveSheet()->getHighestColumn();
            default:
                return NULL;
        }
    }
}