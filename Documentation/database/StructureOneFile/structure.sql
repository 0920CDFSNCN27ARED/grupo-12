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
-- Table structure for table `Addresses`
--

DROP TABLE IF EXISTS `Addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Addresses`
--

LOCK TABLES `Addresses` WRITE;
/*!40000 ALTER TABLE `Addresses` DISABLE KEYS */;
INSERT INTO `Addresses` VALUES (1,'Casa','Av Gaona 1234','Caballito','CABA','1405','Argentina','Tocar el timbre 1111 del 1A',1,'2021-01-23 20:52:27','2021-01-23 20:52:27'),(2,'Oficina','Av Belgrano 2345','Belgrano','CABA','1405','Argentina','Piso 1A',1,'2021-01-23 20:52:27','2021-01-23 20:52:27');
/*!40000 ALTER TABLE `Addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CartItems`
--

DROP TABLE IF EXISTS `CartItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CartItems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subtotal` float(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  `discount` float(10,2) DEFAULT NULL,
  `expireTime` datetime DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CartItems`
--

LOCK TABLES `CartItems` WRITE;
/*!40000 ALTER TABLE `CartItems` DISABLE KEYS */;
INSERT INTO `CartItems` VALUES (1,500.00,2,250.00,0.00,'2021-03-23 20:52:27',1,1,'2021-01-23 20:52:27','2021-01-23 20:52:27'),(2,400.00,1,450.00,50.00,'2021-03-23 20:52:27',2,1,'2021-01-23 20:52:27','2021-01-23 20:52:27');
/*!40000 ALTER TABLE `CartItems` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,'Esto es un comentario de ejemplo','2021-01-23',1,1,'2021-01-23 20:52:27','2021-01-23 20:52:27');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Coupons`
--

DROP TABLE IF EXISTS `Coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discount` float(10,2) DEFAULT NULL,
  `couponCode` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Coupons`
--

LOCK TABLES `Coupons` WRITE;
/*!40000 ALTER TABLE `Coupons` DISABLE KEYS */;
INSERT INTO `Coupons` VALUES (1,'Artis Kraken Coupon','Cupón de ejemplo',50.00,'ArtisCoupon','2021-01-23 20:52:27','2021-01-23 20:52:27');
/*!40000 ALTER TABLE `Coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderStatuses`
--

DROP TABLE IF EXISTS `OrderStatuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderStatuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderStatuses`
--

LOCK TABLES `OrderStatuses` WRITE;
/*!40000 ALTER TABLE `OrderStatuses` DISABLE KEYS */;
INSERT INTO `OrderStatuses` VALUES (1,'Pendiente de Pago','Pendiente de Pago','2021-01-01 20:52:27','2021-01-01 20:52:27'),(2,'Procesando','Procesando','2021-01-01 20:52:27','2021-01-01 20:52:27'),(3,'En Espera','En Espera','2021-01-01 20:52:27','2021-01-01 20:52:27'),(4,'Completado','Completado','2021-01-01 20:52:27','2021-01-01 20:52:27'),(5,'Cancelado','Cancelado','2021-01-01 20:52:27','2021-01-01 20:52:27'),(6,'Reembolsado','Reembolsado','2021-01-01 20:52:27','2021-01-01 20:52:27'),(7,'Fallido','Fallido','2021-01-01 20:52:27','2021-01-01 20:52:27');
/*!40000 ALTER TABLE `OrderStatuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `totalProducts` float(10,2) DEFAULT NULL,
  `totalShipping` float(10,2) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `tax` float(10,2) DEFAULT NULL,
  `total` float(10,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `paymentId` int(11) DEFAULT NULL,
  `couponId` int(11) DEFAULT NULL,
  `shippingMethodId` int(11) DEFAULT NULL,
  `billAddressId` int(11) DEFAULT NULL,
  `shippingAddressId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (1,'2021-01-23','admin@artiskraken.com.ar',900.00,300.20,'esto es una orden de prueba',50.20,1250.60,NULL,1,1,1,1,1,1,2,1,'2021-01-23 20:52:27','2021-01-23 20:52:27');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payments`
--

DROP TABLE IF EXISTS `Payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payments`
--

LOCK TABLES `Payments` WRITE;
/*!40000 ALTER TABLE `Payments` DISABLE KEYS */;
INSERT INTO `Payments` VALUES (1,'Efectivo','Consiste en pagar un bien o servicio con dinero físico, con un cheque bancario al portador o con algún otro medio físico similar.','2021-01-23 20:52:27','2021-01-23 20:52:27'),(2,'Tarjeta de débito','Con la tarjeta de débito el dinero sale de tu cuenta en el momento en que realizás el pago.','2021-01-23 20:52:27','2021-01-23 20:52:27'),(3,'Tarjeta de crédito','La tarjeta de crédito es un préstamo, por lo que podés gastar hoy y pagar al mes siguiente, o en cuotas a lo largo de varios meses.','2021-01-23 20:52:27','2021-01-23 20:52:27'),(4,'Mercado Pago','A través de Mercado Pago, tus clientes pueden pagar con tarjetas de crédito, con transferencia bancaria e incluso en efectivo.','2021-01-23 20:52:27','2021-01-23 20:52:27');
/*!40000 ALTER TABLE `Payments` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20210122184641-create-category.js'),('20210123144200-create-type.js'),('20210123192356-create-shop.js'),('20210125161046-create-product.js'),('20210126235407-create-payment.js'),('20210127235223-create-order.js'),('20210128142355-create-cart-item.js'),('20210128143229-create-shipping-method.js'),('20210202162625-create-user.js'),('20210202185247-create-comment.js'),('20210216231525-create-address.js'),('20210220234935-create-coupon.js'),('20210222181339-create-order-status.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShippingMethods`
--

DROP TABLE IF EXISTS `ShippingMethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShippingMethods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `amount` float(10,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShippingMethods`
--

LOCK TABLES `ShippingMethods` WRITE;
/*!40000 ALTER TABLE `ShippingMethods` DISABLE KEYS */;
INSERT INTO `ShippingMethods` VALUES (1,'Envío a domicilio',300.20,'Envio al domicilio dl cliente.','Dirección del cliente','2021-01-23 20:52:27','2021-01-23 20:52:27'),(2,'Arreglo con el vendedor',NULL,'Consiste entre en un arreglo privado entre la tienda y el consumidor final.','Domicilio del vendedor','2021-01-23 20:52:27','2021-01-23 20:52:27'),(3,'Retiro por el correo más cercano',450.00,'El cliente debe seleccionar un correo cercano para recibir su pedido. Cuando llegue el pedido al correo será notificado.','Correo','2021-01-23 20:52:27','2021-01-23 20:52:27');
/*!40000 ALTER TABLE `ShippingMethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shops`
--

DROP TABLE IF EXISTS `Shops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `ranking` float(10,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `sales` int(11) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shops`
--

LOCK TABLES `Shops` WRITE;
/*!40000 ALTER TABLE `Shops` DISABLE KEYS */;
INSERT INTO `Shops` VALUES (1,'Artis Kraken','+541126790610','info@artiskraken.com.ar','default-shop.jpg',10.00,'active',0,'Tienda administradora de sitio','https://www.facebook.com/','https://www.instagram.com/','https://www.twitter.com/','2021-01-23 20:52:27','2021-01-23 20:52:27');
/*!40000 ALTER TABLE `Shops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Types`
--

DROP TABLE IF EXISTS `Types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Types`
--

LOCK TABLES `Types` WRITE;
/*!40000 ALTER TABLE `Types` DISABLE KEYS */;
INSERT INTO `Types` VALUES (1,'Lager','Super fermentada',0,'2021-01-01 20:52:27','2021-01-01 20:52:27'),(2,'Ale','Menor fermentación',0,'2021-01-01 20:52:27','2021-01-01 20:52:27');
/*!40000 ALTER TABLE `Types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dni` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Artis Kraken','artis.kraken','+541126790610','admin@artiskraken.com.ar',NULL,'$2b$10$iVndD6XNtV89tpz.nRx6SuZna8My/PZMPbiXEO9mQ.HZoCmN92BSK','default-avatar.png',1,'active','seller','Usuario administrador de sitio','https://www.facebook.com/','https://www.instagram.com/','https://www.twitter.com/',1,'2021-01-23 20:52:27','2021-01-23 20:52:27'),(2,'Test User','test.user','+541126790610','user@artiskraken.com.ar',NULL,'$2b$10$iVndD6XNtV89tpz.nRx6SuZna8My/PZMPbiXEO9mQ.HZoCmN92BSK','avatar-1614032482844.jpg',0,'active','buyer','Usuario de prueba','https://www.facebook.com/','https://www.instagram.com/','https://www.twitter.com/',NULL,'2021-01-23 20:52:27','2021-02-22 22:21:22');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'artis_db'
--

--
-- Dumping routines for database 'artis_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-22 19:43:23
