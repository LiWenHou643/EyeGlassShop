-- DROP SCHEMA IF EXISTS `defaultdb`;
-- CREATE SCHEMA `defaultdb`;
USE defaultdb;
SET time_zone = 'Asia/Bangkok';

CREATE TABLE `roles`
(
    `id`   INT PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(20) UNIQUE NOT NULL
);

CREATE TABLE `person`
(
    `id`           INT PRIMARY KEY AUTO_INCREMENT,
    `full_name`    varchar(50)  NOT NULL,
    `email`        varchar(150) NOT NULL,
    `phone_number` varchar(20),
    `address_id`   INT,
    `image`        varchar(100),
    `password`     varchar(255) NOT NULL,
    `role_id`      INT       NOT NULL,
    UNIQUE KEY `idx_email` (`email`),  -- Creates a unique index on the email column
    UNIQUE KEY `idx_phone_number` (`phone_number`)  -- Creates a unique index on the email column
);

CREATE TABLE `address` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `street_address` varchar(50) not null,
    `ward` varchar(50) not null,
    `district` varchar(50) not null,
    `city` varchar(50) not null
);

CREATE TABLE `invalidated_tokens`
(
    `token`      varchar(512) PRIMARY KEY,
    `expiration` timestamp
);

CREATE TABLE `refresh_tokens`
(
    `id`            INT PRIMARY KEY AUTO_INCREMENT,
    `refresh_token` varchar(512) NOT NULL,
    `revoked`       tinyint      NOT NULL,
    `person_id`     INT       NOT NULL
);

CREATE TABLE `category`
(
    `id`   INT PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(100) NOT NULL
);

CREATE TABLE `product`
(
    `id`             INT PRIMARY KEY AUTO_INCREMENT,
    `category_id`    INT              NOT NULL,
    `product_code`   varchar(255) UNIQUE NOT NULL,
    `title`          varchar(250)        NOT NULL,
    `price`          DECIMAL(10, 2)      NOT NULL,
    `discount_percentage` DECIMAL(5, 2) DEFAULT 0,
    `image`          varchar(500)        NOT NULL,
    `description`    longtext            NOT NULL,
    `stock_quantity` int                 NOT NULL DEFAULT 50,
    `sold_quantity`  int                 NOT NULL DEFAULT 0,
    `is_deleted`     boolean             NOT NULL DEFAULT FALSE,
    UNIQUE KEY `idx_product_code` (`product_code`)
);

CREATE TABLE `color`
(
    `id`         INT PRIMARY KEY AUTO_INCREMENT,
    `product_id` INT      NOT NULL,
    `name`       varchar(50) NOT NULL,
    `hex`        VARCHAR(7)  NOT NULL
);

CREATE TABLE `cart`
(
    `id`        INT PRIMARY KEY AUTO_INCREMENT,
    `person_id` INT NOT NULL
);

CREATE TABLE `cart_item`(
    `id`            INT PRIMARY KEY AUTO_INCREMENT,
    `cart_id`       INT NOT NULL,
    `product_id`    INT NOT NULL,
    `quantity` 		TINYINT NOT NULL CHECK (`quantity` > 0),
    `price` DECIMAL(10, 2)   NOT NULL,
    `discount_percentage` DECIMAL(5, 2) DEFAULT 0,  -- Discount percentage (0 to 100)
    `discounted_price` DECIMAL(10, 2) AS (`price` * (1 - `discount_percentage` / 100)) STORED,
    `total_price` DECIMAL(12, 2) AS (`discounted_price` * `quantity`) STORED,
    `created_at` 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `orders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `person_id` INT NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED', 'FINISHED') NOT NULL,  -- Updated status options
    `sub_total` DECIMAL(10, 2) NOT NULL,
    `discount_percentage` DECIMAL(5,2) DEFAULT 0.00,
    `ship_cost` DECIMAL(5,2) DEFAULT 0.00,
    `total` DECIMAL(10, 2) AS (`sub_total` * (1 - `discount_percentage` / 100) + `ship_cost`) STORED,
    `promo_code` VARCHAR(50),  -- Applied promotion code
    `shipping_address` VARCHAR(255) NOT NULL,
    `notes` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_person_id` (`person_id`),
    INDEX `idx_status` (`status`),
    FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON DELETE CASCADE  -- Reference to users table
);

CREATE TABLE `order_status_history` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'FINISHED', 'CANCELLED') NOT NULL,
    `datetime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`),
    INDEX `idx_status` (`status`),
    INDEX `idx_datetime` (`datetime`)
);


CREATE TABLE `payments` (
	`id` INT AUTO_INCREMENT PRIMARY KEY,
	`order_id` INT NOT NULL,
    `status` ENUM('PAID', 'UNPAID', 'REFUNDED') NOT NULL,
    `amount`   DECIMAL(10, 2) NOT NULL,
    `payment_method` ENUM('PAYPAL', 'CASH_ON_DELIVERY') NOT NULL,  -- Updated payment options
    `transaction_id` VARCHAR(100) UNIQUE DEFAULT NULL,  -- Unique transaddressaction ID for payment tracking
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
); 

CREATE TABLE `order_item` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,              -- Foreign key to orders table
    `product_id` INT NOT NULL,            -- Foreign key to products table
    `quantity` TINYINT NOT NULL CHECK (`quantity` > 0),
    `price` DECIMAL(10, 2) NOT NULL,         -- Price per item
    `discount_percentage` DECIMAL(5, 2) DEFAULT 0,  -- Discount percentage (0 to 100)
    `discounted_price` DECIMAL(10, 2) AS (`price` * (1 - `discount_percentage` / 100)) STORED,
    `total_price` DECIMAL(12, 2) AS (`discounted_price` * `quantity`) STORED, -- Calculated total after discount
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE
);

CREATE TABLE `ratings`(
    `id`           INT PRIMARY KEY AUTO_INCREMENT,
    `product_id`   INT NOT NULL,
    `person_id`    INT NOT NULL,
    `rating_value` int    NOT NULL,
    `review_text`  text,
    `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `codes` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `code` varchar(100) NOT NULL,
    `value` int NOT NULL,
    UNIQUE KEY `idx_code` (`code`)
);


ALTER TABLE `person`
    ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
	ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

ALTER TABLE `refresh_tokens`
    ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

ALTER TABLE `product`
    ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
    
ALTER TABLE `cart`
    ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

ALTER TABLE `cart_item`
    ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
    ADD FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`);

ALTER TABLE `color`
    ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `ratings`
    ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
    ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);
    
