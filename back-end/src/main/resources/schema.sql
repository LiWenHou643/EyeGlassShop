-- DROP SCHEMA IF EXISTS `defaultdb`;
-- CREATE SCHEMA `defaultdb`;
USE defaultdb;

CREATE TABLE `roles`
(
    `id`   bigint PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(20) UNIQUE NOT NULL
);

CREATE TABLE `person`
(
    `id`           bigint PRIMARY KEY AUTO_INCREMENT,
    `full_name`    varchar(50)  NOT NULL,
    `email`        varchar(150) NOT NULL,
    `phone_number` varchar(20),
    `address_id`   bigint,
    `image`        varchar(100),
    `password`     varchar(255) NOT NULL,
    `role_id`      bigint       NOT NULL,
    UNIQUE KEY `idx_email` (`email`),  -- Creates a unique index on the email column
    UNIQUE KEY `idx_phone_number` (`phone_number`)  -- Creates a unique index on the email column
);

CREATE TABLE `address` (
	`id` bigint PRIMARY KEY AUTO_INCREMENT,
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
    `id`            bigint PRIMARY KEY AUTO_INCREMENT,
    `refresh_token` varchar(512) NOT NULL,
    `revoked`       tinyint      NOT NULL,
    `person_id`     bigint       NOT NULL
);

CREATE TABLE `category`
(
    `id`   bigint PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(100) NOT NULL
);

CREATE TABLE `product`
(
    `id`             bigint PRIMARY KEY AUTO_INCREMENT,
    `category_id`    bigint              NOT NULL,
    `product_code`   varchar(255) UNIQUE NOT NULL,
    `title`          varchar(250)        NOT NULL,
    `price`          int                 NOT NULL,
    `discount`       int                 NOT NULL,
    `image`          varchar(500)        NOT NULL,
    `description`    longtext            NOT NULL,
    `stock_quantity` int                 NOT NULL DEFAULT 0,
    `sold_quantity`  int                 NOT NULL DEFAULT 0,
    `is_deleted`     boolean             NOT NULL DEFAULT FALSE
);

CREATE TABLE `color`
(
    `id`         bigint PRIMARY KEY AUTO_INCREMENT,
    `product_id` bigint      NOT NULL,
    `name`       varchar(50) NOT NULL,
    `hex`        VARCHAR(7)  NOT NULL
);

CREATE TABLE `cart`
(
    `id`        bigint PRIMARY KEY AUTO_INCREMENT,
    `person_id` bigint NOT NULL
);

CREATE TABLE `cart_item`
(
    `id`            bigint PRIMARY KEY AUTO_INCREMENT,
    `cart_id`       bigint NOT NULL,
    `product_id`    bigint NOT NULL,
    `quantity`      int    NOT NULL,
    `price_at_time` int    NOT NULL,
    `total_price`   long   NOT NULL,
    `created_at` 	datetime not null default current_timestamp,
    `updated_at` 	datetime not null default current_timestamp
);


CREATE TABLE `payment_details`
(
    `id`       bigint PRIMARY KEY AUTO_INCREMENT,
    `amount`   int NOT NULL,
    `provider` int NOT NULL,
    `status`   int NOT NULL
);

CREATE TABLE `orders`
(
    `id`         bigint PRIMARY KEY AUTO_INCREMENT,
    `person_id`  bigint    NOT NULL,
    `payment_id` bigint    NOT NULL,
    `total`      int       NOT NULL,
    `create_at`  timestamp NOT NULL
);

CREATE TABLE `order_detail`
(
    `id`         bigint PRIMARY KEY AUTO_INCREMENT,
    `order_id`   bigint NOT NULL,
    `product_id` bigint NOT NULL,
    `price`      int    NOT NULL,
    `quantity`   int    NOT NULL
);

CREATE TABLE `ratings`
(
    `id`           bigint PRIMARY KEY AUTO_INCREMENT,
    `product_id`   bigint NOT NULL,
    `person_id`    bigint NOT NULL,
    `rating_value` int    NOT NULL,
    `review_text`  text,
    `created_at`   timestamp default current_timestamp
);

CREATE TABLE `codes` (
	`id` bigint PRIMARY KEY AUTO_INCREMENT,
    `code` varchar(100) NOT NULL,
    `value` int NOT NULL,
    UNIQUE KEY `idx_code` (`code`)
);


ALTER TABLE `person`
    ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `person`
	ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

ALTER TABLE `refresh_tokens`
    ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

ALTER TABLE `orders`
    ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

ALTER TABLE `cart`
    ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

ALTER TABLE `product`
    ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `cart_item`
    ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `cart_item`
    ADD FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`);

ALTER TABLE `order_detail`
    ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `order_detail`
    ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `orders`
    ADD FOREIGN KEY (`payment_id`) REFERENCES `payment_details` (`id`);

ALTER TABLE `color`
    ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `ratings`
    ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `ratings`
    ADD FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);