/*
Navicat MySQL Data Transfer

Source Server         : koaIsLand
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : israin

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-05-25 14:59:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fav_num` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('1', '1', '2020-03-20 20:08:04', '2020-03-20 20:08:04', null);
INSERT INTO `book` VALUES ('2', '-1', '2020-03-20 20:08:24', '2020-03-20 20:08:25', null);
INSERT INTO `book` VALUES ('3', '1', '2020-03-20 20:08:26', '2020-03-20 20:08:26', null);
INSERT INTO `book` VALUES ('4', '1', '2020-03-20 20:08:57', '2020-03-20 20:08:57', null);
INSERT INTO `book` VALUES ('5', '1', '2020-03-20 20:10:24', '2020-03-20 20:10:25', null);
INSERT INTO `book` VALUES ('6', '1', '2020-03-20 20:19:53', '2020-03-20 20:19:59', null);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book__id` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `num` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '1322', '这本书的确很好看,不错', '28', '0000-00-00 00:00:00', '2020-03-20 17:48:38', null);
INSERT INTO `comment` VALUES ('2', '1322', '嗯喜欢', '5', '0000-00-00 00:00:00', '2020-03-20 17:48:44', null);
INSERT INTO `comment` VALUES ('3', '1322', '情节很紧凑', '4', '0000-00-00 00:00:00', '2020-03-20 20:29:01', null);
INSERT INTO `comment` VALUES ('4', '1322', '永远不会忘了这本书', '3', '0000-00-00 00:00:00', '2020-03-20 17:53:06', null);
INSERT INTO `comment` VALUES ('5', '1322', '这本书绝了', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `comment` VALUES ('6', '1322', '完美', '4', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `comment` VALUES ('7', '1322', '结局完全想不到', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `comment` VALUES ('8', '1322', '这个作者叫什么？', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `comment` VALUES ('9', '1322', '555', '1', '2020-03-20 17:44:10', '2020-03-20 17:44:10', null);
INSERT INTO `comment` VALUES ('10', '1117', '555', '1', '2020-03-20 17:49:38', '2020-03-20 17:49:38', null);
INSERT INTO `comment` VALUES ('11', '8193', '555', '1', '2020-03-20 20:22:52', '2020-03-20 20:22:52', null);
INSERT INTO `comment` VALUES ('12', '8193', '444', '1', '2020-03-20 20:22:59', '2020-03-20 20:22:59', null);
INSERT INTO `comment` VALUES ('13', '1322', '很可疑', '1', '2020-03-20 20:24:32', '2020-03-20 20:24:32', null);
INSERT INTO `comment` VALUES ('14', '1322', 'fff', '1', '2020-03-20 20:24:51', '2020-03-20 20:24:51', null);
INSERT INTO `comment` VALUES ('15', '1322', '6666', '2', '2020-03-20 20:25:12', '2020-03-20 20:26:07', null);
INSERT INTO `comment` VALUES ('16', '1322', 'haokan', '1', '2020-03-20 20:28:53', '2020-03-20 20:28:53', null);

-- ----------------------------
-- Table structure for favor
-- ----------------------------
DROP TABLE IF EXISTS `favor`;
CREATE TABLE `favor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `art_id` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of favor
-- ----------------------------
INSERT INTO `favor` VALUES ('1', '16', '1322', '400', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `favor` VALUES ('2', '17', '1322', '400', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `favor` VALUES ('25', '16', '8154', '400', '2020-03-20 18:42:55', '2020-03-20 18:42:55', null);
INSERT INTO `favor` VALUES ('27', '12', '8193', '400', '2020-03-20 19:24:36', '2020-03-20 19:24:36', null);
INSERT INTO `favor` VALUES ('46', '16', '20816', '400', '2020-03-20 20:08:26', '2020-03-20 20:08:26', null);
INSERT INTO `favor` VALUES ('47', '16', '1117', '400', '2020-03-20 20:08:57', '2020-03-20 20:08:57', null);
INSERT INTO `favor` VALUES ('48', '16', '1136', '400', '2020-03-20 20:10:24', '2020-03-20 20:10:24', null);
INSERT INTO `favor` VALUES ('49', '1', '8193', '400', '2020-03-20 20:19:44', '2020-03-20 20:19:44', null);
INSERT INTO `favor` VALUES ('50', '16', '1', '300', '2020-03-22 14:31:12', '2020-03-22 14:31:12', null);
INSERT INTO `favor` VALUES ('51', '16', '1', '200', '2020-03-22 14:35:24', '2020-03-22 14:35:24', null);

-- ----------------------------
-- Table structure for flow
-- ----------------------------
DROP TABLE IF EXISTS `flow`;
CREATE TABLE `flow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL,
  `art_id` int(11) DEFAULT NULL,
  `index` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of flow
-- ----------------------------
INSERT INTO `flow` VALUES ('1', '100', '1', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `flow` VALUES ('2', '200', '1', '2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `flow` VALUES ('3', '300', '1', '3', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `flow` VALUES ('4', '200', '2', '4', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);

-- ----------------------------
-- Table structure for hotbook
-- ----------------------------
DROP TABLE IF EXISTS `hotbook`;
CREATE TABLE `hotbook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `index` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20817 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotbook
-- ----------------------------
INSERT INTO `hotbook` VALUES ('1003', '11', 'https://img3.doubanio.com/lpic/s23836852.jpg', '余华', '活着', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('1117', '5', 'https://img3.doubanio.com/lpic/s3254244.jpg', '[日]东野圭吾', '嫌疑人X的献身', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('1136', '6', 'https://img3.doubanio.com/lpic/s2962510.jpg', '[英]阿加莎·克里斯蒂', '无人生还', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('1322', '1', 'https://img3.doubanio.com/view/subject/s/public/s33561612.jpg', '冶文彪', '人皮论语', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('1825', '7', 'https://img1.doubanio.com/lpic/s1683067.jpg', '[英]阿加莎·克里斯蒂', '尼罗河上的惨案', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('1883', '8', 'https://img1.doubanio.com/lpic/s2990929.jpg', '[英]阿加莎·克里斯蒂', '幕后凶手', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('3852', '10', 'https://img1.doubanio.com/lpic/s29171799.jpg', '凯瑟琳·哈卡帕', '阿加莎的毒药', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('8154', '2', 'https://img1.doubanio.com/lpic/s27956707.jpg', '冶文彪', '清明上河图密码', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('8193', '3', 'https://img1.doubanio.com/lpic/s29442269.jpg', '冶文彪', '清明上河图密码4', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('10631', '9', 'https://img1.doubanio.com/lpic/s4260778.jpg', '[英]阿加莎·克里斯蒂', '告诉我，你怎样去生活', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('13807', '12', 'https://img3.doubanio.com/lpic/s5740706.jpg', '余华', '没有一条道路是重复的', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `hotbook` VALUES ('20816', '4', 'https://img3.doubanio.com/lpic/s28272925.jpg', '冶文彪', '清明上河图密码2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);

-- ----------------------------
-- Table structure for movie
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `fav_num` int(11) DEFAULT '0',
  `content` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movie
-- ----------------------------
INSERT INTO `movie` VALUES ('1', 'extraimage.net/images/2020/03/09/f1873e7fa2c2d2ba765c2ff411d20672.jpg', '[美] 菲利普·罗斯', '168', '事实', '100', '0000-00-00 00:00:00', '2020-03-17 17:23:49', null);
INSERT INTO `movie` VALUES ('2', 'img1.doubanio.com/view/subject/s/public/s33545817.jpg', '[英] 丹·琼斯', '200', '血夏', '100', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);
INSERT INTO `movie` VALUES ('3', 'img1.doubanio.com/view/subject/s/public/s33545817.jpg', '[日] 凑佳苗', '300', '望乡', '100', '0000-00-00 00:00:00', '0000-00-00 00:00:00', null);

-- ----------------------------
-- Table structure for music
-- ----------------------------
DROP TABLE IF EXISTS `music`;
CREATE TABLE `music` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `fav_num` int(11) DEFAULT '0',
  `content` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of music
-- ----------------------------
INSERT INTO `music` VALUES ('1', 'https://music.163.com/outchain/player?type=2&id=29719651&auto=1&height=66', 'img1.doubanio.com/view/subject/s/public/s33545817.jpg', '曾彦修访谈录', '201', '曾彦修', '200', '0000-00-00 00:00:00', '2020-03-22 14:35:24', null);
INSERT INTO `music` VALUES ('2', 'https://music.163.com/outchain/player?//music.163.com/outchain/player?type=2&id=28798308&auto=1&height=66', 'https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=1400308857,3953814418&fm=74&app=80&f=JPEG&size=f121,121?sec=1880279984&t=56a20e5283bbc042179fbb486fd8c8fd', '血夏', '22', '流光记', '200', '0000-00-00 00:00:00', '2020-03-22 14:38:41', null);

-- ----------------------------
-- Table structure for sentence
-- ----------------------------
DROP TABLE IF EXISTS `sentence`;
CREATE TABLE `sentence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `fav_num` int(11) DEFAULT '0',
  `content` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sentence
-- ----------------------------
INSERT INTO `sentence` VALUES ('1', 'img3.doubanio.com/view/subject/s/public/s33575980.jpg', 'J', '201', '123456', '300', '0000-00-00 00:00:00', '2020-03-22 14:31:12', null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `openid` varchar(64) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('16', null, null, null, 'os-DN4jFOi09wmZizbkT7ZN1CMW4', '2020-03-16 14:45:43', '2020-03-16 14:45:43', null);
INSERT INTO `user` VALUES ('17', '$2a$10$junbJu9EKiVwt1RdtJxifO5vnSODjrvuBdEWHNb4wo0.5uP6FYuJO', '黄雨驣333', '123456@qq.com', null, '2020-03-19 15:43:07', '2020-03-19 15:43:07', null);
