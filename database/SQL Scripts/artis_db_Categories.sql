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
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'Stout','Cerveza negra, espesa, con un gusto fuerte',0,1,'2021-01-01 20:52:27','2021-01-01 20:52:27'),(2,'Pilsen','Cerveza rubia, ligera',0,1,'2021-01-01 20:52:27','2021-01-01 20:52:27'),(3,'Porter','Cerveza negra, con un sabor moderado, complejo y equilibrado ',0,1,'2021-01-01 20:52:27','2021-01-01 20:52:27'),(4,'Pale Ale','Cerveza rubia, amarga, caracterizada por tener un alto porcentaje de alcohol',0,2,'2021-01-01 20:52:27','2021-01-01 20:52:27'),(5,'German Bock','Cerveza fuerte, de color oscuro',0,1,'2021-01-01 20:52:27','2021-01-01 20:52:27'),(6,'Apa','Cerveza de cuerpo ligero, refrescante, muy equilibrada',0,2,'2021-01-01 20:52:27','2021-01-01 20:52:27'),(7,'Ipa','Cerveza rubia, con amargor y aroma intenso',0,2,'2021-01-01 20:52:27','2021-01-01 20:52:27'),(8,'Dunkel','Ceveza oscura',0,1,'2021-01-01 20:52:27','2021-01-01 20:52:27');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
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
