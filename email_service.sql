/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : email_service

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2017-02-28 17:40:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for email_task
-- ----------------------------
DROP TABLE IF EXISTS `email_task`;
CREATE TABLE `email_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(255) DEFAULT NULL,
  `creater_id` int(11) DEFAULT NULL,
  `task_status` tinyint(4) DEFAULT '1',
  `file_path` varchar(255) DEFAULT NULL,
  `excel_file` varchar(255) DEFAULT NULL,
  `total_emails` int(11) DEFAULT '0',
  `succ_emails` int(11) DEFAULT '0',
  `fail_emails` int(11) DEFAULT '0',
  `read_emails` int(11) DEFAULT '0',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='邮件任务表';

-- ----------------------------
-- Table structure for task_result
-- ----------------------------
DROP TABLE IF EXISTS `task_result`;
CREATE TABLE `task_result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `to` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text,
  `attachments` varchar(255) DEFAULT NULL,
  `msg` varchar(255) DEFAULT '',
  `is_read` tinyint(4) DEFAULT '0',
  `read_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(4) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for task_template
-- ----------------------------
DROP TABLE IF EXISTS `task_template`;
CREATE TABLE `task_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text,
  `attachment` tinyint(4) DEFAULT NULL,
  `attachment_excel_col` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='邮件任务对应的邮件模板表';

-- ----------------------------
-- Table structure for task_transport
-- ----------------------------
DROP TABLE IF EXISTS `task_transport`;
CREATE TABLE `task_transport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `host` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `encryption` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='邮件任务的transport配置表';
