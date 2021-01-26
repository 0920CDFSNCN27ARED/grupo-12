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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL,
  `status` varchar(20) NOT NULL,
  `shopId` int(11) unsigned DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Esteban Burgos','esteban.burgos','1126790610','estebanburgos85@gmail.com','zMNECaGH','avatar-1611429305143.jpeg',1,'active',1,'seller','Usuario administrador del sistema','','','https://www.instagram.com/esteban.burgos1',NULL,'2021-01-23 20:52:27'),(2,'Isa Cardinal','Alecia Jirieck','110-352-5060','ajirieck1@illinois.edu','CKy5cIj','avatar-1611337245385.png',0,'active',NULL,'buyer','Cystic fibros w pul man','https://www.facebook.com','https://www.twitter.com','https://www.instagram.com',NULL,'2021-01-22 14:40:45'),(3,'Elvera Nestle','Morton Pavinese','986-159-3417','mpavinese2@eepurl.com','RySHQHzkUIb6','avatar-1611337669371.png',0,'active',3,'seller','Cysts of jaws NEC','https://www.facebook.com','https://www.twitter.com','https://www.instagram.com',NULL,'2021-01-25 20:51:47'),(4,'Alica Scimone de la torre','Pia Thackray','118-311-6859','pthackray3@dot.gov','$2b$10$E5DcGN4f2S04oSm8Z3tTdOpSqRH5/a5Leyqi4L.EpvsbKGCrN4qve','avatar-1611331904449.png',0,'active',NULL,'buyer','Congenital cystic lung','https://www.facebook.com','https://www.twitter.com','https://www.instagram.com',NULL,'2021-01-22 14:38:43'),(5,'Murray O\'Curran','Aldin Sly','924-332-6692','asly4@surveymonkey.com','Mbny0P','avatar-1611338308564.png',0,'active',NULL,'buyer','Nontraum tendon rupt NEC','https://www.facebook.com','https://www.twitter.com','https://www.instagram.com',NULL,'2021-01-22 14:58:28'),(6,'Shae Smullin','Ketty Clemo','728-213-5917','kclemo5@ucla.edu','SGzELYc','avatar-1611338736110.png',0,'active',NULL,'buyer','Somat dysfunc sacral reg','https://www.facebook.com','https://www.twitter.com','https://www.instagram.com',NULL,'2021-01-22 15:05:36'),(7,'Marmaduke Chittey','Jerri Foakes','498-667-8958','jfoakes6@kickstarter.com','0J5toigsO4y','avatar-1611425233256.png',0,'active',NULL,'buyer','Escribe algo sobre tí','https://www.facebook.com','https://www.twitter.com','https://www.instagram.com',NULL,'2021-01-23 18:07:13'),(17,'Nicolas Lopez','nico.lopez','01123394859','nico@lopez.com','$2b$10$iVndD6XNtV89tpz.nRx6SuZna8My/PZMPbiXEO9mQ.HZoCmN92BSK','avatar-1611337391727.png',0,'active',NULL,'buyer','Me gusta la gente','','','https://www.instagram.com/','2021-01-22 14:43:11','2021-01-22 14:43:11');
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

-- Dump completed on 2021-01-25 19:55:27
