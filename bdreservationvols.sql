-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 01 fév. 2021 à 11:11
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP : 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bdreservationvols`
--

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telephone` int(11) NOT NULL,
  `idVol` int(11) NOT NULL,
  `nbrPlacesReserves` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `code`, `nom`, `prenom`, `email`, `telephone`, `idVol`, `nbrPlacesReserves`) VALUES
(10, 123, 'test', 'sanaa', 'asas@asa.com', 1293823, 3, 4),
(11, 123, 'sanou', 'sanaa', 'aisja@aijs.com', 293823, 3, 1),
(12, 123, 'sanaa', 'sanou', 'ab.banana@hotmail.fr', 923823, 3, 1),
(13, 123, 'sami', 'samii', 'ab.banana@hotmail.fr', 627362382, 3, 2),
(14, 123, 'sanaa', 'sanou', 'ab.banana@hotmail.fr', 627362382, 3, 2),
(15, 123, 'sana', 'sanaa', 'ab.banana@hotmail.fr', 627362382, 3, 1),
(16, 123, 'salah', 'lkalb', 'ab.banana@hotmail.fr', 627362382, 3, 1),
(17, 123, 'salah', 'eddine', 'ab.banana@hotmail.fr', 8223293, 3, 1);

--
-- Déclencheurs `reservation`
--
DELIMITER $$
CREATE TRIGGER `abs` AFTER DELETE ON `reservation` FOR EACH ROW BEGIN 
   UPDATE vol SET vol.nbrPlaces = vol.nbrPlaces + old.nbrPlacesReserves where vol.id=old.idVol; 
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `subs` AFTER INSERT ON `reservation` FOR EACH ROW BEGIN 
   UPDATE vol SET vol.nbrPlaces = vol.nbrPlaces - new.nbrPlacesReserves where vol.id=new.idVol; 
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `vol`
--

CREATE TABLE `vol` (
  `id` int(11) NOT NULL,
  `villeDepart` varchar(50) NOT NULL,
  `villeArrivee` varchar(50) NOT NULL,
  `dateDepart` date NOT NULL,
  `dateArrivee` date NOT NULL,
  `heureDepart` time NOT NULL,
  `heureArrivee` time NOT NULL,
  `nbrPlaces` int(11) NOT NULL,
  `escale` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `vol`
--

INSERT INTO `vol` (`id`, `villeDepart`, `villeArrivee`, `dateDepart`, `dateArrivee`, `heureDepart`, `heureArrivee`, `nbrPlaces`, `escale`) VALUES
(3, 'safi', 'casablanca', '2021-02-02', '2021-01-31', '20:24:08', '23:24:08', 7, 'Mok'),
(4, 'safi', 'casablanca', '2021-01-30', '2021-02-07', '15:45:05', '23:45:05', 10, 'safi'),
(5, 'safi', 'casablanca', '2021-01-31', '2021-01-31', '00:22:00', '23:23:00', 20, 'mok');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idVol` (`idVol`);

--
-- Index pour la table `vol`
--
ALTER TABLE `vol`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `vol`
--
ALTER TABLE `vol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`idVol`) REFERENCES `vol` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
