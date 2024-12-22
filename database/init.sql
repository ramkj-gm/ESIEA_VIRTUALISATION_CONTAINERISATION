CREATE DATABASE IF NOT EXISTS project;
USE project;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `pwd` varchar(30) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`first_name`, `last_name`, `username`, `pwd`, `deleted`) 
VALUES ('Karam', 'JABBOUR', 'rmk_jbr', '123456', 0);
COMMIT;

USE project;
CREATE TABLE `products` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `has_available_quantity` tinyint(1) NOT NULL,
  `quantity` int(11) NOT NULL,
  `available_quanity` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`name`, `description`, `price`, `has_available_quantity`, `quantity`, `available_quanity`, `image_path`, `deleted`) VALUES
('Machine à pop-corn', 'Voilà une magnifique machine à pop-corn en excellent état. Idéal pour les anniversaire ou les cinémas en plein air.', 26, 1, 4, 3, '/uploads/image_article_662eb53062890_machine_a_popcorn.png', 1),
('Machine à barbe à papa', 'Machine en très bon état qui sublimera le palais de vos convive avec la sucrerie de leur enfance.', 32, 0, 2, 0, '/uploads/image_article_662eb8cfa2684_machine_a_barbe_a_papa.png', 0),
('Camion-restaurant', 'Un magnifique camion-restaurant qui fait fureur. Surtout aux Etats-Unis.', 120, 1, 1, 1, '/uploads/image_article_662eb8e495f93_food_truck.png', 0);

COMMIT; 

CREATE TABLE `clients` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `mdp` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `clients` (`first_name`, `last_name`, `email`, `mdp`) VALUES
('Karam', 'JABBOUR', 'karamjabbour@discret.com', '123456'),
('Ghita', 'Khefif', 'ghitakhefif@discret.com', '123456'),
('Enrique', 'Martins', 'enriquemartin@discret.com', '123456');

COMMIT;

CREATE TABLE `rentals` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `rental_date` date NOT NULL,
  `return_date` date NOT NULL,
  `rented` tinyint(1) NOT NULL,
  `shipping_address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `location` (`client_id`, `id_article`, `date_location`, `date_retour`, `etat_location`, `adresse_location`) VALUES
(1, 3, '2024-04-02', '2024-04-23', 0, '19 Rue des tulipes'),
(2, 3, '2024-05-20', '2024-05-22', 1, '19 Rue des tulipes'),
(2, 1, '2024-05-22', '2024-05-24', 1, '28 Rue des mimosa'),
(3, 3, '2024-05-26', '2024-05-30', 1, '36 Rue des lilas');

COMMIT;