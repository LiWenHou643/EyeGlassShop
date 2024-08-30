INSERT INTO `defaultdb`.`roles` (`name`)
VALUES ('ROLE_ADMIN');
INSERT INTO `defaultdb`.`roles` (`name`)
VALUES ('ROLE_USER');

-- pwd: admin@123
INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `password`, `role_id`, `created_at`, `created_by`)
VALUES ('admin', 'admin123@gmail.com', '{bcrypt}$2a$12$rxH7HRYrFkM212zXqOf7EOAIIFu02ctrpPgVWogJjufdvBO4NKxoK',
        '1', CURDATE(), 'admin');

-- pwd: user@123
INSERT INTO `defaultdb`.`person` (`full_name`, `email`, `password`, `role_id`, `created_at`, `created_by`)
VALUES ('le van hau', 'user123@gmail.com', '{bcrypt}$2a$12$WDeN1faM.smq94LVHZHnc.OyNmUe0nlGHEVgSYLFh6earRZal0F3y',
        '2', CURDATE(), 'anonymousUser');