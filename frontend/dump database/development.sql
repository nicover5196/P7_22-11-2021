-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 09 jan. 2022 à 19:19
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `development`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `postId`, `userId`, `content`, `createdAt`, `updatedAt`) VALUES
(26, 44, 22, 'Ah oui, c\'était la fois ou il y\'avait Neriwin qui était tomber dans le fossé ?', '2022-01-07 09:33:32', '2022-01-07 09:33:32'),
(27, 46, 26, 'Effectivement ! Sa déchire ! ', '2022-01-07 09:35:27', '2022-01-07 09:35:27');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postId` (`postId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `imagePost` varchar(255) DEFAULT NULL,
  `likes` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `content`, `title`, `imagePost`, `likes`, `createdAt`, `updatedAt`) VALUES
(44, 24, 'J\'étais en balade, quand d\'un coup, une bête est tomber dans un fossé, perturbée, j\'ai regarder pendant que mon téléphone ma pris en photo.', 'Un regard troublant', 'http://localhost:3000/images/jules1641504425941.jpg', 0, '2022-01-06 21:27:05', '2022-01-06 21:27:05'),
(45, 24, 'un super meessasaaaaaaaaaaaa asssssssssss assssssssssssasssssssssss ', 'Nouvelle publication', 'http://localhost:3000/images/2019-04-071641504809164.png', 0, '2022-01-06 21:33:29', '2022-01-06 21:33:29'),
(46, 22, 'il est partout ! ', 'Computed', 'http://localhost:3000/images/giphy1641547934288.undefined', 0, '2022-01-07 09:32:14', '2022-01-07 09:32:14'),
(47, 26, 'Je me promène :-)', 'NIKI', 'http://localhost:3000/images/chaton-errant-768x5121641548079746.jpg', 0, '2022-01-07 09:34:39', '2022-01-07 09:34:39'),
(48, 22, 'Récemment j\'ai du supprimer une publication qui ne respecter la bienveillance des autres utilisateurs ... \r\n', 'Attention à vos publications !', 'http://localhost:3000/images/yévous-surveille-ye-vous-surveille1641569048068.undefined', 0, '2022-01-07 15:24:08', '2022-01-07 15:24:08'),
(49, 27, 'Voila mon fond d\'écran ! ', 'Dofus', 'http://localhost:3000/images/4188711641569333405.jpg', 0, '2022-01-07 15:28:53', '2022-01-07 15:28:53');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20211110182430-create-user.js'),
('20211110182728-create-post.js'),
('20211110182929-create-like.js'),
('20211110183043-create-comment.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `imageProfile` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `isAdmin`, `imageProfile`, `createdAt`, `updatedAt`) VALUES
(22, 'admin', 'admin@admin.com', '$2b$10$z4msAYfKu9BBYfPtSJY8cOCfj8XzAmjPlO.c4x1KcqBCS21YiVZQm', 1, NULL, '2022-01-06 10:12:01', '2022-01-06 10:12:01'),
(24, 'nicover', 'nicover5196@hotmail.fr', '$2b$10$dlhLO.ijZCekFPOqKddGvup7VligQecuaSsRqlJTFSoTzOAPS.RQe', 0, NULL, '2022-01-06 10:56:46', '2022-01-06 10:56:46'),
(25, 'utilisateur', 'utilisateur@utilisateur.fr', '$2b$10$vElgmkQK4J6RPAwcsFCJKex6J72y4uZXiMPwRq4qMgoPsUkmAy84S', 0, NULL, '2022-01-07 09:30:35', '2022-01-07 09:30:35'),
(26, 'niki', 'niki@niki.com', '$2b$10$Vrt0fpLgZHEpjK8mUaesk.A64.h2pnWpHkReqsu7uNbOqHFc16LHa', 0, NULL, '2022-01-07 09:33:58', '2022-01-07 09:33:58'),
(27, 'dazz', 'dazz@hotmail.fr', '$2b$10$OabJQ//tsob8VdKfe6o0M.o6DAlKC5m.cBS1sWQVXy.tJXwrpwpJW', 0, NULL, '2022-01-07 15:25:57', '2022-01-07 15:25:57');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
