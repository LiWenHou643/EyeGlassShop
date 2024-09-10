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
	VALUES ('1', 'EG11', 'Eye Glasses 11', '389000', '0', '/data-image/eg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG12', 'Eye Glasses 12', '640000', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG13', 'Eye Glasses 13', '889000', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG14', 'Eye Glasses 14', '770000', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG15', 'Eye Glasses 15', '660000', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG16', 'Eye Glasses 16', '550000', '10', '/data-image/eg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG17', 'Eye Glasses 17', '440000', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG18', 'Eye Glasses 18', '330000', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG19', 'Eye Glasses 19', '220000', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG20', 'Eye Glasses 20', '730000', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG21', 'Eye Glasses 21', '829000', '0', '/data-image/eg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG22', 'Eye Glasses 22', '740000', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG23', 'Eye Glasses 23', '649000', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG24', 'Eye Glasses 24', '490000', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG25', 'Eye Glasses 25', '470000', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG26', 'Eye Glasses 26', '690000', '10', '/data-image/eg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG27', 'Eye Glasses 27', '590000', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG28', 'Eye Glasses 28', '390000', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG29', 'Eye Glasses 29', '380000', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG30', 'Eye Glasses 30', '470000', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG31', 'Eye Glasses 31', '819000', '0', '/data-image/eg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG32', 'Eye Glasses 32', '610000', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG33', 'Eye Glasses 33', '619000', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG34', 'Eye Glasses 34', '710000', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG35', 'Eye Glasses 35', '810000', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG36', 'Eye Glasses 36', '910000', '10', '/data-image/eg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG37', 'Eye Glasses 37', '960000', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG38', 'Eye Glasses 38', '460000', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG39', 'Eye Glasses 39', '750000', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG40', 'Eye Glasses 40', '880000', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG41', 'Eye Glasses 41', '559000', '0', '/data-image/eg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG42', 'Eye Glasses 42', '617000', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG43', 'Eye Glasses 43', '618000', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG44', 'Eye Glasses 44', '718000', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG45', 'Eye Glasses 45', '818000', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG46', 'Eye Glasses 46', '918000', '10', '/data-image/eg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG47', 'Eye Glasses 47', '968000', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG48', 'Eye Glasses 48', '468000', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG49', 'Eye Glasses 49', '758000', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG50', 'Eye Glasses 50', '888000', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG51', 'Eye Glasses 51', '819000', '0', '/data-image/eg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG52', 'Eye Glasses 52', '619000', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG53', 'Eye Glasses 53', '619000', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG54', 'Eye Glasses 54', '719000', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG55', 'Eye Glasses 55', '819000', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG56', 'Eye Glasses 56', '919000', '10', '/data-image/eg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG57', 'Eye Glasses 57', '969000', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG58', 'Eye Glasses 58', '469000', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG59', 'Eye Glasses 59', '759000', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('1', 'EG60', 'Eye Glasses 60', '889000', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes');
    
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
	VALUES ('2', 'SG11', 'Sun Glasses 11', '940000', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG12', 'Sun Glasses 12', '650000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG13', 'Sun Glasses 13', '530000', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG14', 'Sun Glasses 14', '540000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG15', 'Sun Glasses 15', '440000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG16', 'Sun Glasses 16', '880000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG17', 'Sun Glasses 17', '770000', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG18', 'Sun Glasses 18', '640000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG19', 'Sun Glasses 19', '240000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG20', 'Sun Glasses 20', '540000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG21', 'Sun Glasses 21', '230000', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG22', 'Sun Glasses 22', '540000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG23', 'Sun Glasses 23', '240000', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG24', 'Sun Glasses 24', '650000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG25', 'Sun Glasses 25', '350000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG26', 'Sun Glasses 26', '530000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG27', 'Sun Glasses 27', '350000', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG28', 'Sun Glasses 28', '550000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG29', 'Sun Glasses 29', '720000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG30', 'Sun Glasses 30', '390000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG31', 'Sun Glasses 31', '330000', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG32', 'Sun Glasses 32', '340000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG33', 'Sun Glasses 33', '340000', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG34', 'Sun Glasses 34', '350000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG35', 'Sun Glasses 35', '550000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG36', 'Sun Glasses 36', '330000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG37', 'Sun Glasses 37', '450000', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG38', 'Sun Glasses 38', '450000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG39', 'Sun Glasses 39', '420000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG40', 'Sun Glasses 40', '490000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG41', 'Sun Glasses 41', '730000', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG42', 'Sun Glasses 42', '740000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG43', 'Sun Glasses 43', '740000', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG44', 'Sun Glasses 44', '750000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG45', 'Sun Glasses 45', '750000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG46', 'Sun Glasses 46', '730000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG47', 'Sun Glasses 47', '750000', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG48', 'Sun Glasses 48', '750000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG49', 'Sun Glasses 49', '720000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG50', 'Sun Glasses 50', '790000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG51', 'Sun Glasses 51', '830000', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG52', 'Sun Glasses 52', '840000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG53', 'Sun Glasses 53', '840000', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG54', 'Sun Glasses 54', '850000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG55', 'Sun Glasses 55', '810000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG56', 'Sun Glasses 56', '830000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG57', 'Sun Glasses 57', '310000', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG58', 'Sun Glasses 58', '510000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG59', 'Sun Glasses 59', '710000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('2', 'SG60', 'Sun Glasses 60', '510000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes');
    
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('3', 'EL01', 'Eye Lens 01', '400000', '0', '/data-image/el-01.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('3', 'EL02', 'Eye Lens 02', '500000', '10', '/data-image/el-02.jpg', 'good glasses for protect eyes');
INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `thumbnail`, `description`)
	VALUES ('3', 'EL03', 'Eye Lens 03', '600000', '20', '/data-image/el-03.jpg', 'good glasses for protect eyes');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('121', 'white', '#ffffff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('121', 'black', '#000000');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('121', 'gray', '#8a8a8a');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('121', 'orange', '#ffa600');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('121', 'blue', '#0097ff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('121', 'green', '#00bd20');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('122', 'white', '#ffffff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('122', 'black', '#000000');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('122', 'gray', '#8a8a8a');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('122', 'orange', '#ffa600');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('122', 'blue', '#0097ff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('122', 'green', '#00bd20');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('123', 'white', '#ffffff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('123', 'black', '#000000');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('123', 'gray', '#8a8a8a');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('123', 'orange', '#ffa600');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('123', 'blue', '#0097ff');
INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`) VALUES ('123', 'green', '#00bd20');

INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('1', '100', '3200');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('2', '300', '1390');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('3', '200', '7500');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('4', '400', '5670');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('5', '1000', '3000');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('6', '1000', '5000');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('7', '300', '7850');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('8', '500', '950');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('9', '700', '7200');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('10', '300', '7500');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('11', '100', '5590');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('12', '200', '4508');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('13', '300', '5580');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('14', '300', '7530');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('15', '200', '34550');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('16', '100', '8650');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('17', '200', '44650');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('18', '300', '7750');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('19', '200', '2250');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('20', '100', '5450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('21', '100', '9290');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('22', '200', '4208');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('23', '300', '2980');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('24', '300', '9230');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('25', '200', '8450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('26', '100', '9450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('27', '200', '28650');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('28', '300', '8350');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('29', '200', '2450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('30', '100', '5450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('31', '100', '95294');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('32', '200', '45204');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('33', '300', '25984');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('34', '300', '95234');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('35', '200', '85450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('36', '100', '95450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('37', '200', '258650');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('38', '300', '85350');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('39', '200', '25450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('40', '100', '55450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('41', '100', '95290');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('42', '200', '45208');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('43', '300', '25980');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('44', '300', '95230');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('45', '200', '85450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('46', '100', '95450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('47', '200', '258650');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('48', '300', '85350');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('49', '200', '25450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('50', '100', '55450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('51', '100', '93290');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('52', '200', '45208');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('53', '300', '25980');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('54', '300', '93230');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('55', '200', '83450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('56', '100', '93450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('57', '200', '283650');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('58', '300', '83350');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('59', '200', '24350');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('60', '100', '54350');

INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('61', '100', '42316');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('62', '300', '33946');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('63', '200', '55006');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('64', '400', '66706');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('65', '1000', '34262');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('66', '1000', '25763');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('67', '300', '28506');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('68', '500', '35506');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('69', '700', '22006');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('70', '300', '25009');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('71', '100', '35909');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('72', '200', '55089');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('73', '300', '45809');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('74', '300', '25309');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('75', '200', '545590');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('76', '100', '36509');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('77', '200', '746590');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('78', '300', '37509');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('79', '200', '62504');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('80', '100', '34504');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('81', '100', '62904');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('82', '200', '32084');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('83', '300', '59804');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('84', '300', '52304');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('85', '200', '54504');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('86', '100', '44502');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('87', '200', '386520');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('88', '300', '63502');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('89', '200', '44502');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('90', '100', '64502');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('91', '100', '62902');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('92', '200', '32082');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('93', '300', '59802');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('94', '300', '52302');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('95', '200', '54502');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('96', '100', '44502');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('97', '200', '386502');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('98', '300', '63503');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('99', '200', '44503');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('100', '100', '64503');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('101', '100', '62903');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('102', '200', '32083');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('103', '300', '59803');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('104', '300', '52303');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('105', '200', '54503');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('106', '100', '44504');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('107', '200', '386504');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('108', '300', '63504');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('109', '200', '44505');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('110', '100', '64505');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('111', '100', '62905');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('112', '200', '32085');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('113', '300', '59805');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('114', '300', '52350');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('115', '200', '54550');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('116', '100', '45450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('117', '200', '358650');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('118', '300', '65350');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('119', '200', '45450');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('120', '100', '65450');

INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('121', '100', '32340');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('122', '100', '10250');
INSERT INTO `defaultdb`.`product_inventory` (`product_id`, `stock_quantity`, `sold_quantity`) VALUES ('123', '100', '1050');

