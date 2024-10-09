INSERT INTO `defaultdb`.`roles` (`name`)
VALUES ('ADMIN'),
       ('USER');

-- pwd: admin@123
INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `password`, `role_id`)
VALUES ('admin', 'admin123@gmail.com', '{bcrypt}$2a$12$rxH7HRYrFkM212zXqOf7EOAIIFu02ctrpPgVWogJjufdvBO4NKxoK', '1');

INSERT INTO `defaultdb`.`address` (`street_address`, `ward`, `district`, `city`)
VALUES ('1 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('2 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('3 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('4 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('5 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('6 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('7 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('8 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('9 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('10 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('11 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('12 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('13 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('14 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('15 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('16 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('17 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('18 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('19 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('20 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('21 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('22 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('23 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('24 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('25 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('26 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('27 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('28 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('29 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('30 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('31 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('32 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('33 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('34 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('35 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('36 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('37 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('38 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('39 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('40 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('41 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('42 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('43 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('44 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('45 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('46 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('47 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('48 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('49 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ'),
       ('50 Mau Than', 'Phường An Nghiệp', 'Quận Ninh Kiều', 'Thành phố Cần Thơ');

-- pwd: user@123
INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `phone_number`, `address_id`, `image`, `password`, `role_id`)
VALUES ('le van hau', 'user001@gmail.com', '0939000001', '1', 'cat.jpg',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2');

INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `phone_number`, `address_id`, `password`, `role_id`)
VALUES ('thien de', 'user002@gmail.com', '0939000002', '2',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('duy nga doc ton', 'user003@gmail.com', '0939000003', '3',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('de bat kiem tien', 'user004@gmail.com', '0939000004', '4',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('luc duong', 'user005@gmail.com', '0939000005', '5',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('van chi', 'user006@gmail.com', '0939000006', '6',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('manh canh chu', 'user007@gmail.com', '0939000007', '7',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('duong khai', 'user008@gmail.com', '0939000008', '8',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('tu tieu thu', 'user009@gmail.com', '0939000009', '9',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('han lap', 'user010@gmail.com', '0939000010', '10',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('le phi vu', 'user011@gmail.com', '0939000011', '11',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('tran binh an', 'user012@gmail.com', '0939000012', '12',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('lam vinh da', 'user013@gmail.com', '0939000013', '13',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('muc tran', 'user014@gmail.com', '0939000014', '14',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('tieu viem', 'user015@gmail.com', '0939000015', '15',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('hao thien de', 'user016@gmail.com', '0939000016', '16',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('ly that da', 'user017@gmail.com', '0939000017', '17',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('de ba', 'user018@gmail.com', '0939000018', '18',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('hoang thien de', 'user019@gmail.com', '0939000019', '19',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('thach hao', 'user020@gmail.com', '0939000020', '20',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('ton ngo khong', 'user021@gmail.com', '0939000021', '21',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('duong tang', 'user022@gmail.com', '0939000022', '22',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('tru bat gioi', 'user023@gmail.com', '0939000023', '23',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('sa ngo tinh', 'user024@gmail.com', '0939000024', '24',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('bach long ma', 'user025@gmail.com', '0939000025', '25',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('nu oa', 'user026@gmail.com', '0939000026', '26',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('hau tho', 'user027@gmail.com', '0939000027', '27',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('duong tien', 'user028@gmail.com', '0939000028', '28',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('hang nga', 'user029@gmail.com', '0939000029', '29',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('dai vu', 'user030@gmail.com', '0939000030', '30',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('vu chinh', 'user031@gmail.com', '0939000031', '31',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('thai at', 'user032@gmail.com', '0939000032', '32',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('luc ap', 'user033@gmail.com', '0939000033', '33',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('thai thanh', 'user034@gmail.com', '0939000034', '34',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('thong thien', 'user035@gmail.com', '0939000035', '35',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('tran pham', 'user036@gmail.com', '0939000036', '36',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('ly mo uyen', 'user037@gmail.com', '0939000037', '37',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('vuong lam', 'user038@gmail.com', '0939000038', '38',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('long ngao thien', 'user039@gmail.com', '0939000039', '39',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),
       ('duong tam', 'user040@gmail.com', '0939000040', '40',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('mac pham', 'user041@gmail.com', '0939000041', '41',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('ly chau', 'user042@gmail.com', '0939000042', '42',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('la chinh', 'user043@gmail.com', '0939000043', '43',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('la thien', 'user044@gmail.com', '0939000044', '44',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('tieu ly', 'user045@gmail.com', '0939000045', '45',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('hao nhien', 'user046@gmail.com', '0939000046', '46',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('bach da', 'user047@gmail.com', '0939000047', '47',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('cam diem', 'user048@gmail.com', '0939000048', '48',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('diep tieu kim', 'user049@gmail.com', '0939000049', '49',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2'),

       ('thai than', 'user050@gmail.com', '0939000050', '50',
        '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2');

INSERT INTO `defaultdb`.`category` (`id`, `name`)
VALUES ('1', 'eyeglasses'),
       ('2', 'sunglasses'),
       ('3', 'eyelens');

INSERT INTO `defaultdb`.`product` (`category_id`, `product_code`, `title`, `price`, `discount`, `image`, `description`, `stock_quantity`)
VALUES ('1', 'EG01', 'Eye Glasses 01', '599000', '50', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '0'),

       ('1', 'EG02', 'Eye Glasses 02', '350000', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG03', 'Eye Glasses 03', '299000', '40', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG04', 'Eye Glasses 04', '180000', '20', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '0'),

       ('1', 'EG05', 'Eye Glasses 05', '290000', '3', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG06', 'Eye Glasses 06', '230000', '0', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG07', 'Eye Glasses 07', '470000', '70', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG08', 'Eye Glasses 08', '830000', '20', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG09', 'Eye Glasses 09', '620000', '30', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG10', 'Eye Glasses 10', '450000', '5', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG11', 'Eye Glasses 11', '389000', '20', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG12', 'Eye Glasses 12', '640000', '60', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG13', 'Eye Glasses 13', '889000', '25', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG14', 'Eye Glasses 14', '770000', '35', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG15', 'Eye Glasses 15', '660000', '30', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG16', 'Eye Glasses 16', '550000', '0', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG17', 'Eye Glasses 17', '440000', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG18', 'Eye Glasses 18', '330000', '0', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG19', 'Eye Glasses 19', '220000', '40', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG20', 'Eye Glasses 20', '730000', '40', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG21', 'Eye Glasses 21', '829000', '50', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG22', 'Eye Glasses 22', '740000', '30', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG23', 'Eye Glasses 23', '649000', '30', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG24', 'Eye Glasses 24', '490000', '40', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG25', 'Eye Glasses 25', '470000', '70', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG26', 'Eye Glasses 26', '690000', '60', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG27', 'Eye Glasses 27', '590000', '40', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG28', 'Eye Glasses 28', '390000', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG29', 'Eye Glasses 29', '380000', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG30', 'Eye Glasses 30', '470000', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG31', 'Eye Glasses 31', '819000', '0', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG32', 'Eye Glasses 32', '610000', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG33', 'Eye Glasses 33', '619000', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG34', 'Eye Glasses 34', '710000', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG35', 'Eye Glasses 35', '810000', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG36', 'Eye Glasses 36', '910000', '10', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG37', 'Eye Glasses 37', '960000', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG38', 'Eye Glasses 38', '460000', '70', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG39', 'Eye Glasses 39', '750000', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG40', 'Eye Glasses 40', '880000', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG41', 'Eye Glasses 41', '559000', '0', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG42', 'Eye Glasses 42', '617000', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG43', 'Eye Glasses 43', '618000', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG44', 'Eye Glasses 44', '718000', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG45', 'Eye Glasses 45', '818000', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG46', 'Eye Glasses 46', '918000', '60', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG47', 'Eye Glasses 47', '968000', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG48', 'Eye Glasses 48', '468000', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG49', 'Eye Glasses 49', '758000', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG50', 'Eye Glasses 50', '888000', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG51', 'Eye Glasses 51', '819000', '50', '/data-image/eg-01.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG52', 'Eye Glasses 52', '619000', '10', '/data-image/eg-02.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG53', 'Eye Glasses 53', '619000', '20', '/data-image/eg-03.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG54', 'Eye Glasses 54', '719000', '30', '/data-image/eg-04.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG55', 'Eye Glasses 55', '819000', '0', '/data-image/eg-05.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG56', 'Eye Glasses 56', '919000', '10', '/data-image/eg-06.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG57', 'Eye Glasses 57', '969000', '20', '/data-image/eg-07.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG58', 'Eye Glasses 58', '469000', '30', '/data-image/eg-08.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG59', 'Eye Glasses 59', '759000', '0', '/data-image/eg-09.jpg', 'good glasses for protect eyes', '50'),

       ('1', 'EG60', 'Eye Glasses 60', '889000', '10', '/data-image/eg-10.jpg', 'good glasses for protect eyes', '50'),


       ('2', 'SG01', 'Sun Glasses 01', '430000', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG02', 'Sun Glasses 02', '670000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG03', 'Sun Glasses 03', '550000', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG04', 'Sun Glasses 04', '260000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG05', 'Sun Glasses 05', '280000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG06', 'Sun Glasses 06', '240000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG07', 'Sun Glasses 07', '190000', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG08', 'Sun Glasses 08', '460000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG09', 'Sun Glasses 09', '320000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG10', 'Sun Glasses 10', '290000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG11', 'Sun Glasses 11', '940000', '70', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG12', 'Sun Glasses 12', '650000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG13', 'Sun Glasses 13', '530000', '80', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG14', 'Sun Glasses 14', '540000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG15', 'Sun Glasses 15', '440000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG16', 'Sun Glasses 16', '880000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG17', 'Sun Glasses 17', '770000', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG18', 'Sun Glasses 18', '640000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG19', 'Sun Glasses 19', '240000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG20', 'Sun Glasses 20', '540000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG21', 'Sun Glasses 21', '230000', '60', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG22', 'Sun Glasses 22', '540000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG23', 'Sun Glasses 23', '240000', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG24', 'Sun Glasses 24', '650000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG25', 'Sun Glasses 25', '350000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG26', 'Sun Glasses 26', '530000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG27', 'Sun Glasses 27', '350000', '60', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG28', 'Sun Glasses 28', '550000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG29', 'Sun Glasses 29', '720000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG30', 'Sun Glasses 30', '390000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG31', 'Sun Glasses 31', '330000', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG32', 'Sun Glasses 32', '340000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG33', 'Sun Glasses 33', '340000', '70', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG34', 'Sun Glasses 34', '350000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG35', 'Sun Glasses 35', '550000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG36', 'Sun Glasses 36', '330000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG37', 'Sun Glasses 37', '450000', '80', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG38', 'Sun Glasses 38', '450000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG39', 'Sun Glasses 39', '420000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG40', 'Sun Glasses 40', '490000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG41', 'Sun Glasses 41', '730000', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG42', 'Sun Glasses 42', '740000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG43', 'Sun Glasses 43', '740000', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG44', 'Sun Glasses 44', '750000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG45', 'Sun Glasses 45', '750000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG46', 'Sun Glasses 46', '730000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG47', 'Sun Glasses 47', '750000', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG48', 'Sun Glasses 48', '750000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG49', 'Sun Glasses 49', '720000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG50', 'Sun Glasses 50', '790000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG51', 'Sun Glasses 51', '830000', '0', '/data-image/sg-01.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG52', 'Sun Glasses 52', '840000', '10', '/data-image/sg-02.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG53', 'Sun Glasses 53', '840000', '20', '/data-image/sg-03.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG54', 'Sun Glasses 54', '850000', '30', '/data-image/sg-04.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG55', 'Sun Glasses 55', '810000', '0', '/data-image/sg-05.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG56', 'Sun Glasses 56', '830000', '10', '/data-image/sg-06.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG57', 'Sun Glasses 57', '310000', '20', '/data-image/sg-07.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG58', 'Sun Glasses 58', '510000', '30', '/data-image/sg-08.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG59', 'Sun Glasses 59', '710000', '0', '/data-image/sg-09.jpg', 'good glasses for protect eyes', '50'),

       ('2', 'SG60', 'Sun Glasses 60', '510000', '10', '/data-image/sg-10.jpg', 'good glasses for protect eyes', '50'),


       ('3', 'EL01', 'Eye Lens 01', '400000', '0', '/data-image/el-01.jpg', 'good glasses for protect eyes', '50'),

       ('3', 'EL02', 'Eye Lens 02', '500000', '10', '/data-image/el-02.jpg', 'good glasses for protect eyes', '50'),

       ('3', 'EL03', 'Eye Lens 03', '600000', '20', '/data-image/el-03.jpg', 'good glasses for protect eyes', '50');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`)
VALUES ('121', 'white', '#ffffff'),
       ('121', 'black', '#000000'),
       ('121', 'gray', '#8a8a8a'),
       ('121', 'orange', '#ffa600'),
       ('121', 'blue', '#0097ff'),
       ('121', 'green', '#00bd20');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`)
VALUES ('122', 'white', '#ffffff'),
       ('122', 'black', '#000000'),
       ('122', 'gray', '#8a8a8a'),
       ('122', 'orange', '#ffa600'),
       ('122', 'blue', '#0097ff'),
       ('122', 'green', '#00bd20');

INSERT INTO `defaultdb`.`color` (`product_id`, `name`, `hex`)
VALUES ('123', 'white', '#ffffff'),
       ('123', 'black', '#000000'),
       ('123', 'gray', '#8a8a8a'),
       ('123', 'orange', '#ffa600'),
       ('123', 'blue', '#0097ff'),
       ('123', 'green', '#00bd20');

INSERT INTO `defaultdb`.`cart` (`id`, `person_id`)
VALUES ('1', '2'),
       ('2', '3');

INSERT INTO `defaultdb`.`cart_item` (`id`, `cart_id`, `product_id`, `quantity`, `price_at_time`, `total_price`)
VALUES ('1', '1', '6', '3', '230000', '690000'),
       ('2', '1', '8', '3', '664000', '1992000'),
       ('3', '1', '15', '2', '660000', '924000');

INSERT INTO `defaultdb`.`codes` (`id`, `code`, `value`)
VALUES ('1', 'vip10', '10'),
       ('2', 'vip20', '20'),
       ('3', 'vip30', '30');
