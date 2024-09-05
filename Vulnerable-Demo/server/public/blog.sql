-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2024 at 09:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `image`) VALUES
(1, 'The Rise of React', 'React has revolutionized the way we build user interfaces with its component-based architecture and virtual DOM.', 'https://picsum.photos/id/0/367/267'),
(2, 'Understanding JavaScript Closures', 'Closures are a powerful feature in JavaScript that allows functions to retain access to their lexical scope.', 'https://picsum.photos/id/0/367/267'),
(3, 'A Guide to CSS Flexbox', 'CSS Flexbox is a layout model that provides an efficient way to lay out, align, and distribute space among items in a container.', 'https://picsum.photos/id/0/367/267'),
(4, 'Exploring Node.js Streams', 'Node.js streams provide a way to handle large amounts of data efficiently by processing it in chunks.', 'https://picsum.photos/id/0/367/267'),
(5, 'Introduction to TypeScript', 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript and provides optional static typing.', 'https://picsum.photos/id/0/367/267'),
(6, 'Building RESTful APIs with Express', 'Express.js simplifies the process of building RESTful APIs by providing robust features for handling HTTP requests.', 'https://picsum.photos/id/0/367/267'),
(7, 'Getting Started with Tailwind CSS', 'Tailwind CSS is a utility-first CSS framework that enables rapid design and development with pre-defined classes.', 'https://picsum.photos/id/0/367/267');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'user@email.com', 'password123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
