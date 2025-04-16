-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: new_db
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `benefit`
--

DROP TABLE IF EXISTS `benefit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benefit` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benefit`
--

LOCK TABLES `benefit` WRITE;
/*!40000 ALTER TABLE `benefit` DISABLE KEYS */;
INSERT INTO `benefit` VALUES (1,'Bonus','14 tháng lương, tăng lương 2 lần/năm'),(2,'Healthcare Plan','Bảo hiểm đầy đủ theo quy định'),(3,'Paid Leave','Cơ hội nâng cao kiến thức, thăng tiến'),(4,'Training','Đào tạo quản lý, kỹ năng mềm'),(5,'Travel Opportunities','Company Trip, khám sức khoẻ'),(6,'Bonus','Lương thưởng theo năng lực'),(7,'Training','Continuous learning'),(8,'Awards','Exciting challenges'),(9,'Bonus','Creative workplace'),(10,'Others','Môi trường làm việc năng động'),(11,'Training','Đào tạo nước ngoài'),(12,'Bonus','Lương thưởng hấp dẫn lên đến 300%'),(13,'Training','Continuous learning'),(14,'Awards','Exciting challenges'),(15,'Bonus','Creative workplace');
/*!40000 ALTER TABLE `benefit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `productID` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1,1,2,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(2,2,2,1,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(3,3,3,3,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(4,4,4,1,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(5,5,5,2,'2025-03-11 22:15:38','2025-03-11 22:15:38');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'IT - Software'),(2,'Backend Developers'),(3,'Frontend Developers');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `job_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_constrainst_job_ref` FOREIGN KEY (`id`) REFERENCES `job` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Yumeshin Vietnam','https://images.vietnamworks.com/pictureofcompany/8c/10756982.png',1),(2,'ARIS Vietnam Co., Ltd','https://images.vietnamworks.com/pictureofcompany/40/6215187.png',2),(3,'Gameloft','https://images.vietnamworks.com/pictureofcompany/e0/4079410.png',3),(4,'Shinhan DS Vietnam','https://images.vietnamworks.com/pictureofcompany/92/10668657.png',4),(5,'Gameloft HCM','https://images.vietnamworks.com/pictureofcompany/e0/4079410.png',5);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `productID` int NOT NULL,
  `productlineID` int NOT NULL,
  `discountPercentage` decimal(5,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`,`productID`,`productlineID`),
  KEY `fk_discounts_products_idx` (`productID`),
  KEY `fk_discounts_productlines1_idx` (`productlineID`),
  CONSTRAINT `fk_discounts_productlines1` FOREIGN KEY (`productlineID`) REFERENCES `productlines` (`id`),
  CONSTRAINT `fk_discounts_products` FOREIGN KEY (`productID`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
INSERT INTO `discounts` VALUES (1,'2025-03-15 00:00:00','2025-03-31 00:00:00',1,1,10.00),(2,'2025-04-01 00:00:00','2025-04-15 00:00:00',2,2,15.00),(3,'2025-04-05 00:00:00','2025-04-20 00:00:00',3,1,5.00),(4,'2025-03-10 00:00:00','2025-03-25 00:00:00',4,3,20.00),(5,'2025-05-01 00:00:00','2025-05-15 00:00:00',5,2,25.00),(7,NULL,NULL,5,3,11.00);
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `id` int NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `jobDescription` longtext,
  `jobRequirement` longtext,
  `salaryMin` int DEFAULT NULL,
  `salaryMax` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,'02 JAVA Web Developer (Hà Nội)','- Triển khai các ứng dụng trên nền tảng Java theo yêu cầu của khách hàng; - Tham gia phân tích, thiết kế, phát triển, bảo trì hệ thống; - Viết mã nguồn và thực hiện Unit test;','- Có ít nhất 1 năm kinh nghiệm Java; - Hiểu OOP, Clean Code, Design Patterns; - UML, Spring MVC, Hibernate; - Javascript frameworks; - MySQL, MongoDB, Redis; - Git',500,1000),(2,'Android Developer (Fresher/junior & Senior)','Trao đổi thêm khi phỏng vấn.','- Java, Android SDK, NDK, OOP, Web services; - SQL; - Có kinh nghiệm 1-2 năm; - Ưu tiên biết tiếng Nhật',300,0),(3,'Senior Front-End Developer','Web-based products for marketing, corporate sites, forums, newsletters.','3+ years front-end; HTML5, CSS, JS; DOM, Angular, Node, React; Git Bash, SVN',300,0),(4,'Web Developer (Fullstack)','Xây dựng các ứng dụng web cho ngân hàng và tài chính; bảo trì hệ thống.','3-5 năm kinh nghiệm; Java, Spring, Restful API, HTML, CSS; ưu tiên kinh nghiệm tài chính-ngân hàng',500,1500),(5,'Senior PHP Developer','Phát triển sản phẩm web, hỗ trợ marketing và các dự án nội bộ.','3 năm kinh nghiệm PHP, Framework Zend, CodeIgniter; HTML, CSS, JS; hiểu rõ Rest API, Git',300,0);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_detail`
--

DROP TABLE IF EXISTS `job_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_detail` (
  `job_id` int NOT NULL,
  `category_id` int NOT NULL,
  `skill_id` int NOT NULL,
  `benefit_id` int NOT NULL,
  `location_id` int NOT NULL,
  PRIMARY KEY (`job_id`,`category_id`,`skill_id`,`benefit_id`,`location_id`),
  KEY `fk_constrainst_category_ref_07_idx` (`category_id`),
  KEY `fk_constrainst_location_ref_07_idx` (`location_id`),
  KEY `fk_constrainst_skill_ref_07_idx` (`skill_id`),
  KEY `fk_constrainst_benefit_ref_07_idx` (`benefit_id`),
  CONSTRAINT `fk_constrainst_category_ref_07` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_constrainst_job_ref_07` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_detail`
--

LOCK TABLES `job_detail` WRITE;
/*!40000 ALTER TABLE `job_detail` DISABLE KEYS */;
INSERT INTO `job_detail` VALUES (1,1,3,1,2),(1,1,3,5,2),(1,1,4,1,2),(1,1,4,5,2),(1,1,5,1,2),(1,1,5,4,2),(1,1,5,6,2),(1,1,7,1,2),(1,1,7,4,2),(1,1,7,6,2),(1,1,8,1,2),(1,1,8,5,2),(2,1,1,1,1),(2,1,1,4,1),(2,1,1,5,1),(2,1,2,1,1),(2,1,2,4,1),(2,1,2,5,1),(2,1,4,1,1),(2,1,4,4,1),(2,1,4,5,1),(2,1,6,1,1),(2,1,6,4,1),(2,1,6,5,1),(2,1,7,1,1),(2,1,7,4,1),(2,1,7,5,1),(2,1,9,1,1),(2,1,9,4,1),(2,1,9,5,1),(2,1,10,1,1),(2,1,10,4,1),(2,1,10,5,1),(2,1,11,1,1),(2,1,11,4,1),(2,1,11,5,1),(2,1,12,1,1),(2,1,12,4,1),(2,1,12,5,1),(2,1,13,1,1),(2,1,13,4,1),(2,1,13,5,1),(3,1,10,1,1),(3,1,10,4,1),(3,1,10,6,1),(3,1,11,1,1),(3,1,11,4,1),(3,1,11,6,1),(3,1,12,1,1),(3,1,12,4,1),(3,1,12,6,1),(3,1,13,1,1),(3,1,13,4,1),(3,1,13,6,1),(3,1,14,1,1),(3,1,14,4,1),(3,1,14,6,1),(3,1,15,1,1),(3,1,15,4,1),(3,1,15,6,1),(3,1,16,1,1),(3,1,16,4,1),(3,1,16,6,1),(3,1,17,1,1),(3,1,17,4,1),(3,1,17,6,1),(1,2,3,1,2),(1,2,3,5,2),(1,2,4,1,2),(1,2,4,5,2),(1,2,6,1,2),(1,2,6,4,2),(1,2,6,6,2),(1,2,8,1,2),(1,2,8,5,2),(1,2,9,1,2),(1,2,9,4,2),(1,2,9,6,2),(3,2,10,1,1),(3,2,10,4,1),(3,2,10,6,1),(3,2,11,1,1),(3,2,11,4,1),(3,2,11,6,1),(3,2,12,1,1),(3,2,12,4,1),(3,2,12,6,1),(3,2,13,1,1),(3,2,13,4,1),(3,2,13,6,1),(3,2,14,1,1),(3,2,14,4,1),(3,2,14,6,1),(3,2,15,1,1),(3,2,15,4,1),(3,2,15,6,1),(3,2,16,1,1),(3,2,16,4,1),(3,2,16,6,1),(3,2,17,1,1),(3,2,17,4,1),(3,2,17,6,1);
/*!40000 ALTER TABLE `job_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Hà Nội'),(2,'Hồ Chí Minh');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productID` int DEFAULT NULL,
  `orderID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `priceAtOrder` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productID` (`productID`),
  KEY `orderID` (`orderID`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`orderID`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,1,1,1,500000,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(2,2,2,1,450000,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(3,3,3,1,250000,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(4,4,4,1,2500000,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(5,5,5,1,300000,'2025-03-11 22:15:38','2025-03-11 22:15:38');
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `orderDate` datetime DEFAULT NULL,
  `status` text,
  `shippedDate` datetime DEFAULT NULL,
  `totalAmount` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'2025-03-11 22:15:38','Processing',NULL,500000,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(2,2,'2025-03-11 22:15:38','Completed','2025-03-11 22:15:38',450000,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(3,3,'2025-03-11 22:15:38','Shipped','2025-03-11 22:15:38',250000,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(4,4,'2025-03-11 22:15:38','Pending',NULL,2500000,'2025-03-11 22:15:38','2025-03-11 22:15:38'),(5,5,'2025-03-11 22:15:38','Cancelled',NULL,300000,'2025-03-11 22:15:38','2025-03-11 22:15:38');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productimages`
--

DROP TABLE IF EXISTS `productimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productimages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productID` int DEFAULT NULL,
  `imageUrl` text,
  PRIMARY KEY (`id`),
  KEY `productID` (`productID`),
  CONSTRAINT `productimages_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimages`
--

LOCK TABLES `productimages` WRITE;
/*!40000 ALTER TABLE `productimages` DISABLE KEYS */;
INSERT INTO `productimages` VALUES (1,1,'./img/product-33.png'),(2,1,'kem_duong_am_2.jpg'),(3,1,'kem_duong_am_3.jpg'),(4,1,'kem_duong_am_4.jpg'),(5,1,'kem_duong_am_5.jpg'),(6,2,'./img/product-12.png'),(7,3,'./img/product-11.png'),(8,4,'./img/product-21.png'),(9,5,'./img/product-23.png'),(16,27,'photoList-1744718001004-7373902.png'),(17,28,'photoList-1744718909822-101223125.png'),(18,29,'photoList-1744718911843-769464083.png'),(19,30,'photoList-1744720831796-662814688.png'),(20,30,'photoList-1744720831798-212599761.png'),(21,30,'photoList-1744720831951-157830205.png');
/*!40000 ALTER TABLE `productimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productlines`
--

DROP TABLE IF EXISTS `productlines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productlines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productLineName` varchar(255) DEFAULT NULL,
  `textDescription` text,
  `imageUrl` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productlines`
--

LOCK TABLES `productlines` WRITE;
/*!40000 ALTER TABLE `productlines` DISABLE KEYS */;
INSERT INTO `productlines` VALUES (1,'Skincare','Sản phẩm chăm sóc da','skincare.jpg','2025-03-11 22:15:38','2025-03-11 22:15:38'),(2,'Makeup','Sản phẩm trang điểm','makeup.jpg','2025-03-11 22:15:38','2025-03-11 22:15:38'),(3,'Haircare','Sản phẩm chăm sóc tóc','haircare.jpg','2025-03-11 22:15:38','2025-03-11 22:15:38'),(4,'Fragrance','Nước hoa','fragrance.jpg','2025-03-11 22:15:38','2025-03-11 22:15:38'),(5,'Bodycare','Sản phẩm chăm sóc cơ thể','bodycare.jpg','2025-03-11 22:15:38','2025-03-11 22:15:38');
/*!40000 ALTER TABLE `productlines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) DEFAULT NULL,
  `productLine` int DEFAULT NULL,
  `productVendor` varchar(255) DEFAULT NULL,
  `productDescription` varchar(255) DEFAULT NULL,
  `quantityInstock` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductLine` (`productLine`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productLine`) REFERENCES `productlines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'A',1,'L\'Oreal','Kem dưỡng ẩm da ban đêm',100,500000),(2,'Son môi đỏ',2,'MAC','Son môi đỏ quyến rũ',150,450000),(3,'Dầu gội thảo dược',3,'Pantene','Dầu gội chiết xuất thảo dược',200,250000),(4,'Nước hoa Chanel No.5',4,'Chanel','Nước hoa cao cấp',80,500000),(5,'Sữa dưỡng thể',5,'Nivea','Dưỡng thể làm mềm da',120,300000),(6,'Kem khu pp',2,'LOreal','Kem dưỡng ẩm da ban đêm',100,500000),(22,'K',2,'LOreal','Kem dưỡng ẩm da ban đêm',100,500000),(23,'Kem',2,'LOreal','Kem dưỡng ẩm da ban đêm',100,500000),(24,'Kims',2,'LOreal','Kem dưỡng ẩm da ban đêm',100,500000),(25,'Kims',2,'LOreal','Kem dưỡng ẩm da ban đêm',100,500000),(26,'cok',2,'LOreal','Kem dưỡng ẩm da ban đêm',100,500000),(27,'Điện thoại XYZ',1,'Công ty ABC','Sản phẩm công nghệ mới nhất',100,19990000),(28,'Điện thoại XYZ',1,'Công ty ABC','Sản phẩm công nghệ mới nhất',100,19990000),(29,'Điện thoại XYZ',1,'Công ty ABC','Sản phẩm công nghệ mới nhất',100,19990000),(30,'Abc',1,'Công ty ABC','Sản phẩm công nghệ mới nhất',100,19990000);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `Rating` int DEFAULT NULL,
  `reviewText` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `productID` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,1,5,'Rất tốt, tôi thích sản phẩm này!','2025-03-11 22:15:38','2025-03-11 22:15:38'),(2,2,2,4,'Màu đẹp nhưng hơi khô môi','2025-03-11 22:15:38','2025-03-11 22:15:38'),(3,3,3,5,'Dầu gội mùi thơm, tóc mượt hơn','2025-03-11 22:15:38','2025-03-11 22:15:38'),(4,4,4,5,'Mùi hương sang trọng, giữ mùi lâu','2025-03-11 22:15:38','2025-03-11 22:15:38'),(5,5,5,3,'Cũng được nhưng không quá đặc biệt','2025-03-11 22:15:38','2025-03-11 22:15:38');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20250108073912-create-product-line.js'),('20250108073913-create-product.js'),('20250108073915-create-product-image.js'),('20250108073918-create-user.js'),('20250108073919-create-review.js'),('20250108073921-create-cart.js'),('20250108073925-create-order.js'),('20250108073932-create-order-detail.js'),('20250109051012-create-user.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,'Android Ndk'),(2,'Android Sdk'),(3,'Back-End'),(4,'Front-End'),(5,'HTML'),(6,'Hibernate'),(7,'Java'),(8,'JavaScript'),(9,'PHP'),(10,'Restful Api'),(11,'Scrum'),(12,'Software Engineering'),(13,'Spring'),(14,'Spring Boots'),(15,'Spring MVC'),(16,'Struts'),(17,'Web Development'),(18,'Web Sevice'),(19,'Weblogic');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT 'GOOGLE_SSO',
  `username` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` bigint DEFAULT NULL,
  `role` enum('customer','seller','admin') NOT NULL DEFAULT 'customer',
  `google_id` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `google_id` (`google_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20,NULL,'anhnguyen2k373@gmail.com',NULL,NULL,'$2b$10$6NVpBveG11/eooQJRDqvXu82biBAMfwr6VFg1IOAlKuX1TYWwAms2','testuser',NULL,NULL,'admin',NULL,NULL),(29,NULL,'user@example.com',NULL,NULL,'strongpassword','user123',NULL,NULL,'customer',NULL,NULL),(30,'Nguyễn Văn B','nguyenvanb@example.com',30,'female','password123','nguyenvanb',NULL,NULL,'admin',NULL,'avatar-1744709727420-945292026.jpg'),(31,'Nguyễn Văn B','nguyenvanb@example.com',30,'female','password123','nguyenvanb',NULL,NULL,'admin',NULL,'avatar-1744710039312-653009025.jpg'),(32,NULL,'anhnguyen2k33@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,NULL),(33,NULL,'anhnguyen2k3@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,NULL),(34,NULL,'anhnguyen3@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,NULL),(35,NULL,'anhnguye3@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,NULL),(36,NULL,'anhnguye@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,NULL),(37,NULL,'anhngue@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,NULL),(38,NULL,'ngan@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,'http://localhost:5000/avatar-1744516087515-737242831.jpg'),(39,NULL,'ngan2@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,'http://localhost:5000/avatar-1744516251434-290269243.jpg'),(40,NULL,'ng@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,'avatar-1744516617939-724899382.jpg'),(41,NULL,'maingann@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,'avatar-1744519455003-993280233.jpg'),(42,'Ngan','maingannn@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,'avatar-1744519474056-904489749.jpg'),(43,NULL,'maingan@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,'avatar-1744519741773-908105987.jpg'),(44,NULL,'mangan@gmail.com',NULL,NULL,'1234',NULL,NULL,NULL,'customer',NULL,'avatar-1744520060066-639000974.jpg'),(45,NULL,'anhnguyenk3@gmail.com',NULL,NULL,'123',NULL,NULL,NULL,'customer',NULL,NULL),(46,'MaiNgan','anhngan@gmail.com',23,'0','$2b$10$plm50n2VZVDU.yi2v0e.6uo.juiyKVr2Qag4OEPljAcNb3pq6o2i6','anhngan',NULL,NULL,'admin',NULL,'avatar-1744520531752-553822195.jpg'),(47,NULL,'se.anh.nguyenduc@gmail.com',NULL,NULL,'GOOGLE_SSO','Anh Nguyễn',NULL,NULL,'customer','110495552594296743849','https://lh3.googleusercontent.com/a/ACg8ocJ5SZYqWGEIz40i2xnBpxpnufYrz_gHdUkrk22CWNBTwauA5EA=s96-c'),(48,NULL,'se.nhi.vuongdong@gmail.com',NULL,NULL,'GOOGLE_SSO','Nguyen Anh',NULL,NULL,'customer','112057046898094209264','https://lh3.googleusercontent.com/a/ACg8ocKXqvD4It1cvDMHG2_kLN5XVxCQKdgtUA1SOWMDGwLQlc0q8w=s96-c'),(49,NULL,'anhj@gmail.com',NULL,NULL,'$2b$10$T8Nh5i3b45gL7JMXBah9M.r3HxIv.Vz/NyNQbRlStVtnyrNamxkCC',NULL,NULL,NULL,'customer',NULL,NULL),(50,NULL,'anhj',NULL,NULL,'$2b$10$xIP9gUu.D2PQyyKHWXyEE.h88Sza3AC2I/DA1i1A.NDiE4.sTMnAi',NULL,NULL,NULL,'customer',NULL,NULL),(51,NULL,'anhjj@gmail.com',NULL,NULL,'$2b$10$pHsl/lj/47hhPKPkuWFhoOq.XkcahbAoPFrBXZJzAxPoHvd7xb9.q',NULL,NULL,NULL,'customer',NULL,NULL),(52,'Nguyen Van B','vanb@example.com',30,'nam','$2b$10$TFb1oPnCcB1vsG3gsWa6Z.QEbwmSU7ZAxwUOY4jF1v5xQT.3enG.W','nguyenvanb',NULL,NULL,'admin',NULL,NULL),(53,'Nguyễn Văn A','nguyenvana@example.com',25,'male','$2b$10$pXoCNaVjKIbUpq7UJNq/UO8nogGb8qNTnbmQS8bWsFNNniw.Xaj.m','nguyenvana',NULL,NULL,'customer',NULL,'avatar-1744707242165-898633376.png'),(54,'Nguyễn Văn A','nguyenvasna@example.com',25,'male','$2b$10$hNDc/OBhABowW359SBBkieS9P3zpb4kLgKLyaKs2Y/NoGEgCBDcRK','nguyenvana',NULL,NULL,'admin',NULL,'avatar-1744709203285-85320070.png'),(55,NULL,'anhnguyen2k2273@gmail.com',NULL,NULL,'$2b$10$Pj2I4t1Ltn/eamfW1x4oyepz3pr6SkvFyWkLy2m4B6wt4HxsAUYT.',NULL,NULL,NULL,'customer',NULL,NULL),(56,NULL,'anhnguyen2@gmail.com',NULL,NULL,'$2b$10$8s/pBnTLsh2towE1b3WniuaHtDINNQrL6emEhblYzM.UOHcsASr9S',NULL,NULL,NULL,'customer',NULL,NULL),(57,NULL,'anhnguyen2k373@gmail.com',NULL,NULL,'$2b$10$6NVpBveG11/eooQJRDqvXu82biBAMfwr6VFg1IOAlKuX1TYWwAms2','Đức Nguyễn',NULL,NULL,'customer','106022633102123512100','https://lh3.googleusercontent.com/a/ACg8ocIXMdUiQJamD4KGfs8bX3Scq4JIr7EiQ7yvxMrUpuJzQAU4fQRi9g=s96-c');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-16 11:34:56
