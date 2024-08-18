INSERT INTO `EyeGlassShop`.`roles` (`name`) VALUES ('ADMIN');
INSERT INTO `EyeGlassShop`.`roles` (`name`) VALUES ('USER');

-- admin@123
INSERT INTO `EyeGlassShop`.`customer` (`fullname`, `email`, `password`, `role_id`, `created_at`, `created_by`) 
VALUES ('hau hong hach', 'quannhan6969@gmail.com', '$2a$12$rxH7HRYrFkM212zXqOf7EOAIIFu02ctrpPgVWogJjufdvBO4NKxoK', '1', CURDATE(), 'admin');

-- user@123
INSERT INTO `EyeGlassShop`.`customer` (`fullname`, `email`, `password`, `role_id`, `created_at`, `created_by`) 
VALUES ('hau dep trai', 'kenboy2244@gmail.com', '$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y', '2', CURDATE(), 'anonymousUser');
