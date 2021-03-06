-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2020 at 02:34 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `socialnetwork`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) UNSIGNED NOT NULL,
  `comment` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `posted_at` int(64) UNSIGNED NOT NULL,
  `post_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `comment`, `user_id`, `posted_at`, `post_id`) VALUES
(20, 'Hahaha stop it', 1, 1587843565, 4),
(21, 'testing comment bug', 1, 1587843565, 32),
(22, 'wow haha nice. have fun :))', 8, 1587843565, 10),
(23, 'it worked great :)', 1, 1587843565, 36),
(24, 'testing timestamp', 1, 1587843565, 37),
(25, 'testing timestamp again', 1, 1587843565, 37),
(26, 'testing timestamp trial #3', 1, 1587843565, 37),
(27, 'testing timestamp trial #4', 1, 1587843565, 37),
(28, 'testing timestamp trial #5', 1, 1587843565, 32),
(29, 'testing timestamp trial #6', 1, 1587843565, 5),
(30, 'testing timestamp trial #7', 1, 1587843565, 5),
(31, 'hi; DELETE * FROM notifications;', 1, 1588507954, 5),
(33, 'Test', 29, 1589538184, 39),
(93, 'Test #6', 29, 1589538763, 39),
(94, 'Test #7', 29, 1589538876, 39),
(95, 'Test #8', 29, 1589538913, 39),
(96, 'At least we seen the importance of nurses', 29, 1589539438, 38),
(98, '<b>Test</b>', 29, 1589539600, 38),
(99, '&lt;b&gt; Test &lt;/b&gt;', 29, 1589539721, 38),
(100, '', 29, 1589539735, 38),
(101, '', 29, 1589540146, 38),
(102, '', 29, 1589540569, 38),
(103, '', 29, 1589540610, 38),
(104, '', 29, 1589540833, 38),
(106, '', 29, 1589540898, 39),
(107, '', 29, 1589541025, 39),
(108, '', 29, 1589541038, 39),
(110, '', 29, 1589541639, 39),
(111, '', 29, 1589542620, 39),
(112, '', 29, 1589542671, 39),
(113, '', 29, 1589542856, 39),
(121, '', 29, 1589543941, 39),
(122, '', 29, 1589543969, 39),
(123, '', 29, 1589544010, 39),
(125, '', 29, 1589544384, 39),
(126, '', 29, 1589544471, 39),
(127, '', 29, 1589544487, 39),
(132, '', 29, 1589545135, 39),
(136, '', 29, 1589545534, 39),
(143, '', 29, 1589547844, 39),
(144, '', 29, 1589547921, 39),
(145, '', 29, 1589548053, 39),
(146, '', 29, 1589548108, 39),
(150, '%22te%5Cn%5Cnst%22', 29, 1589549378, 39),
(151, '%5C%22%5Cbte%5Cb%5C%5Cbn%5Cb%5C%5Cbnst%5Cb%5C%22', 29, 1589549471, 39),
(152, 'te%0A%0Ast', 29, 1589549527, 39),
(153, 'te%26%26st%0As', 29, 1589549749, 39),
(154, 'te%5Cn%5Cnst', 29, 1589550199, 39),
(156, 'te%0A%0Ast', 29, 1589550683, 39),
(157, '%3Cb%3Etest%3C%2Fb%3E', 29, 1589553356, 39),
(158, '%3Cb%3Etest%3C%2Fb%3E', 29, 1589553389, 39),
(159, '%3Cb%3Etest%3C%2Fb%3E', 29, 1589553776, 39),
(161, '%3Cinput%20type%20%3D%20%22file%22%2F%3E', 29, 1589554283, 39),
(168, 'testing%20responses', 1, 1591420939, 38),
(169, 'hi%20Pink%2C%20im%20angelo%20%3A))', 1, 1591421184, 35),
(170, 'ehh%20its%20been%20bleak', 1, 1591421251, 38),
(171, 'some%20kenyan%20music%20%3B)', 1, 1591421280, 38),
(172, 'why%20tho\'%0Ahaha', 1, 1591421584, 11);

-- --------------------------------------------------------

--
-- Table structure for table `comment_ratings`
--

CREATE TABLE `comment_ratings` (
  `id` int(11) UNSIGNED NOT NULL,
  `comment_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment_ratings`
--

INSERT INTO `comment_ratings` (`id`, `comment_id`, `user_id`, `rating`) VALUES
(1, 29, 1, 1),
(2, 30, 1, 4),
(3, 30, 1, 4),
(4, 31, 1, 7),
(5, 22, 1, 8),
(6, 20, 1, 10),
(7, 0, 1, 0),
(8, 21, 1, 9),
(9, 28, 1, 3),
(10, 23, 1, 5),
(11, 26, 1, 8),
(12, 31, 8, 8),
(13, 30, 8, 6),
(14, 29, 8, 1),
(15, 20, 8, 3),
(16, 31, 29, 1),
(17, 29, 29, 9),
(18, 30, 29, 10),
(19, 95, 29, 8),
(21, 104, 1, 7),
(22, 170, 1, 8),
(23, 168, 1, 7),
(24, 171, 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `id` int(10) UNSIGNED NOT NULL,
  `designation_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `designations`
--

INSERT INTO `designations` (`id`, `designation_name`) VALUES
(1, 'test'),
(3, 'designationsTestAngelo'),
(4, 'designationsTestCharity'),
(5, 'designationsTestPink'),
(6, 'Undergraduate Student'),
(7, 'Graduate Student'),
(8, 'Lecturer');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `follower_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `user_id`, `follower_id`) VALUES
(9, 1, 16),
(10, 8, 16),
(93, 29, 8),
(94, 29, 16),
(118, 16, 29),
(121, 1, 29),
(122, 8, 29),
(134, 8, 1),
(135, 16, 1),
(137, 1, 31),
(142, 31, 35),
(143, 1, 35),
(144, 14, 35),
(145, 32, 35),
(146, 30, 35),
(147, 29, 1),
(148, 1, 55),
(149, 35, 55),
(150, 8, 55),
(151, 1, 61);

-- --------------------------------------------------------

--
-- Table structure for table `following_topics`
--

CREATE TABLE `following_topics` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `topic_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `following_topics`
--

INSERT INTO `following_topics` (`id`, `user_id`, `topic_id`) VALUES
(17, 1, 3),
(19, 1, 1),
(85, 29, 4),
(89, 29, 5),
(97, 29, 8),
(100, 29, 3),
(136, 1, 8),
(150, 35, 7),
(151, 35, 6),
(152, 35, 9),
(153, 35, 8),
(154, 35, 5),
(155, 55, 5),
(156, 55, 7);

-- --------------------------------------------------------

--
-- Table structure for table `institutions`
--

CREATE TABLE `institutions` (
  `id` int(11) UNSIGNED NOT NULL,
  `institution_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `institutions`
--

INSERT INTO `institutions` (`id`, `institution_name`) VALUES
(1, 'institutionTestAngelo'),
(3, 'institutionTestCharity'),
(4, 'institutionTestPink'),
(5, 'Pwani University'),
(6, 'kenyatta university'),
(7, 'jomo kenyatta university of agriculture and technology'),
(8, 'Kenyatta University'),
(9, 'United States International University'),
(10, 'Strathmore University'),
(11, 'Moi University');

-- --------------------------------------------------------

--
-- Table structure for table `login_tokens`
--

CREATE TABLE `login_tokens` (
  `id` int(11) UNSIGNED NOT NULL,
  `token` char(64) NOT NULL DEFAULT '',
  `user_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login_tokens`
--

INSERT INTO `login_tokens` (`id`, `token`, `user_id`) VALUES
(37, '55653d480038f2e7166ba1971f8664a713916eee', 8),
(39, 'f60da91aebe9389324a11e5c12400cea0a4377df', 8),
(41, '200c9b245130c536cc574438544b9e37cd9b6b11', 8),
(42, '550a82f11fc28947b579c84afa89068ef79cabe7', 8),
(44, 'b54d3ce11e50720f922b904e8f9780207befcf0b', 8),
(46, 'fd15bcab4be3e4711e03316cced5e23cb9dda7a8', 8),
(48, '7267f2060de7a4c051b63e7b6485da08d5c6fbc6', 8),
(54, '88a0774df4c52e4f04047d498849e79c3f801ca8', 8),
(55, '77b881c674738224e664f1a4cfdcad7b506b41b2', 11),
(56, '66bb241067bd6acc23761f9cad5570e7fab8006d', 8),
(57, '04bc2706db0804f0f926369c7f8011ee1256c0b2', 11),
(58, '50622a79214bd970087661e376f042d82f912bd8', 8),
(59, '61b82c5b358261635f31ef5244a9a94ff9329b7f', 11),
(60, 'c73effa4d21a74adbc6bf418cfe269d9176be57b', 8),
(62, 'ee332b8354b2e51edc20bc95f6b707577ee69b25', 11),
(63, '0dbdd7a8408beadf174e4ec29385f90dddc90047', 11),
(64, '8339297d9a8645bc72c25c1a11de6b39bbc6227d', 8),
(65, '87d324132371ab64fb1eab87eb848a7056a8840d', 11),
(67, '1981a3b69bacef518c3cedf99fd5568f4dd89fd3', 11),
(69, 'b9929fcb7dfb3780a0ca204138ca157ae4af250f', 11),
(71, '7b06023ddf8bf2a2a720cd81d0ab850ab431f30d', 11),
(81, '138e9b241e98a012508d8feee81df73aae93d120', 11),
(83, 'e0ff5f4156d3dbc0ed936ae9783cbd3cfa01ed5a', 8),
(85, '1224073294117e0cef7f2f224a40ba833422b141', 8),
(104, 'a4b947af64a3aa45ceb84bf6aebab28c108e7e51', 8),
(108, '76acbff48be9c20e04983988fc7f769a2489ef8e', 16),
(110, '0f21e5b451c5a377fe42eeac3d038b290a1001a1', 16),
(112, '715b645cf83d749917e1aa969b54d50326bdf851', 16),
(114, 'bcd8e803bc00039ddb0b847bfcbd697eed8bdaa5', 8),
(116, '2974a0db44212e6d97561ed43ad73faee7ccefc2', 16),
(118, 'a02bebd553f5f1ea1f1dd0d55f71d854030c914c', 8),
(120, '30f5baa5f537621369352d09aded6c360caccc40', 8),
(122, 'da4b4265ecc49e5ce15dcae11ac41f3839df2d65', 8),
(124, 'e83228dea9962feab1eca8f4950c3e08199f95dd', 8),
(129, '2f5ddedb35d44fe7541682d7d9e16ecfb30227bf', 8),
(130, '5778102321f1b4fc8a6a7d0e8ad6b418e129aa2f', 8),
(132, '5ded8a1fd6c1f05cbee8a2983bb7fe7f4aca2fb4', 8),
(133, '07137ae5f51c5601cc073654a7d2ea4a07a44d61', 8),
(134, '0f9adfe3fa4522d7a2876ee26a930b63c91bd889', 29),
(137, '8786caa12716efe19956b7a429ddd2195ac0b714', 29),
(139, '63fa3f7fd8b9773f53840b1d6623d610dbfc99dc', 29),
(153, 'e8c077b823a8de2ff2841e0fc512540ef69d368f', 29),
(154, '4e23eeca6bb3febd5d3433315a0804d97fc3f3ff', 11),
(155, '846d706cb2e3cf5834951993ff9b9a5fd13624af', 1),
(156, 'c08e3b54b00ea9ca22799ef565aa149510d7fc22', 11),
(159, '6da1a47e2c15bf8754127823938692577e26c0ca', 1),
(162, 'b4ddd599439d6b0861f36ac58994fdd3ae6640a1', 29),
(164, 'ca24ae6c77186e3163d3b229d0d7db5fe5c319ff', 11),
(165, 'c533f9f955c3e4c4fbe99b4a71b99828cf92acb5', 1),
(166, '06fb0ab7c40befe6f910d6069ce40d745d530204', 30),
(168, '08fc47e8d0ff8d6cf658faaede224542e241ed29', 11),
(169, '263820eadbd7fa9dd803dc28deb09e8c0e89f3b5', 29),
(170, '5ad2921939f2a33fc2b65658a8639e6069283806', 11),
(171, 'e74ab5835c454801806fb4f8852c2728c98f2ed4', 1),
(172, '56495bcbb9f6760b833e279bd0a35b796c934e7e', 32),
(173, 'e217adffd9d974d1f68db0421dc8a9a3f157ab7d', 33),
(174, 'b76b60b6ec1b1a97465e26cce96887e071a74a05', 34),
(175, '1d39b7996862f3008f647b2752d04e82f62612e8', 35),
(176, '9d90f75149cab018f73db75f8af73e2c3d55062c', 1),
(177, '22b2cc33d482a6321dafab624f78839c75ce7798', 1),
(178, '05fb4593f7d40004b9786d21ea008cf65a4539cd', 1),
(179, 'cb523ceed2cc4ca3c7c15ea2336184d8ea0ac042', 36),
(180, '741dcef441cd616e8239dcc80323a96500cc589c', 37),
(181, 'a03b993771825f242cc9a610a4240195c41365af', 38),
(182, 'd86117ed62a678d156fa1b64902f499f1f051a62', 39),
(183, 'd2bff2afa2c8d69d12535e22bddbeac0032e8cca', 40),
(184, '542f26a79b2ce175942bafcf130857c73bb80e92', 41),
(185, 'fe34ea4e8cc1d6c811053bec0aecddcd1205bf3c', 41),
(186, '4be205da7564351de008c62c06470bdadefe398f', 41),
(187, '197558d081f25d1c3548a7c38bde1848dfe7e48e', 44),
(188, 'eb62388549938a3ac87c8f4b3e4a12617f8f9374', 45),
(189, '69ec0f38a42f83b59d9fba78926c20fbcb81abcc', 46),
(190, '63dbeec0e88e53cf8bf25c5fd6acb511915a1a1f', 47),
(191, '44c0fc953e55fdd1b5132cf41a093b96b6ea5b41', 48),
(192, 'dc0fd44ed4326eee586dd5b201d171d150aa8260', 49),
(193, 'e9f02f1f0d780952450104211a0c5d6a26fc8f3a', 50),
(194, '4ddce91f5d802517d49aeed36470eb1cb11e1a29', 51),
(195, '7b16e79fbe3bba696b897ffeab849151ffbd7e10', 52),
(196, '7e50faa08678d022908d9d9a93e4f187a54fc9f6', 53),
(197, 'd583822a60597b27833562c737eaf5d61e42914f', 54),
(198, '6a4bea24d17c862ec344d155f071986e9927f47e', 55),
(199, '37290b048e6da4e41277514e73050fa98e3df197', 56),
(200, '05af0063d06aaa6bdd8284ccfbc6e5001befa58b', 57),
(201, '08554af7f84c5ade7601e3e1294613d99d3d77e8', 58),
(202, '0d2201efd7babb7ca7bd38e9707aacd93f8df42b', 59),
(203, 'd98f1af9e2f2d5f1fb2f169fc978d40791c6d38c', 60),
(204, '0c8ac6f3f26ebb0407f3ea477b2f578f852125a7', 61),
(205, '1b028d17de5590ec30ec386c44189e76bced6766', 1),
(207, '6947fde177efe1852a9abe1dbb9cae37b8a48a9c', 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) UNSIGNED NOT NULL,
  `body` text NOT NULL,
  `sender` int(11) UNSIGNED NOT NULL,
  `receiver` int(11) UNSIGNED NOT NULL,
  `read` tinyint(1) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) UNSIGNED NOT NULL,
  `type` int(11) UNSIGNED NOT NULL,
  `receiver_id` int(10) UNSIGNED NOT NULL,
  `sender_id` int(11) UNSIGNED NOT NULL,
  `post_id` int(11) UNSIGNED DEFAULT NULL,
  `comment_id` int(10) UNSIGNED DEFAULT NULL,
  `seen` tinyint(1) NOT NULL,
  `created_at` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `receiver_id`, `sender_id`, `post_id`, `comment_id`, `seen`, `created_at`) VALUES
(56, 1, 29, 29, 95, NULL, 1, 1589879180),
(58, 7, 16, 29, 0, NULL, 0, 1589910529),
(59, 7, 16, 29, 0, NULL, 0, 1589910596),
(60, 7, 16, 29, 0, NULL, 0, 1589910601),
(61, 7, 16, 29, 0, NULL, 0, 1589911015),
(62, 7, 16, 29, 0, NULL, 0, 1589911345),
(63, 7, 16, 29, 0, NULL, 0, 1589911352),
(64, 7, 16, 29, 0, NULL, 0, 1589911736),
(65, 7, 16, 29, 0, NULL, 0, 1589911846),
(66, 7, 16, 29, 0, NULL, 0, 1589911862),
(67, 7, 16, 29, 0, NULL, 0, 1589912142),
(68, 7, 16, 29, 0, NULL, 0, 1589912142),
(69, 7, 16, 29, 0, NULL, 0, 1589912165),
(70, 7, 16, 29, 0, NULL, 0, 1589912165),
(71, 7, 16, 29, 0, NULL, 0, 1589912165),
(72, 7, 8, 29, 0, NULL, 0, 1589912175),
(73, 7, 16, 29, 0, NULL, 0, 1589912234),
(74, 7, 8, 29, 0, NULL, 0, 1589912239),
(75, 7, 16, 29, 0, NULL, 0, 1589912252),
(76, 7, 1, 29, 0, NULL, 1, 1589918317),
(77, 7, 1, 29, 0, NULL, 1, 1589918319),
(78, 7, 1, 29, 0, NULL, 1, 1589918330),
(79, 7, 1, 29, 0, NULL, 1, 1589918337),
(80, 7, 1, 29, 0, NULL, 1, 1589918353),
(81, 7, 1, 29, 0, NULL, 1, 1589918376),
(82, 7, 1, 29, 0, NULL, 1, 1589918395),
(83, 7, 16, 29, 0, NULL, 0, 1589918449),
(84, 7, 1, 29, 0, NULL, 1, 1589918467),
(85, 7, 16, 29, 0, NULL, 0, 1589918573),
(86, 7, 1, 29, 0, NULL, 1, 1589918611),
(87, 7, 1, 29, 0, NULL, 1, 1589918735),
(88, 7, 8, 29, 0, NULL, 0, 1589918743),
(89, 7, 8, 29, 0, NULL, 0, 1589918975),
(90, 7, 8, 29, 0, NULL, 0, 1589918977),
(91, 7, 8, 29, 0, NULL, 0, 1589918990),
(92, 7, 1, 29, 0, NULL, 1, 1589918995),
(93, 7, 8, 29, 0, NULL, 0, 1589919136),
(94, 7, 1, 29, 0, NULL, 1, 1589919143),
(95, 7, 8, 29, 0, NULL, 0, 1589919237),
(96, 7, 1, 29, 0, NULL, 1, 1589919287),
(97, 7, 8, 29, 0, NULL, 0, 1589919336),
(98, 7, 1, 29, 0, NULL, 1, 1589919347),
(99, 7, 8, 29, 0, NULL, 0, 1589919407),
(100, 7, 8, 29, 0, NULL, 0, 1589919936),
(101, 7, 8, 29, 0, NULL, 0, 1589919952),
(102, 7, 1, 29, 0, NULL, 1, 1589919974),
(103, 7, 1, 29, 0, NULL, 1, 1589951526),
(104, 7, 8, 29, 0, NULL, 0, 1589951535),
(105, 7, 8, 29, 0, NULL, 0, 1589951742),
(106, 7, 16, 29, 0, NULL, 0, 1589951768),
(107, 7, 16, 29, 0, NULL, 0, 1589951786),
(108, 7, 1, 29, 0, NULL, 1, 1589951793),
(109, 7, 8, 29, 0, NULL, 0, 1589951801),
(110, 7, 1, 29, 0, NULL, 1, 1589951985),
(111, 7, 1, 29, 0, NULL, 1, 1589952041),
(112, 7, 1, 29, 0, NULL, 1, 1589952082),
(113, 7, 1, 29, 0, NULL, 1, 1589952104),
(114, 7, 1, 29, 0, NULL, 1, 1589952121),
(115, 7, 1, 29, 0, NULL, 1, 1589952320),
(116, 7, 1, 29, 0, NULL, 1, 1589952325),
(117, 7, 1, 29, 0, NULL, 1, 1589952407),
(118, 7, 1, 29, 0, NULL, 1, 1589952411),
(119, 7, 1, 29, 0, NULL, 1, 1589952423),
(120, 7, 1, 29, 0, NULL, 1, 1589952502),
(121, 7, 1, 29, 0, NULL, 1, 1589952504),
(122, 7, 1, 29, 0, NULL, 1, 1589952512),
(123, 7, 1, 29, 0, NULL, 1, 1589952550),
(124, 7, 1, 29, 0, NULL, 1, 1589952583),
(125, 7, 16, 29, 0, NULL, 0, 1589952591),
(126, 7, 16, 29, 0, NULL, 0, 1589952617),
(127, 7, 16, 29, 0, NULL, 0, 1589952628),
(128, 7, 16, 29, 0, NULL, 0, 1589952631),
(129, 7, 1, 29, 0, NULL, 1, 1589952689),
(130, 7, 16, 29, 0, NULL, 0, 1589952693),
(131, 7, 1, 29, 0, NULL, 1, 1589952696),
(132, 7, 1, 29, 0, NULL, 1, 1589953579),
(133, 7, 16, 29, 0, NULL, 0, 1589953585),
(134, 7, 1, 29, 0, NULL, 1, 1589953589),
(135, 7, 1, 29, 0, NULL, 1, 1589953895),
(136, 7, 1, 29, 0, NULL, 1, 1589953945),
(137, 7, 8, 29, 0, NULL, 0, 1589953976),
(139, 7, 14, 1, 0, NULL, 0, 1589975659),
(140, 7, 14, 1, 0, NULL, 0, 1589975669),
(141, 7, 14, 1, 0, NULL, 0, 1589975672),
(142, 7, 14, 1, 0, NULL, 0, 1589975675),
(144, 2, 29, 1, 95, NULL, 1, 1589988524),
(145, 3, 16, 1, 35, NULL, 0, 1589988606),
(146, 3, 16, 1, 35, NULL, 0, 1589988609),
(147, 3, 8, 1, 5, NULL, 0, 1589989039),
(148, 3, 29, 1, 95, NULL, 1, 1589989075),
(149, 1, 1, 11, 10, NULL, 1, 1590050530),
(151, 1, 29, 1, 84, NULL, 1, 1590144702),
(152, 1, 29, 1, 87, NULL, 1, 1590144704),
(153, 3, 29, 1, 85, NULL, 1, 1590144773),
(154, 3, 29, 1, 85, NULL, 1, 1590144775),
(224, 3, 8, 1, 4, NULL, 0, 1590752649),
(225, 3, 8, 1, 4, NULL, 0, 1590752649),
(226, 3, 8, 1, 4, NULL, 0, 1590752649),
(227, 3, 8, 1, 4, NULL, 0, 1590752653),
(228, 3, 8, 1, 4, NULL, 0, 1590752653),
(229, 3, 8, 1, 4, NULL, 0, 1590752653),
(230, 3, 8, 1, 5, NULL, 0, 1590752656),
(231, 3, 8, 1, 5, NULL, 0, 1590752656),
(232, 3, 8, 1, 5, NULL, 0, 1590752658),
(233, 3, 8, 1, 5, NULL, 0, 1590752658),
(234, 3, 8, 1, 5, NULL, 0, 1590752658),
(235, 3, 8, 1, 5, NULL, 0, 1590752661),
(236, 3, 8, 1, 5, NULL, 0, 1590752661),
(237, 3, 8, 1, 5, NULL, 0, 1590752661),
(238, 3, 16, 1, 35, NULL, 0, 1590752674),
(239, 3, 16, 1, 35, NULL, 0, 1590752674),
(240, 3, 16, 1, 35, NULL, 0, 1590752674),
(241, 3, 16, 1, 35, NULL, 0, 1590752678),
(242, 3, 16, 1, 35, NULL, 0, 1590752678),
(243, 3, 16, 1, 35, NULL, 0, 1590752678),
(244, 3, 16, 1, 35, NULL, 0, 1590752685),
(245, 3, 16, 1, 35, NULL, 0, 1590752688),
(246, 3, 16, 1, 35, NULL, 0, 1590752688),
(247, 3, 16, 1, 35, NULL, 0, 1590752689),
(248, 3, 16, 1, 35, NULL, 0, 1590752689),
(249, 3, 16, 1, 35, NULL, 0, 1590752691),
(250, 3, 16, 1, 35, NULL, 0, 1590752691),
(251, 3, 16, 1, 35, NULL, 0, 1590752691),
(252, 1, 8, 1, 36, NULL, 0, 1590752772),
(253, 1, 8, 1, 5, NULL, 0, 1590752777),
(254, 1, 8, 1, 5, NULL, 0, 1590752779),
(255, 1, 8, 1, 5, NULL, 0, 1590752780),
(256, 1, 8, 1, 5, NULL, 0, 1590752781),
(257, 3, 8, 1, 5, NULL, 0, 1590752784),
(258, 3, 8, 1, 5, NULL, 0, 1590752786),
(259, 3, 8, 1, 36, NULL, 0, 1590752787),
(260, 3, 8, 1, 36, NULL, 0, 1590752789),
(261, 3, 16, 1, 35, NULL, 0, 1590752796),
(262, 3, 16, 1, 35, NULL, 0, 1590752799),
(269, 7, 8, 1, 0, NULL, 0, 1591169962),
(270, 7, 16, 1, 0, NULL, 0, 1591169964),
(272, 1, 8, 1, 4, NULL, 0, 1591418649),
(273, 2, 8, 1, 38, 168, 0, 1591420939),
(274, 2, 16, 1, 35, 169, 0, 1591421184),
(275, 2, 8, 1, 38, 170, 0, 1591421251),
(276, 2, 8, 1, 38, 171, 0, 1591421280),
(279, 7, 1, 31, 0, NULL, 1, 1591518017),
(284, 7, 31, 35, 0, NULL, 0, 1591702759),
(285, 7, 1, 35, 0, NULL, 1, 1591702955),
(286, 7, 14, 35, 0, NULL, 0, 1591702957),
(287, 7, 32, 35, 0, NULL, 0, 1591702960),
(288, 7, 30, 35, 0, NULL, 0, 1591702962),
(293, 3, 8, 1, 38, NULL, 0, 1591818050),
(297, 1, 16, 1, 35, NULL, 0, 1591867795),
(298, 1, 16, 1, 35, NULL, 0, 1591867795),
(301, 7, 29, 1, 0, NULL, 0, 1592197872),
(308, 1, 8, 1, 38, NULL, 0, 1592306988),
(309, 7, 1, 55, 0, NULL, 1, 1592369320),
(310, 7, 35, 55, 0, NULL, 0, 1592369324),
(311, 7, 8, 55, 0, NULL, 0, 1592369339),
(312, 7, 1, 61, 0, NULL, 1, 1592467663);

-- --------------------------------------------------------

--
-- Table structure for table `password_tokens`
--

CREATE TABLE `password_tokens` (
  `id` int(11) UNSIGNED NOT NULL,
  `token` char(64) NOT NULL DEFAULT '',
  `user_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `password_tokens`
--

INSERT INTO `password_tokens` (`id`, `token`, `user_id`) VALUES
(4, '423022d2e03c920f8bf59efb8604e7d4b172247d', 8),
(8, 'a7d7e52dad604493860b7ecea5f08f5b4470676b', 1),
(9, 'd260df88a89d214986ad1b503e28adef3840dfbb', 1),
(10, '83c1e770cb198931e8826a0bba6a0e942f0fd2f6', 1),
(11, '0f38cabc4846e93113a9af182f98dd26c9aec5aa', 1),
(12, 'f76fa642a7eefc301019e593442262d11793b1cf', 1),
(13, '1aa4317258d91ffd1296b2419e63b3dd1dc10041', 1),
(14, 'f58eb393b7f048b47b857dc063a7d964ff637637', 1),
(15, '4d89d649af747d7f611005fd54527fbda347cec7', 1),
(16, '08ecec209f12cf84f7873901e478d3aa5de29e06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) UNSIGNED NOT NULL,
  `body` varchar(10000) NOT NULL DEFAULT '''''',
  `posted_at` int(64) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `likes` int(11) UNSIGNED NOT NULL,
  `comments` int(10) UNSIGNED NOT NULL,
  `shares` int(10) UNSIGNED NOT NULL,
  `postimg` varchar(255) DEFAULT NULL,
  `topic_id` int(11) NOT NULL,
  `type_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `body`, `posted_at`, `user_id`, `likes`, `comments`, `shares`, `postimg`, `topic_id`, `type_id`) VALUES
(1, 'hello world', 1587843659, 1, 1, 0, 2, '', 1, 14),
(2, 'im angelo', 1587843659, 1, 3, 0, 1, '', 1, 14),
(4, 'ones and twos', 1587843659, 8, 1, 1, 0, '', 1, 14),
(5, 'how do you do? eeh?', 1587843659, 8, 1, 3, 1, '', 1, 14),
(10, 'working on my project', 1587843659, 1, 2, 1, 0, '', 3, 14),
(11, 'This post has been removed due to abuse of site policies.', 1587843659, 1, 1, 1, 0, '', 1, 14),
(20, 'This post has been removed due to abuse of site policies.', 1587843659, 1, 0, 0, 0, '', 1, 14),
(25, 'This post has been removed due to abuse of site policies.', 1587843659, 1, 1, 0, 0, '', 1, 14),
(32, 'what is the molecular mass of nitrogen?', 1587843659, 1, 1, 2, 1, '', 1, 14),
(35, 'hello, im pink', 1587843659, 16, 2, 1, 2, '', 1, 14),
(36, 'index page unshared following post test #1', 1587843659, 8, 1, 1, 0, '', 1, 14),
(37, 'index post unshared user post test #1', 1587843659, 1, 3, 4, 0, '', 1, 14),
(38, 'how has the coronavirus affected your life?', 1588954140, 8, 2, 11, 1, '', 5, 9),
(39, 'Im confused by the difference between atomic and mass number. Anyone who can help around here??', 1589529086, 29, 1, 35, 1, '', 6, 14),
(44, 'te%0D%0A%0D%0Ast', 1589562244, 29, 0, 0, 0, '', 7, 14),
(45, 'te%0D%0A%0D%0Ast', 1589562418, 29, 0, 0, 0, '', 7, 14),
(46, 'te%0D%0A%0D%0Ast', 1589562419, 29, 0, 0, 0, '', 7, 14),
(47, 'Test+post', 1589562438, 29, 0, 0, 0, '', 7, 14),
(48, 'Test+post', 1589562481, 29, 0, 0, 0, '', 7, 14),
(49, 'Test+post+2', 1589562522, 29, 0, 0, 0, '', 7, 14),
(50, 'Test post 2', 1589562539, 29, 0, 0, 0, '', 7, 14),
(55, '&lt;b&gt;test&lt;/b&gt;', 1589609503, 29, 0, 0, 0, '', 7, 14),
(56, 'test\r\n\r\npost', 1589609551, 29, 0, 0, 0, '', 7, 14),
(57, 'files test', 1589706900, 29, 0, 0, 0, '', 6, 9),
(58, 'files test', 1589707140, 29, 0, 0, 0, '', 6, 9),
(59, 'files test', 1589707561, 29, 0, 0, 0, '', 6, 9),
(60, 'files test', 1589707757, 29, 0, 0, 0, '', 6, 9),
(61, 'files : test &lt;', 1589707797, 29, 0, 0, 0, '', 3, 9),
(62, 'files : test &lt;', 1589707915, 29, 0, 0, 0, '', 3, 9),
(63, 'files test', 1589707940, 29, 0, 0, 0, '', 5, 14),
(64, 'files test', 1589708298, 29, 0, 0, 0, '', 5, 14),
(65, 'files test', 1589708337, 29, 0, 0, 0, '', 5, 14),
(66, 'files test', 1589708513, 29, 0, 0, 0, '', 5, 14),
(67, 'files test', 1589708535, 29, 0, 0, 0, '', 7, 14),
(68, 'files test', 1589708643, 29, 0, 0, 0, '', 7, 14),
(69, 'files test #1', 1589708874, 29, 0, 0, 0, '', 3, 14),
(76, 'files test #2', 1589710428, 29, 0, 0, 0, '', 8, 14),
(79, 'foobar', 1589722756, 29, 0, 0, 0, '', 8, 14),
(80, 'foobar#2', 1589722902, 29, 0, 0, 0, '', 8, 14),
(81, 'foobar#3', 1589723008, 29, 0, 0, 0, '', 8, 14),
(82, 'foobar#4', 1589723073, 29, 0, 0, 0, '', 8, 14),
(83, 'foobar#5', 1589723624, 29, 0, 0, 0, '', 8, 14),
(84, 'foobar#6', 1589723759, 29, 0, 0, 0, '', 8, 14),
(85, 'foobar#7', 1589723957, 29, 0, 0, 0, '', 8, 14),
(86, 'foobar#8', 1589724757, 29, 0, 0, 0, '', 8, 14),
(87, 'foobar#8', 1589724757, 29, 0, 0, 0, '', 8, 14),
(88, 'foobar#9', 1589725160, 29, 0, 0, 0, '', 8, 14),
(89, 'foobar#10', 1589725242, 29, 1, 0, 0, '', 8, 14),
(90, 'foobar#11', 1589725501, 29, 0, 0, 0, '', 8, 14),
(91, 'foobar#12', 1589725618, 29, 1, 0, 0, '', 8, 14),
(92, 'foobar#13', 1589726077, 29, 0, 0, 0, '', 8, 14),
(93, 'foobar#14', 1589726148, 29, 0, 0, 0, '', 8, 14),
(94, 'foobar#15', 1589789640, 29, 1, 0, 0, '', 8, 14),
(95, 'This post has been removed due to abuse of site policies.', 1589789992, 29, 29, 1, 0, '', 8, 14),
(98, 'time test', 1590341425, 1, 0, 0, 0, '', 1, 14),
(99, 'time + file test', 1590341607, 1, 0, 0, 0, '', 1, 14),
(100, 'i Just read a really good article, id like to share with everybody here', 1590561897, 1, 0, 0, 0, '', 9, 11),
(107, 'New to di ting', 1591518139, 31, 0, 0, 0, '', 3, 14),
(109, 'test\r\npost', 1591704340, 1, 0, 0, 0, '', 1, 14),
(110, 'test\r\n\r\npost', 1591704483, 1, 1, 0, 0, '', 3, 14);

-- --------------------------------------------------------

--
-- Table structure for table `post_likes`
--

CREATE TABLE `post_likes` (
  `id` int(11) UNSIGNED NOT NULL,
  `post_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_likes`
--

INSERT INTO `post_likes` (`id`, `post_id`, `user_id`) VALUES
(114, 12, 8),
(163, 13, 8),
(172, 11, 8),
(175, 14, 8),
(179, 2, 8),
(619, 25, 8),
(621, 36, 8),
(626, 37, 29),
(652, 91, 29),
(653, 89, 29),
(742, 4, 1),
(762, 110, 1),
(767, 37, 1),
(768, 37, 1),
(771, 35, 1),
(772, 35, 1),
(773, 2, 1),
(774, 2, 1),
(777, 10, 1),
(778, 10, 1),
(791, 38, 1);

-- --------------------------------------------------------

--
-- Table structure for table `post_types`
--

CREATE TABLE `post_types` (
  `id` int(11) UNSIGNED NOT NULL,
  `type_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post_types`
--

INSERT INTO `post_types` (`id`, `type_name`) VALUES
(9, 'question'),
(11, 'discussion'),
(12, 'publication'),
(14, 'test');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `report_statement` varchar(400) NOT NULL,
  `date` int(64) UNSIGNED NOT NULL,
  `post_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `action` text DEFAULT NULL,
  `date_resolved` int(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `report_statement`, `date`, `post_id`, `user_id`, `action`, `date_resolved`) VALUES
(4, 'incorrect topic', 1587843726, 20, 8, 'reactivated', 1590072285),
(5, 'abusive language', 1587843726, 11, 8, 'reactivated', 1590072288),
(6, 'racial comments', 1587843726, 25, 8, 'reactivated', 1590072291),
(8, 'wrong%20topic', 1589995534, 95, 1, 'reactivated', 1590072296),
(9, 'irrelevant%20content', 1591527673, 38, 29, 'deactivated', 1591527796);

-- --------------------------------------------------------

--
-- Table structure for table `shared_posts`
--

CREATE TABLE `shared_posts` (
  `id` int(11) UNSIGNED NOT NULL,
  `date_shared` int(64) UNSIGNED NOT NULL,
  `post_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shared_posts`
--

INSERT INTO `shared_posts` (`id`, `date_shared`, `post_id`, `user_id`) VALUES
(33, 15453868, 2, 16),
(34, 158784386, 1, 16),
(36, 158788, 32, 8),
(57, 187843868, 1, 8),
(58, 158784864, 35, 8),
(94, 1590752645, 0, 1),
(133, 1591818050, 38, 1);

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id` int(11) UNSIGNED NOT NULL,
  `topic_name` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `topic_name`) VALUES
(1, 'test 1'),
(3, 'test 2'),
(4, 'virology'),
(5, 'psychology'),
(6, 'Chemistry'),
(7, 'Computer Science'),
(8, 'files test'),
(9, 'Digital Forensics');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(32) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `active` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `super` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `profileimg` varchar(255) DEFAULT NULL,
  `institution_id` int(10) UNSIGNED NOT NULL,
  `designation_id` int(10) UNSIGNED NOT NULL,
  `joined_date` int(64) UNSIGNED NOT NULL,
  `specialty` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `active`, `super`, `profileimg`, `institution_id`, `designation_id`, `joined_date`, `specialty`) VALUES
(1, 'Angelo Karugo', '$2y$10$4XmrN.p4C4tJP1qIwBXbFeIdvnIuxEY61pEF.Xz1FNb8eFex46/iG', 'hakarugo2@gmail.com', 1, 0, 'files\\\\profile\\\\img\\\\prof29.JPG', 5, 6, 1587844051, 'Computer Science'),
(8, 'Charity', '$2y$10$xsiZiO3EQeALDugyzeojeexJZe/Guhq/f2uGSQQ6zoYTZBU21IfQy', 'cwamalwa2@gmail.com', 0, 0, 'files\\\\profile\\\\img\\\\prof28.JPG', 5, 6, 1587844051, 'Literature'),
(11, 'super', '$2y$10$0m4Ixvt/Pka6wcT9pT.MBuNMmS32rQCXTSeI53hCBKKV9E7ileyIO', 'manager@project.com', 1, 1, '', 1, 1, 1587844051, ''),
(13, 'Njoki', '$2y$10$4.SDv2kuFNLjxX6l4SXoierknI2frUHHR8BEQZBSxZ63XzZLdEgA2', 'njoki@2.co', 1, 0, '', 1, 1, 1587844051, ''),
(14, 'Blue', '$2y$10$Aw2MavGQRiBxnoAmCN8lT.WhffWczIluaqt92X5TRH1d/O0CBnisS', 'blue@test.test', 1, 0, '', 1, 1, 1587844051, ''),
(15, 'White', '$2y$10$h3bW6BlvKZ/ckilFuY.dyebJyyTAnJsaPvx1y5qYVsFQMyRxrOtMm', 'white@test.test', 1, 0, '', 1, 1, 1587844051, ''),
(16, 'Pink', '$2y$10$SKHm3g8Gn7vTpEkuLgPdC.wMMLXu8wXx0vxHGtpT7FZsKc.KBhgmS', 'pink@pink.pink', 1, 0, '', 4, 5, 1587844051, ''),
(17, 'Gray', '$2y$10$gSaAU87gQOUlnnQwZ2THiOuDjTTKbvv8lSQIVz/iAHAFJzLG0Dn3q', 'gray@gray.gray', 1, 0, '', 0, 0, 1589197947, 'Culinary Arts'),
(18, 'Maroon', '$2y$10$vKLuwgRUJeiQ8c9sdJ10ku2CkbyMQI0OETsqAVyWZnSf9LbrObij.', 'maroon@maroon.maroon', 1, 0, '', 0, 0, 1589198863, 'Economics'),
(19, 'Purple', '$2y$10$fgWB6AFm6BCDPMAdkvh1POhqJiNXrjwUNMIiF.hsaFbemgNpwDI9m', 'purple@purple.purple', 1, 0, '', 0, 0, 1589198967, 'Computer Science'),
(20, 'Green', '$2y$10$euIPr40dDKNx5rtsEM4E1u6k14uMGnw3HWpn6nUFgKowb3tLKazFi', 'green@green.green', 1, 0, NULL, 0, 0, 1589203475, 'Biology'),
(21, 'Magenta', '$2y$10$HM0gNESHwyVfbCG4C8LjMOoMAEiQdEcDv6N.0HudsvdU/Nk/7fDUm', 'magenta@magenta.magenta', 1, 0, NULL, 0, 0, 1589210678, 'Ecology'),
(22, 'Navy', '$2y$10$QeotEZfAdm74Q.1dGD8IxOWo5R/FVNhLMRsVUYwMFZ3dpOQ0CnLmS', 'navy@navy.navy', 1, 0, NULL, 0, 0, 1589210842, 'Marine Biology'),
(23, 'Red', '$2y$10$QqPMvHYj4Pcpp6Yy.opCeugcRzyisjtoW8FrJwmO.jcsYrWv88N0a', 'red@red.red', 1, 0, '', 0, 0, 1589212457, 'Minerology'),
(24, 'Orange', '$2y$10$YoQkuityvv1YeoKhzyvMx.nKjjOm.dGTixXn1QM5jas2hz6a9s9Ie', 'orange@orange.orange', 1, 0, '', 0, 0, 1589212738, 'Bacteriology'),
(25, 'Yello', '$2y$10$olMslgUXmNBG.nXmYRLqX.AqeyNBdBk7EXOE/rVWkmYyDZULl1Z.i', 'yello@yello.yello', 1, 0, '', 0, 0, 1589212863, 'Mechanical Engeneering'),
(26, 'Indigo', '$2y$10$L1R1KxPna/3XV32btxhtS.jihldX9rcG6G.VxhAoWGHDTqb.ODh3G', 'indigo@indigo.indigo', 1, 0, '', 0, 0, 1589213167, 'Hospitality'),
(27, 'Violet', '$2y$10$o3/E2s1/3cOIYELG4xphyODp6v19SGdZHZt2h.6yuGI.FEqjsBt16', 'violet@violet.violet', 1, 0, '', 0, 0, 1589213240, 'Nursing'),
(28, 'Silver', '$2y$10$kluz23M4XCLPv8YHa5PMKeUAECwB9TtSLg02ILfyE64owjTEKemBm', 'silver@silver.silver', 1, 0, '', 0, 0, 1589214882, 'Astronomy'),
(29, 'Limes', '$2y$10$4VEptTngey9EiUOQU6afoOb4le4wqfCY0mIIh0ttz28RGmDAql1rK', 'lime@lime.lime', 1, 0, 'files\\\\profile\\\\img\\\\prof29.jpg', 5, 6, 1589215236, 'Literature'),
(30, 'Guava', '$2y$10$O2BsOvZe8jFAMoHNC9PhyOBhJa1E4PIj0reLM6A1bRZXAN92TjQPy', 'guava.guava@ku.ac.ke', 1, 0, '', 6, 8, 1591514534, 'Mathematics'),
(31, 'Pineapple', '$2y$10$oqTB.MsTTdLnz18RHBnT7Oy00psMRBgAJ95HqaCfPj0d7EChBpLY2', 'pineapple@pu.ac.ke', 1, 0, '', 5, 6, 1591515009, 'Mathematics'),
(32, 'Gloss', '$2y$10$siYKFhQBjueCvAck6F9dyOIapb3qtb2MiSB2..Qhf/yIvAM4FhNE.', 'gloss.gloss@usiu.ac.ke', 1, 0, '', 9, 6, 1591702042, 'Mathematics'),
(33, 'Watermelon', '$2y$10$.F/zO1.DUa7oaEkhJN7mMOtlft2EWpceJXoaVw2sIfgBYMeBRgI8.', 'watermelon@strathmore.ac.ke', 1, 0, '', 10, 6, 1591702132, 'Mathematics'),
(35, 'Mango', '$2y$10$vvsA1rCFLESdLH4v5NRK9.w5yGAcygvQvxSfgy4Ggj2wSoKyOFO8q', 'mango@jkuat.ac.ke', 1, 0, 'files\\\\profile\\\\img\\\\prof35.JPG', 7, 7, 1591702730, 'Mathematics'),
(55, 'Berry', '$2y$10$U0Qbz0AjPljaeYUNspcQUeLgo4CVcHFxynb366IdSxRKxfJ0tN7qO', 'sb30pu4176216@pu.ac.ke', 1, 0, 'files\\\\profile\\\\img\\\\prof55.JPG', 5, 6, 1592369233, 'Hospitality'),
(61, 'Cherry', '$2y$10$RW72NXq2kZxKJom96N.qyObGPnkZGUQj0H2SyT.jtnWqk.jCQDfxK', 'cherry@pu.ac.ke', 1, 0, '', 5, 6, 1592378180, 'Mathematics');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment_ratings`
--
ALTER TABLE `comment_ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `following_topics`
--
ALTER TABLE `following_topics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `institutions`
--
ALTER TABLE `institutions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_tokens`
--
ALTER TABLE `login_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `comment_id` (`comment_id`);

--
-- Indexes for table `password_tokens`
--
ALTER TABLE `password_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_types`
--
ALTER TABLE `post_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shared_posts`
--
ALTER TABLE `shared_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
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
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `comment_ratings`
--
ALTER TABLE `comment_ratings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `following_topics`
--
ALTER TABLE `following_topics`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT for table `institutions`
--
ALTER TABLE `institutions`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `login_tokens`
--
ALTER TABLE `login_tokens`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=313;

--
-- AUTO_INCREMENT for table `password_tokens`
--
ALTER TABLE `password_tokens`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=792;

--
-- AUTO_INCREMENT for table `post_types`
--
ALTER TABLE `post_types`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `shared_posts`
--
ALTER TABLE `shared_posts`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
