INSERT INTO `defaultdb`.`roles` (`name`) VALUES ('ADMIN');
INSERT INTO `defaultdb`.`roles` (`name`) VALUES ('USER');

-- pwd: admin@123
INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `password`, `role`)
	VALUES ('admin', 'admin123@gmail.com', '{bcrypt}$2a$12$rxH7HRYrFkM212zXqOf7EOAIIFu02ctrpPgVWogJjufdvBO4NKxoK', 'ADMIN');

-- pwd: user@123
INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `password`, `role`)
	VALUES ('le van hau', 'user123@gmail.com', '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', 'USER');
        
INSERT INTO `defaultdb`.`category` (`id`, `name`) VALUES ('1', 'eyeglasses');
INSERT INTO `defaultdb`.`category` (`id`, `name`) VALUES ('2', 'sunglasses');
INSERT INTO `defaultdb`.`category` (`id`, `name`) VALUES ('3', 'eyelens');

INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG01', 'Eye Glasses 01', '599000', '0', '/data-image/eg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG02', 'Eye Glasses 02', '350000', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG03', 'Eye Glasses 03', '299000', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG04', 'Eye Glasses 04', '180000', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG05', 'Eye Glasses 05', '290000', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG06', 'Eye Glasses 06', '230000', '10', '/data-image/eg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG07', 'Eye Glasses 07', '470000', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG08', 'Eye Glasses 08', '830000', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG09', 'Eye Glasses 09', '620000', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG10', 'Eye Glasses 10', '450000', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes');
    
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG01', 'Sun Glasses 01', '430000', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG02', 'Sun Glasses 02', '670000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG03', 'Sun Glasses 03', '550000', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG04', 'Sun Glasses 04', '260000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG05', 'Sun Glasses 05', '280000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG06', 'Sun Glasses 06', '240000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG07', 'Sun Glasses 07', '190000', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG08', 'Sun Glasses 08', '460000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG09', 'Sun Glasses 09', '320000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG10', 'Sun Glasses 10', '290000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes');
    
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('3', 'EL01', 'Eye Lens 01', '400000', '0', '/data-image/el-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('3', 'EL02', 'Eye Lens 02', '500000', '10', '/data-image/el-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('3', 'EL03', 'Eye Lens 03', '600000', '20', '/data-image/el-03.jpg', 'good glasses for protect eyes');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('21', 'white', '#ffffff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('21', 'black', '#000000');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('21', 'gray', '#8a8a8a');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('21', 'orange', '#ffa600');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('21', 'blue', '#0097ff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('21', 'green', '#00bd20');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('22', 'white', '#ffffff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('22', 'black', '#000000');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('22', 'gray', '#8a8a8a');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('22', 'orange', '#ffa600');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('22', 'blue', '#0097ff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('22', 'green', '#00bd20');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('23', 'white', '#ffffff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('23', 'black', '#000000');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('23', 'gray', '#8a8a8a');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('23', 'orange', '#ffa600');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('23', 'blue', '#0097ff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('23', 'green', '#00bd20');

INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('1', '100', '3200');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('2', '300', '1390');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('3', '200', '7500');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('4', '400', '5670');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('5', '1000', '3000');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('6', '1000', '5000');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('7', '300', '7850');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('8', '500', '950');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('9', '700', '7200');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('10', '300', '5500');

INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('11', '100', '6590');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('12', '200', '7508');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('13', '300', '6580');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('14', '300', '4530');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('15', '200', '2350');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('16', '100', '4550');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('17', '200', '12650');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('18', '300', '7350');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('19', '200', '5150');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('20', '100', '2350');

INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('21', '100', '32340');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('22', '100', '10250');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('23', '100', '1050');

