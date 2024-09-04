-- DROP SCHEMA IF EXISTS `defaultdb`;
-- CREATE SCHEMA `defaultdb`;
USE defaultdb;

CREATE TABLE `roles` (
  `name` varchar(20) PRIMARY KEY
);

CREATE TABLE `person` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_number` varchar(20),
  `address` varchar(200),
  `password` varchar(200) NOT NULL,
  `role` varchar(20) NOT NULL
);

CREATE TABLE `refresh_tokens` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `refresh_token` varchar(512) NOT NULL,
  `revoked` tinyint NOT NULL,
  `person_id` int NOT NULL
);

CREATE TABLE `category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL
);

CREATE TABLE `product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `product_code` VARCHAR(255) UNIQUE NOT NULL,
  `title` varchar(250) NOT NULL,
  `price` int NOT NULL,
  `discount` int NOT NULL,
  `thumbnail` varchar(500) NOT NULL,
  `description` longtext NOT NULL,
  `is_deleted` boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE `galery` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `thumbnail` varchar(500) NOT NULL
);

CREATE TABLE `cart` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `person_id` int NOT NULL,
  `total` int NOT NULL
);

CREATE TABLE `cart_item` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantiy` int NOT NULL
);

CREATE TABLE `payment_details` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `amount` int NOT NULL,
  `provider` int NOT NULL,
  `status` int NOT NULL
);

CREATE TABLE `orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `person_id` int NOT NULL,
  `payment_id` int NOT NULL,
  `total` int NOT NULL,
  `create_at` timestamp NOT NULL
);

CREATE TABLE `order_detail` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `price` int NOT NULL,
  `quantity` int NOT NULL
);

CREATE TABLE `product_inventory` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT 0,
  `sold_quantity` int NOT NULL DEFAULT 0
);


ALTER TABLE `person` ADD FOREIGN KEY (`role`) REFERENCES `roles` (`name`);

ALTER TABLE `refresh_tokens` ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

ALTER TABLE `galery` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `cart_item` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `cart_item` ADD FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`);

ALTER TABLE `order_detail` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `order_detail` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`payment_id`) REFERENCES `payment_details` (`id`);

ALTER TABLE `product_inventory` ADD FOREIGN KEY (`product_id`) REFERENCES `product`(`id`);
