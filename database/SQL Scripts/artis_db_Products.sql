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
  `price` float(10,2) DEFAULT NULL,
  `discount` float(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `ibu` float(10,2) DEFAULT NULL,
  `og` float(10,2) DEFAULT NULL,
  `abv` float(10,2) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'Premium Beer','La cerveza artesana belga Delirium Tremens tiene todo lo que una cerveza belga de estilo strong blond necesita.','Cervezas blond, afrutadas, tostadas y negras, que convierten a esta cervecera artesanal en una de las mejores cervecerías artesanas del mundo.','Delirium, Belgica',250.00,0.00,4,7.52,1010.00,1.23,'product-01.png','product-gallery-01.jpg','product-gallery-02.jpg','product-gallery-03.jpg',1,1,1,'2021-01-23 20:52:27','2021-01-23 20:52:27'),(2,'Apa Beer','La cerveza artesana belga Delirium Tremens tiene todo lo que una cerveza belga de estilo strong blond necesita.','Cervezas blond, afrutadas, tostadas y negras, que convierten a esta cervecera artesanal en una de las mejores cervecerías artesanas del mundo.','Delirium, Belgica',450.00,50.00,4,7.52,1010.00,1.23,'product-02.png','product-gallery-04.jpg','product-gallery-05.jpg','product-gallery-06.jpg',1,2,6,'2021-01-23 20:52:27','2021-01-23 20:52:27'),(3,'Ipa Beer','La cerveza artesana belga Delirium Tremens tiene todo lo que una cerveza belga de estilo strong blond necesita.','Cervezas blond, afrutadas, tostadas y negras, que convierten a esta cervecera artesanal en una de las mejores cervecerías artesanas del mundo.','Delirium, Belgica',389.00,0.00,4,7.52,1010.00,1.23,'product-03.png','product-gallery-07.jpg','product-gallery-08.jpg','product-gallery-09.jpg',1,2,7,'2021-01-23 20:52:27','2021-01-23 20:52:27'),(4,'German Beer','La cerveza artesana belga Delirium Tremens tiene todo lo que una cerveza belga de estilo strong blond necesita.','Cervezas blond, afrutadas, tostadas y negras, que convierten a esta cervecera artesanal en una de las mejores cervecerías artesanas del mundo.','Delirium, Belgica',356.45,50.56,4,7.52,1010.00,1.23,'product-04.png','product-gallery-10.jpg','product-gallery-01.jpg','product-gallery-02.jpg',1,1,5,'2021-01-23 20:52:27','2021-01-23 20:52:27');
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

-- Dump completed on 2021-02-22 12:41:14
