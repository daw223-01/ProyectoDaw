-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 22-05-2023 a las 11:30:09
-- Versión del servidor: 8.0.32
-- Versión de PHP: 8.1.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectonow`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20230502164904', '2023-05-08 14:57:53', 535),
('DoctrineMigrations\\Version20230508165531', '2023-05-10 20:24:10', 581);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id` int NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grupo_muscular` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url_video` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id`, `nombre`, `grupo_muscular`, `descripcion`, `url_video`, `url_img`) VALUES
(77, 'Press de Banca con Barra', 'Pectorales, triceps, hombros', 'Acostado en un banco, levantar y bajar una barra con pesos sobre el pecho', 'http://player.vimeo.com/external/160273318.hd.mp4?s=3e7adc31c89a4644e9bf80762e88ccefa2706e91&profile_id=119&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/8.jpg'),
(78, 'Press de Banca con Mancuernas', 'Pectorales, triceps, hombros', 'Acostado en un banco, levantar y bajar mancuernas con pesos sobre el pecho', 'http://player.vimeo.com/external/160273508.sd.mp4?s=bb95a6c2f950643c4db09cf1a3b5a37c02fd5997&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/104.jpg'),
(79, 'Press de Banca Inclinado con Barra', 'Pectorales superiores, hombros, triceps', 'Acostado en un banco inclinado, levantar y bajar una barra con pesos sobre el pecho', 'http://player.vimeo.com/external/160273320.sd.mp4?s=c17388d80594645f0de07def80a236e2c08bd004&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/33.jpg'),
(80, 'Press de Banca Inclinado con Mancuernas', 'Pectorales superiores, hombros, triceps', 'Acostado en un banco inclinado, levantar y bajar mancuernas con pesos sobre el pecho', 'http://player.vimeo.com/external/160273517.hd.mp4?s=2b836cc3008f7aef9323ca41f9c88fe7b5e5de54&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/124.jpg'),
(81, 'Press de Banca Declinado con Barra', 'Pectorales inferiores, triceps', 'Acostado en un banco declinado, levantar y bajar una barra con pesos sobre el pecho', 'http://player.vimeo.com/external/160273321.hd.mp4?s=43decc4f7d3f4921e5f438d2affbd45f283b417c&profile_id=119&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/20.jpg'),
(82, 'Press de Banca Declinado con Mancuernas', 'Pectorales inferiores, triceps', 'Acostado en un banco declinado, levantar y bajar mancuernas con pesos sobre el pecho', 'http://player.vimeo.com/external/160429576.sd.mp4?s=823922f9626fcca62c00fb6dd1be19fba68b14fc&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/2844.jpg'),
(83, 'Aperturas con Mancuernas', 'Pectorales, hombros', 'Acostado en un banco, levantar y bajar mancuernas hacia los lados del pecho', 'http://player.vimeo.com/external/160273568.hd.mp4?s=af8267536c67af15b002909eac50d4d8aa332aa8&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/165.jpg'),
(84, 'Aperturas con Cable Cruzado', 'Pectorales', 'Sostener cables en cada mano, juntar y separar los brazos cruzando frente al cuerpo', 'http://player.vimeo.com/external/160273327.sd.mp4?s=919d9016fc451528417c4dd8fc94ba29f82ba7d4&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/61.jpg'),
(85, 'Flexiones', 'Pectorales, triceps, hombros', 'Empujar el cuerpo hacia arriba y hacia abajo usando los brazos y el pecho', 'http://player.vimeo.com/external/160273558.sd.mp4?s=f7476b3ed07a466c4178f2c4262213e69c70de2d&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/188.jpg'),
(86, 'Maquina de Press de Pecho', 'Pectorales, hombros, triceps', 'Sentado en una maquina, empujar una barra hacia adelante con los brazos', 'http://player.vimeo.com/external/160305270.hd.mp4?s=7d4394d6ff0ad800af235eafd5a17bbc7467abe0&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/3409.jpg'),
(87, 'Extensiones de Triceps con Mancuernas', 'Triceps braquial, deltoides anterior', 'Acostado en un banco, sosten las mancuernas sobre tu cabeza y extiende los brazos hacia arriba y hacia atras, manteniendo los codos cerca de las orejas.', 'http://player.vimeo.com/external/160280155.sd.mp4?s=036946ca37e2b59e88e91e17aa080dd7bcaf8388&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/920.jpg'),
(88, 'Extensiones de Triceps en Polea Alta', 'Triceps braquial, deltoides posterior', 'Parate frente a una polea alta con un agarre en V, extiende los brazos hacia abajo hasta que las manos esten a la altura de tus muslos y luego regresa lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160307183.hd.mp4?s=72dc0c92fce4a874374ce1fb4365b7d387638332&profile_id=119&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/4681.jpg'),
(89, 'Press Frances con Barra EZ', 'Triceps braquial, deltoides anterior', 'Acostado en un banco, sosten una barra EZ con las manos en un agarre cerrado y baja la barra hacia tu frente, doblando los codos. Luego, extiende los brazos hacia arriba.', 'http://player.vimeo.com/external/160307395.sd.mp4?s=34feaa011bb195eea068fd52d75a71e09c53bea1&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/5265.jpg'),
(90, 'Patada de Triceps', 'Triceps braquial, deltoides posterior', 'Sosten una mancuerna en una mano y apoya la otra mano y la rodilla en un banco. Luego, levanta la mancuerna hacia atras, manteniendo el codo pegado al cuerpo, y luego extiende el brazo hacia arriba.', 'http://player.vimeo.com/external/160305160.sd.mp4?s=b5d1146cf926d4a79215639206d4a49f4b3d9b80&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/3112.jpg'),
(91, 'Fondos en Paralelas', 'Triceps braquial, deltoides anterior', 'Coloca tus manos en dos barras paralelas detras de tu cuerpo y levanta tu cuerpo hasta que los brazos esten completamente extendidos. Luego, baja el cuerpo hacia abajo doblando los codos.', 'http://player.vimeo.com/external/160273502.hd.mp4?s=4ac632034a18b87a4a5f1213d6de4a48d8d7d2ba&profile_id=119&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/97.jpg'),
(92, 'Fondos en Banco', 'Triceps braquial', 'Coloca tus manos en un banco detrás de ti, flexionando los codos para subir y bajar el cuerpo', 'http://player.vimeo.com/external/160307217.hd.mp4?s=16fa950595996416c7ecf253863c4c9fde2dcbaf&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/4757.jpg'),
(93, 'Extensiones de Triceps con Cuerda', 'Triceps braquial, deltoides posterior', 'Parate frente a una polea alta con una cuerda sujeta a la polea. Luego, agarra la cuerda con ambas manos y extiende los brazos hacia abajo, manteniendo los codos cerca del cuerpo.', 'http://player.vimeo.com/external/160273825.hd.mp4?s=2d97fa7849c24e90639410612beed22c5ee524d6&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/637.jpg'),
(94, 'Curl de Biceps con Barra', 'Biceps braquial, braquial anterior', 'Sosten una barra con un agarre supino (palmas hacia arriba) y levanta la barra hacia tus hombros doblando los codos. Luego, baja la barra lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160273651.sd.mp4?s=7429bf5de1242b5fa2773d78add5ec4ac89cbbd2&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/449.jpg'),
(95, 'Curl de Biceps con Mancuernas', 'Biceps braquial, braquial anterior', 'Sosten una mancuerna en cada mano y levanta las mancuernas hacia tus hombros doblando los codos. Luego, baja las mancuernas lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160273675.sd.mp4?s=1b6d063efd6bc854910b3b431d0e5ea8c549a07c&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/465.jpg'),
(96, 'Curl de Biceps con Mancuerna Martillo', 'Biceps braquial, braquial anterior, braquiorradial', 'Sosten una mancuerna en cada mano con un agarre martillo (palmas hacia dentro) y levanta las mancuernas hacia tus hombros doblando los codos. Luego, baja las mancuernas lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160273679.sd.mp4?s=850352a028b6a1e4f1ec755e63265cca51d5fc9b&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/457.jpg'),
(97, 'Curl de Biceps en Banco Scott', 'Biceps braquial, braquial anterior', 'Sientate en un banco Scott con los brazos apoyados en el cojin. Luego, sosten una barra con un agarre supino (palmas hacia arriba) y levanta la barra hacia tus hombros doblando los codos. Luego, baja la barra lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160280808.hd.mp4?s=e6ea03d672c2bcd3f4cf7ff19e1b150c5cbc699f&profile_id=119&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/1084.jpg'),
(98, 'Curl de Biceps en Polea Baja', 'Biceps braquial, braquial anterior', 'Parate frente a una maquina de poleas baja con una barra sujeta a la polea. Luego, agarra la barra con un agarre supino (palmas hacia arriba) y levanta la barra hacia tus hombros doblando los codos. Luego, baja la barra lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160306922.sd.mp4?s=a197353726ea7ed456e11e96000ed498d8357138&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/4061.jpg'),
(99, 'Press Militar', 'Deltoides anterior, deltoides medio, trapecio, triceps, serrato anterior', 'De pie, sosten una barra con un agarre amplio y levanta la barra sobre la cabeza hasta que los brazos esten extendidos. Luego, baja la barra lentamente hacia los hombros.', 'http://player.vimeo.com/external/160281270.hd.mp4?s=78002fc3f7d5ebf40c962915c4c4cb47b0f4cf54&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/1813.jpg'),
(100, 'Elevaciones Laterales', 'Deltoides medio, trapecio, serrato anterior', 'Sosten una mancuerna en cada mano y levanta las mancuernas hacia los lados hasta que esten a la altura de los hombros. Luego, baja las mancuernas lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160273534.hd.mp4?s=cc57fecf891f8d8e53a6db4dcd625790e44d0e33&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/129.jpg'),
(101, 'Elevaciones Frontales', 'Deltoides anterior, deltoides medio, trapecio, serrato anterior', 'Sosten una mancuerna en cada mano con un agarre supino (palmas hacia arriba) y levanta las mancuernas hacia adelante hasta que esten a la altura de los hombros. Luego, baja las mancuernas lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160281123.sd.mp4?s=230705a84cfe416e7d2b510502580d33e2da636f&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/1653.jpg'),
(102, 'Remo al Menton', 'Deltoides anterior, deltoides medio, trapecio, biceps', 'De pie, sosten una barra con un agarre estrecho y levanta la barra hacia la barbilla hasta que los codos esten alineados con los hombros. Luego, baja la barra lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160307119.hd.mp4?s=cb204a5b611190ae573950a6b01980f38dd77a36&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/4541.jpg'),
(103, 'Pajaros', 'Deltoides posterior, trapecio, romboides', 'Sosten una mancuerna en cada mano y dobla la cintura hacia adelante. Luego, levanta las mancuernas hacia los lados hasta que esten a la altura de los hombros. Luego, baja las mancuernas lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160307069.sd.mp4?s=27009c921eba112ed6e1dbf69e8809c5a2e01210&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/4429.jpg'),
(104, 'Elevaciones Laterales Inclinadas', 'Deltoides medio, deltoides posterior, trapecio, serrato anterior', 'Sosten una mancuerna en cada mano y inclinate hacia adelante. Luego, levanta las mancuernas hacia los lados hasta que esten a la altura de los hombros. Luego, baja las mancuernas lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160273506.sd.mp4?s=2c0dfab6705bdffebdeaa076fb6b867e10371042&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/109.jpg'),
(105, 'Press de Hombros con Mancuernas', 'Deltoides anterior, deltoides medio, trapecio, triceps, serrato anterior', 'De pie, sosten una mancuerna en cada mano y levanta las mancuernas sobre la cabeza hasta que los brazos esten extendidos. Luego, baja las mancuernas lentamente hacia los hombros.', 'http://player.vimeo.com/external/160273566.hd.mp4?s=7f24c2827f193514c8b605159a173812cb8e3ff6&profile_id=119&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/193.jpg'),
(106, 'Remo con Barra', 'Dorsales, trapecio, biceps', 'De pie, sosten una barra con un agarre amplio y levanta la barra hacia el pecho, manteniendo los codos cerca del cuerpo. Luego, baja la barra lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160273330.sd.mp4?s=6efc4741b1382dcac67ef9275db2760aa68df3bc&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/13.jpg'),
(107, 'Remo con Mancuernas', 'Dorsales, trapecio, biceps', 'Con una mancuerna en cada mano, inclinate hacia adelante y manten la espalda recta. Luego, levanta las mancuernas hacia el pecho, manteniendo los codos cerca del cuerpo. Luego, baja las mancuernas lentamente a la posicion inicial.', 'http://player.vimeo.com/external/160273622.sd.mp4?s=fac0edc3d0bbd46d625b362f2d3181a6add39ac0&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/353.jpg'),
(108, 'Dominadas', 'Dorsales, trapecio, biceps, antebrazos', 'Agarrate de una barra con un agarre amplio y levanta el cuerpo hasta que el menton este por encima de la barra. Luego, baja lentamente el cuerpo a la posicion inicial.', 'http://player.vimeo.com/external/160305245.sd.mp4?s=74d3cde2daf9a2d98033c9725ab6fef9f5d93ec5&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/3337.jpg'),
(109, 'Peso Muerto', 'Dorsales, trapecio, gluteos, isquiotibiales, cuadriceps', 'De pie, sosten una barra con un agarre amplio y levanta la barra hasta que los brazos esten extendidos. Luego, baja la barra lentamente al suelo.', 'http://player.vimeo.com/external/160296135.hd.mp4?s=9c3dfef0dca10930d4ce1d5a43f0a5ee86c7012c&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/1880.jpg'),
(110, 'Remo con Cable', 'Dorsales, trapecio, biceps', 'Parate frente a una maquina de poleas con un agarre en la polea. Luego, tira del cable hacia el cuerpo, manteniendo los codos cerca del cuerpo. Luego, suelta lentamente el cable a la posicion inicial.', 'http://player.vimeo.com/external/160305217.sd.mp4?s=8e91b00313bd1225e7299e6b91ba786aaf97bf95&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/3265.jpg'),
(111, 'Pulldowns con Barra', 'Dorsales, trapecio, biceps', 'Sentado en una maquina de poleas, sosten una barra con un agarre amplio y tira de la barra hacia el pecho, manteniendo los codos cerca del cuerpo. Luego, suelta lentamente la barra a la posicion inicial.', 'http://player.vimeo.com/external/160273609.hd.mp4?s=6e691bd51b76c302e70b7fe1f50d2a36f8c6879f&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/345.jpg'),
(112, 'Remo con Mancuerna Unilateral', 'Dorsales, trapecio, biceps', 'Con una mancuerna en una mano, inclinate hacia adelante y manten la espalda recta. Luego, levanta la mancuerna hacia el pecho, manteniendo el codo cerca del cuerpo. Luego, baja la mancuerna lentamente a la posicion inicial. Repite con la otra mano.', 'http://player.vimeo.com/external/160273624.hd.mp4?s=a75341ef11f1ce532fc13ae804dfb3f63caf0ead&profile_id=119&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/361.jpg'),
(113, 'Sentadilla con Barra', 'Cuadriceps, gluteos, isquiotibiales', 'De pie, sosten una barra con un agarre amplio y baja lentamente el cuerpo hacia abajo, doblando las rodillas. Luego, levanta lentamente el cuerpo de vuelta a la posicion inicial.', 'http://player.vimeo.com/external/160296157.sd.mp4?s=c3a344fa55949a1a63482c0a1cbecadc94427032&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/3653.jpg'),
(114, 'Prensa de Piernas', 'Cuadriceps, gluteos, isquiotibiales', 'Sentado en una maquina de prensa de piernas, empuja la plataforma hacia arriba y baja lentamente la plataforma hacia abajo.', 'http://player.vimeo.com/external/160273702.sd.mp4?s=01c5507cef23a610e0a837f52bf34bb7c74847e5&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/5008.jpg'),
(115, 'Zancadas con Mancuernas', 'Cuadriceps, gluteos, isquiotibiales', 'Con una mancuerna en cada mano, da un gran paso hacia adelante y baja lentamente el cuerpo hacia abajo, doblando ambas rodillas. Luego, levanta lentamente el cuerpo de vuelta a la posicion inicial.', 'http://player.vimeo.com/external/160273699.sd.mp4?s=0e8b0a50d9542520c6df0d7de2a78bf301e10405&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/545.jpg'),
(116, 'Extension de Piernas', 'Cuadriceps', 'Sentado en una maquina de extension de piernas, levanta lentamente las piernas hacia arriba y baja lentamente las piernas hacia abajo.', 'http://player.vimeo.com/external/160273716.sd.mp4?s=a6d3f488af208405ea0c437b68a8fb2ffe690ece&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/521.jpg'),
(117, 'Sentadilla con Mancuernas', 'Cuadriceps, gluteos, isquiotibiales', 'Con una mancuerna en cada mano, baja lentamente el cuerpo hacia abajo, doblando las rodillas. Luego, levanta lentamente el cuerpo de vuelta a la posicion inicial.', 'http://player.vimeo.com/external/160273709.hd.mp4?s=3af87022ffb3e4d491eb11a4c94c19dde0fb40b0&profile_id=119&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/525.jpg'),
(118, 'Sentadilla Bulgara', 'Cuadriceps, gluteos, isquiotibiales', 'Con una pierna apoyada sobre una banqueta o plataforma detras de ti, baja lentamente el cuerpo hacia abajo, doblando la rodilla opuesta. Luego, levanta lentamente el cuerpo de vuelta a la posicion inicial. Repite con la otra pierna.', 'http://player.vimeo.com/external/160273819.hd.mp4?s=5f004fecf5d50166a79669145f7d7269756716e7&profile_id=119&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/821.jpg'),
(119, 'Curl de Piernas en Maquina', 'Isquiotibiales', 'Sentado en una maquina de curl de piernas, levanta lentamente tus piernas hacia tus gluteos y baja lentamente las piernas hacia abajo.', 'https://player.vimeo.com/external/162771849.sd.mp4?s=a4e5cdcb7e9ce11380cdb59028a8056cdeb4eca2&profile_id=165', 'https://www.jefit.com/images/exercises/1080_664/645.jpg'),
(120, 'Elevaciones de Cadera', 'Isquiotibiales, gluteos', 'Acuestate boca arriba con las rodillas dobladas y los pies apoyados en el suelo. Levanta lentamente las caderas hacia arriba y baja lentamente las caderas hacia abajo.', 'http://player.vimeo.com/external/160281067.sd.mp4?s=8a9f3d7105348aac826f162c0c4c74c12d3e7f8d&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/1545.jpg'),
(121, 'Elevacion de talon', 'Gastrocnemio, soleo, gemelo', 'De pie, eleva los talones para contraer los musculos de la pantorrilla.', 'http://player.vimeo.com/external/160307275.hd.mp4?s=e60dcc5494d72b26197caa751959081fc0d72eb8&profile_id=119&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/4909.jpg'),
(122, 'Elevacion de talon con barra', 'Gastrocnemio, soleo, gemelo', 'De pie con una barra colocada en los hombros, eleva los talones para contraer los musculos de la pantorrilla.', 'http://player.vimeo.com/external/160273705.hd.mp4?s=e72d86a962ab5248f11f8c736a6139d6ec8e4d35&profile_id=113&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/573.jpg'),
(123, 'Elevacion de talon sentado', 'Gastrocnemio, soleo, gemelo', 'Sentado en una maquina de prensa de piernas, eleva los talones para contraer los musculos de la pantorrilla.', 'http://player.vimeo.com/external/160273710.sd.mp4?s=5a85929fea62b32c0566dd865a84f44c431fe28f&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/557.jpg'),
(124, 'Elevacion de talon unilateral', 'Gastrocnemio, soleo, gemelo', 'De pie, eleva un talon a la vez para contraer los musculos de la pantorrilla.', 'http://player.vimeo.com/external/160307288.sd.mp4?s=84d918228c2b5c9c7edf2520276051fde271ff8f&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/4945.jpg'),
(125, 'Elevacion de talon con banda de resistencia', 'Gastrocnemio, soleo, gemelo', 'De pie con una banda de resistencia debajo de los pies, eleva los talones para contraer los musculos de la pantorrilla.', 'http://player.vimeo.com/external/160280869.sd.mp4?s=144cd46d2ebb42dfb2986c0378e2fd816cc0827d&profile_id=165&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/1149.jpg'),
(126, 'Comba', 'Gastrocnemio, soleo, gemelo, cardio', 'Con una cuerda, hacer saltos sobre ella apoyando el peso, en la caida, sobre la puntera de los pies', '', 'https://www.jefit.com/images/exercises/1080_664/3708.jpg'),
(127, 'Running', 'Cardio', 'Posibilidad de hacerse tanto indoor como aoutdoor, realizar una carrera a ritmo constante o diferentes ritmos, aplicando si fuese necesario desniveles en el terreno', '', 'https://www.jefit.com/images/exercises/1080_664/1268.jpg'),
(128, 'Remo', 'Cardio', 'En la máquina de remo, flexionar las rodillas hasta llevarlas al pecho y estirarlas posteriormente mientras se flexionan los codos llevando la barra al pectoral', 'http://player.vimeo.com/external/160280854.sd.mp4?s=0d8ba544914abbcb9289f706885898f6571caed8&profile_id=164&oauth2_token_id=435967617', 'https://www.jefit.com/images/exercises/1080_664/1265.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messenger_messages`
--

CREATE TABLE `messenger_messages` (
  `id` bigint NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `available_at` datetime NOT NULL,
  `delivered_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutinas`
--

CREATE TABLE `rutinas` (
  `id` int NOT NULL,
  `id_usuario_id` int NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rutinas`
--

INSERT INTO `rutinas` (`id`, `id_usuario_id`, `nombre`) VALUES
(12, 3, 'Rutina1'),
(13, 3, 'Pierna');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutinas_ejercicios`
--

CREATE TABLE `rutinas_ejercicios` (
  `id` int NOT NULL,
  `id_rutina_id` int NOT NULL,
  `id_ejercicio_id` int NOT NULL,
  `rondas` int DEFAULT NULL,
  `tiempo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `repeticiones` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rutinas_ejercicios`
--

INSERT INTO `rutinas_ejercicios` (`id`, `id_rutina_id`, `id_ejercicio_id`, `rondas`, `tiempo`, `repeticiones`) VALUES
(13, 12, 77, 0, '0', 0),
(14, 13, 78, 0, '0', 0),
(18, 12, 78, 0, '0', 0),
(19, 12, 100, 0, '0', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contraseña` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `progreso` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `contraseña`, `username`, `progreso`) VALUES
(3, 'Raulbs11', 'Raulbs11', 'raul@raul.com', '123', 'Raulbs11', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `messenger_messages`
--
ALTER TABLE `messenger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  ADD KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  ADD KEY `IDX_75EA56E016BA31DB` (`delivered_at`);

--
-- Indices de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_ABE0C27EB2C349` (`id_usuario_id`);

--
-- Indices de la tabla `rutinas_ejercicios`
--
ALTER TABLE `rutinas_ejercicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_6AD62048579D33EC` (`id_rutina_id`),
  ADD KEY `IDX_6AD6204813487F0F` (`id_ejercicio_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT de la tabla `messenger_messages`
--
ALTER TABLE `messenger_messages`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `rutinas_ejercicios`
--
ALTER TABLE `rutinas_ejercicios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD CONSTRAINT `FK_ABE0C27EB2C349` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `rutinas_ejercicios`
--
ALTER TABLE `rutinas_ejercicios`
  ADD CONSTRAINT `FK_6AD6204813487F0F` FOREIGN KEY (`id_ejercicio_id`) REFERENCES `ejercicios` (`id`),
  ADD CONSTRAINT `FK_6AD62048579D33EC` FOREIGN KEY (`id_rutina_id`) REFERENCES `rutinas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
