-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2023 at 02:12 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `borrow`
--

CREATE TABLE `borrow` (
  `borrowid` int(5) UNSIGNED NOT NULL,
  `statusborrow` tinyint(4) NOT NULL,
  `borrowdate` date NOT NULL,
  `returndate` date NOT NULL,
  `userid` int(5) NOT NULL,
  `id` int(10) NOT NULL,
  `reason` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrow`
--

INSERT INTO `borrow` (`borrowid`, `statusborrow`, `borrowdate`, `returndate`, `userid`, `id`, `reason`) VALUES
(123, 4, '2023-11-24', '2023-11-30', 3, 2, ''),
(124, 3, '2023-11-24', '2023-11-30', 3, 62, ''),
(125, 4, '2023-11-24', '2023-11-25', 3, 3, ''),
(126, 3, '2023-11-24', '2023-11-30', 3, 2, ''),
(127, 3, '2023-11-24', '2023-11-29', 3, 54, 'No'),
(128, 4, '2023-11-30', '2023-11-28', 3, 13, ''),
(129, 4, '2023-11-23', '2023-12-07', 3, 62, ''),
(130, 4, '2023-11-24', '2023-11-30', 3, 3, ''),
(131, 4, '2023-11-24', '2023-12-01', 3, 4, ''),
(132, 3, '2023-11-24', '2023-12-01', 3, 2, ''),
(133, 4, '2023-11-24', '2023-11-24', 3, 2, ''),
(134, 4, '2023-11-24', '2023-11-30', 3, 54, ''),
(135, 4, '2023-11-24', '2023-12-01', 4, 8, ''),
(136, 3, '2023-11-25', '2023-11-30', 4, 12, 'not this asset is now'),
(137, 3, '2023-11-25', '2023-11-29', 4, 62, 'No!'),
(138, 4, '2023-11-26', '2023-11-30', 3, 62, ''),
(139, 4, '2023-11-26', '2023-11-30', 3, 2, ''),
(140, 4, '2023-11-26', '2023-11-26', 3, 3, ''),
(141, 4, '2023-11-26', '2023-12-02', 3, 8, ''),
(149, 4, '2023-11-26', '2023-11-30', 4, 62, ''),
(150, 4, '2023-11-26', '2023-11-29', 2, 13, ''),
(151, 4, '2023-11-26', '2023-11-30', 3, 62, ''),
(152, 4, '2023-11-26', '2023-11-30', 3, 3, ''),
(153, 4, '2023-11-26', '2023-11-29', 4, 3, ''),
(154, 3, '2023-11-26', '2023-11-30', 3, 3, ''),
(155, 3, '2023-11-26', '2023-11-29', 3, 62, ''),
(156, 3, '2023-11-26', '2023-11-29', 3, 8, ''),
(157, 3, '2023-11-26', '2023-11-29', 3, 2, ''),
(164, 4, '2023-12-01', '2023-12-08', 3, 15, '');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(60) NOT NULL,
  `statusproduct` tinyint(1) NOT NULL,
  `image` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `statusproduct`, `image`) VALUES
(2, 'Ethernet Hub', 0, 'Ethernethub.jpg'),
(3, 'Fan Notebook', 0, 'Fannotebook.jpg'),
(4, 'Flash Drive', 0, 'Flashdrive.jpg'),
(5, 'HDMI', 0, 'HDMI.jpg'),
(6, 'Headphone', 0, 'Headphone.jpg'),
(7, 'Hub USB', 0, 'HubUSB.jpg'),
(8, 'iPad', 0, 'Ipad.jpg'),
(9, 'Keyboard', 0, 'Keyboard.jpg'),
(10, 'Macbook', 0, 'Macbook.jpg'),
(11, 'Microphone', 0, 'Microphone.jpg'),
(12, 'Monitor', 0, 'Monitor.jpg'),
(13, 'Mouse', 0, 'Mouse.jpg'),
(14, 'Mousepad', 0, 'Mousepad.jpg'),
(15, 'Plug', 0, 'Plug.jpg'),
(16, 'Printer', 0, 'Printer.jpg'),
(54, 'Speaker', 0, 'Speaker.jpg'),
(60, 'Projector', 0, 'Projecttor.jpg'),
(61, 'Router', 0, 'Router.jpg'),
(62, 'Calculator', 0, 'Calculator.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(5) UNSIGNED NOT NULL,
  `email` varchar(60) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `email`, `username`, `password`, `role`) VALUES
(1, 'staff@gmail.com', 'staff', '$2b$10$RCDBWWt9iJG7xt3bkpJPqOR4YUlgAZPKodCN9zWuVsJPRX6yY/BZa', 1),
(2, 'lecturer@gmail.com', 'lecturer', '$2b$10$TBIBYhyoOt4nTBr3hZ1NQODHNq41YrmYjmD3lKYPVJBFxRXHp.Z.e', 2),
(3, 'user@gmail.com', 'user', '$2b$10$H2qN5ChGJLiOPL4hO.qdMe0CV8bljz21gqp4Yhgz995sup3eAuGQW', 3),
(4, '6431501061@lamduan.mfu.ac.th', 'Bank', '$2b$10$9hzJGaYB1ZcCmtSk2pMlBuxBZ5Af6bqx11ovuM37VXSQ0nuJ0I.YW', 3),
(5, 'patipanbank1234@gmail.com', 'gg', '$2b$10$Ht2qBMtIdxbvp1P8OzE9IOzAMKuBhA1yuuh8HR5XnllZlyKLlX6km', 3),
(6, 'filmzaza@gmail.com', 'filmkung', '$2b$10$dR3dwtwVkhxCeAhuU1bjmeBIXPvwQVMTRxIueN0DfBQALPYcOInue', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borrow`
--
ALTER TABLE `borrow`
  ADD PRIMARY KEY (`borrowid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `borrow`
--
ALTER TABLE `borrow`
  MODIFY `borrowid` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
