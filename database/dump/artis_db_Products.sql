CREATE DATABASE  IF NOT EXISTS `artis_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `artis_db`;
-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: artis_db
-- ------------------------------------------------------
-- Server version	5.7.26

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
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `brewery` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `ibu` float DEFAULT NULL,
  `og` float DEFAULT NULL,
  `abv` float DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gallery01` varchar(255) DEFAULT NULL,
  `gallery02` varchar(255) DEFAULT NULL,
  `gallery03` varchar(255) DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'Nuevo producto','Éste es un producto excesivamente caro pero uno de las mejores cervezas que existe en el mundo','l;l;l;l','Malague',100,5,3,43,1050,9.9,'without-image.png','without-image.png','without-image.png','without-image.png',1,1,1,'2021-01-25 18:18:56','2021-01-25 18:18:56'),(2,'Formularios','Éste es un producto excesivamente caro pero uno de las mejores cervezas que existe en el mundo','nnnnnnn','Malague',100,78,3,24,1080,2.7,'without-image.png','without-image.png','without-image.png','without-image.png',1,1,1,'2021-01-25 19:26:58','2021-01-25 19:26:58'),(3,'Nuevo producto','Como me cuesta creer descripciones ficticias2','','Malague',100,5,3,10.5,1060,6.1,'avatar-1611603201319.png','without-image.png','without-image.png','without-image.png',1,2,4,'2021-01-25 19:33:21','2021-01-25 19:33:21'),(4,'Nuevo producto','Cerveza rubia, ligera','nmnmnmn','Malague',100,78,3,25.5,1120,5.3,'avatar-1611603480893.png','gallery-1611603480908.jpg','gallery-1611603480909.jpg','without-image.png',1,2,7,'2021-01-25 19:38:00','2021-01-25 19:38:00'),(5,'Migueli Del Seli','Éste es un producto excesivamente caro pero uno de las mejores cervezas que existe en el mundo','lkjkj;kjk','Malague',100,5,3,36.5,1090,4.5,'avatar-1611607459141.png','gallery-1611607459145.jpg','gallery-1611607459147.jpg','gallery-1611607459148.jpg',1,2,6,'2021-01-25 20:44:19','2021-01-25 20:44:19'),(6,'test','Como me cuesta creer descripciones ficticias2','lkkk;lk;lk;lk;lkjkj','Malague',66666,78,3,42,1110,4.5,'avatar-1611607818454.png','gallery-1611607818461.jpg','gallery-1611607818462.jpg','gallery-1611607818463.jpg',1,2,6,'2021-01-25 20:50:18','2021-01-25 20:50:18');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-25 19:55:27
