INSERT INTO `defaultdb`.`roles` (`name`)
VALUES ('ADMIN');
INSERT INTO `defaultdb`.`roles` (`name`)
VALUES ('USER');

INSERT INTO `defaultdb`.`permissions` (`name`)
VALUES ('READ');
INSERT INTO `defaultdb`.`permissions` (`name`)
VALUES ('WRITE');
INSERT INTO `defaultdb`.`permissions` (`name`)
VALUES ('READ');

-- pwd: admin@123
INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `password`, `role`)
VALUES ('admin', 'admin123@gmail.com', '{bcrypt}$2a$12$rxH7HRYrFkM212zXqOf7EOAIIFu02ctrpPgVWogJjufdvBO4NKxoK', 'ADMIN');

-- pwd: user@123
INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `password`, `role`)
VALUES ('le van hau', 'user123@gmail.com', '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', 'USER');
        
INSERT INTO `defaultdb`.`category` (`id`, `name`) VALUES ('1', 'eyeglasses');
INSERT INTO `defaultdb`.`category` (`id`, `name`) VALUES ('2', 'sunglasses');
INSERT INTO `defaultdb`.`category` (`id`, `name`) VALUES ('3', 'eyeframes');

INSERT INTO `defaultdb`.`product` (`id`, `category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`) VALUES ('1', '1', 'EG01', 'Glasses 01', '200000', '10', 'this is thumnail', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product_inventory` (`id`, `product_id`, `stock_quantity`, `sold_quantity`) VALUES ('1', '1', '100', '50');
