-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 09, 2024 at 11:02 PM
-- Wersja serwera: 10.4.14-MariaDB
-- Wersja PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `login`
--

CREATE TABLE `login` (
  `LoginID` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`LoginID`, `email`, `password`, `name`) VALUES
(1, 'jacek@gmail.com', '$2b$10$x6sJWdudl/Sul2T95JhhDuP98aSkJbRzTBuXpmK0tHgkrSb5DrrfW', 'jacek2'),
(3, 'puma@gmail.com', '$2b$10$REc8nJlDwrfkqGIyVst3YuXeqVejF3de.A57JtOaXE9g25GVnX6Eq', 'd'),
(4, 'pumaxyt@gmail.com', '$2b$10$TJHNVyIzm.vjAVpnyDRK6eYtitvKJyJ/cI5qyBF1PM7hRN.eVj8Gm', 'kk');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `questions`
--

CREATE TABLE `questions` (
  `QuestionID` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `odpA` varchar(255) DEFAULT NULL,
  `odpB` varchar(255) DEFAULT NULL,
  `odpC` varchar(255) DEFAULT NULL,
  `odpD` varchar(255) DEFAULT NULL,
  `odpowiedz` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`QuestionID`, `content`, `odpA`, `odpB`, `odpC`, `odpD`, `odpowiedz`) VALUES
(1, 'Czym jest program komputerowy?', 'Zbiorem instrukcji, które mówią komputerowi, co ma robić', 'Zbiorem plików przechowywanych na dysku', 'Fizycznym urządzeniem', 'Żadna z powyższych', 'A'),
(3, 'Co to jest zmienna w programowaniu?', 'Stałą wartością\r\n', 'Miejscem w pamięci komputera, gdzie przechowywane są dane', 'Nazwą funkcji', 'Nazwą klasy', 'B'),
(4, 'Jaką pętlę należy wybrać, jeśli z góry znamy liczbę iteracji?', 'pętlę \'while\'', 'pętlę \'for\'', 'obie pętle są równie dobre', 'żadna z powyższych', 'B'),
(5, 'Co to jest instrukcja warunkowa?', 'Instrukcją, która wykonuje się zawsze', 'Instrukcją, która wykonuje się tylko wtedy, gdy określony warunek jest spełniony', 'Instrukcją, która wykonuje się tylko wtedy, gdy określony warunek nie jest spełniony', 'Żadna z powyższych', 'B'),
(6, 'Co to jest funkcja w programowaniu?', 'Blokiem kodu, który wykonuje określone zadanie', 'Nazwą zmiennej', 'Rodzajem pętli', 'Obiektową strukturą danych', 'A'),
(7, 'Co to jest język programowania?', 'Językiem, którym posługują się programiści podczas pisania programów komputerowych', 'Językiem naturalnym', 'Nazwą funkcji wbudowanych w system operacyjny', 'Żadna z powyższych', 'A'),
(8, 'Jakie są podstawowe typy danych w większości języków programowania?', 'Liczby całkowite, liczby zmiennoprzecinkowe, ciągi znaków, wartości logiczne', 'Tylko liczby całkowite', 'Tylko liczby zmiennoprzecinkowe', 'Tylko ciągi znaków', 'A'),
(9, 'Jakie są podstawowe operatory arytmetyczne w większości języków programowania?', '+ (dodawanie), - (odejmowanie), * (mnożenie), / (dzielenie)', 'Tylko + (dodawanie)', 'Tylko - (odejmowanie)', 'Tylko * (mnożenie)', 'A'),
(10, 'Jakie są podstawowe operatory logiczne w większości języków programowania?', 'AND, OR, NOT', 'TYLKO AND', 'TYLKO OR', 'TYLKO NOT', 'A'),
(11, 'Co to jest tablica w programowaniu?', 'Strukturą danych przechowującą elementy o takim samym typie', 'Nazwą funkcji', 'Rodzajem pętli', 'Instrukcją warunkową', 'A'),
(12, 'Co to jest indeks w tablicy?', 'Numerem określającym położenie elementu w tablicy', 'Typem danych elementów w tablicy', 'Nazwą zmiennej', 'Nazwą funkcji', 'A'),
(13, 'Jakie są podstawowe operatory porównania w większości języków programowania?', '== (równa się), != (różne od), < (mniejsze niż), > (większe niż), <= (mniejsze lub równe), >= (większe lub równe)', 'Tylko == (równa się)', 'Tylko != (różne od)', 'Tylko < (mniejsze niż)', 'A'),
(14, 'Co to jest pętla \'for\'?', 'Pętlą, która wykonuje się określoną liczbę razy', 'Pętlą, która wykonuje się dopóki określony warunek jest spełniony', 'Pętlą, która wykonuje się dopóki określony warunek nie jest spełniony', 'Żadna z powyższych', 'A'),
(15, 'Co to jest pętla \'while\'?', 'Pętlą, która wykonuje się określoną liczbę razy', 'Pętlą, która wykonuje się dopóki określony warunek jest spełniony', 'Pętlą, która wykonuje się dopóki określony warunek nie jest spełniony', 'Żadna z powyższych', 'B'),
(16, 'Co to jest instrukcja \'if\'?', 'Instrukcją, która wykonuje się zawsze', 'Instrukcją, która wykonuje się tylko wtedy, gdy określony warunek jest spełniony', 'Instrukcją, która wykonuje się tylko wtedy, gdy określony warunek nie jest spełniony', 'Żadna z powyższych', 'B'),
(17, 'Co to jest instrukcja \'if-else\'?', 'Instrukcją, która wykonuje się zawsze', 'Instrukcją, która wykonuje się tylko wtedy, gdy określony warunek jest spełniony', 'Instrukcją, która wykonuje się tylko wtedy, gdy określony warunek nie jest spełniony', 'Instrukcją, która wykonuje się zawsze, jeśli warunek z instrukcji if nie jest spełniony', 'D'),
(18, 'Co to jest funkcja w programowaniu?', 'Blokiem kodu, który wykonuje określone zadanie', 'Nazwą zmiennej', 'Rodzajem pętli', 'Obiektową strukturą danych', 'A'),
(19, 'Co to jest zasięg zmiennej?', 'Obszarem kodu, w którym zmienna jest dostępna', 'Typem danych zmiennej', 'Rodzajem pętli', 'Nazwą funkcji', 'A'),
(20, 'Co to jest debugowanie?', 'Procesem znajdowania i usuwania błędów w programie komputerowym', 'Procesem znajdowania i usuwania błędów w programie komputerowym', 'Procesem kompilacji programu', 'Procesem optymalizacji programu', 'A'),
(21, 'Co to jest IDE?', 'Środowiskiem programistycznym', 'Nazwą funkcji wbudowanej w język programowania', 'Nazwą pętli', 'Nazwą operatora', 'A'),
(22, 'Jakie są podstawowe typy danych liczbowych?', 'Liczby całkowite (integers), liczby zmiennoprzecinkowe (floats)', 'Tylko liczby całkowite (integers)', 'Tylko liczby zmiennoprzecinkowe (floats)', 'Tylko liczby zespolone (complex numbers)', 'A'),
(23, 'Co to jest pętla \'do-while\'?', 'Pętlą, która wykonuje się określoną liczbę razy', 'Pętlą, która wykonuje się dopóki określony warunek jest spełniony', 'Pętlą, która wykonuje się dopóki określony warunek nie jest spełniony', 'Pętlą, która wykonuje się przynajmniej raz, a następnie sprawdza warunek', 'D'),
(24, 'Jakie są podstawowe operacje na ciągach znaków?', 'Konkatenacja, wyszukiwanie, zamiana', 'Tylko konkatenacja', 'Tylko wyszukiwanie', 'Tylko zamiana', 'A'),
(25, 'Co to jest operator konkatenacji?', 'Operatorem łączącym dwa ciągi znaków w jeden', 'Operatorem arytmetycznym', 'Operatorem porównania', 'Operatorem logicznym', 'A'),
(26, 'Co to jest deklaracja zmiennej?', 'Instrukcją, która zmienia wartość zmiennej', 'Instrukcją, która inicjalizuje zmienną', 'Instrukcją, która wyświetla wartość zmiennej na ekranie', 'Instrukcją, która usuwa zmienną z pamięci', 'B'),
(27, 'Co to jest instrukcja elif?', 'Skrótem od else if, służy do dodania kolejnych warunków do instrukcji warunkowej if-else', 'Instrukcją, która wykonuje się zawsze', 'Instrukcją, która wykonuje się tylko wtedy, gdy określony warunek jest spełniony', 'Instrukcją, która wykonuje się zawsze, jeśli warunek z instrukcji \'if\' nie jest spełniony', 'A'),
(28, 'Co to jest operator modulo?', 'Operatorem dający resztę z dzielenia dwóch liczb', 'Operatorem wykonującym dzielenie całkowite', 'Operatorem porównania', 'Operatorem logicznym', 'A'),
(29, 'Co to jest typ danych logicznych?', 'Typ danych przechowujący wartości `True` lub `False`', 'Typ danych przechowujący liczby całkowite', 'Typ danych przechowujący liczby zmiennoprzecinkowe', 'Typ danych przechowujący ciągi znaków', 'A'),
(30, 'Co to jest operator logiczny \'and\'?', 'Operator łączący dwa warunki, zwraca True tylko wtedy, gdy oba warunki są spełnione', 'Operator łączący dwa warunki, zwraca True jeśli przynajmniej jeden z warunków jest spełniony', 'Operator negacji', 'Operator różnicy', 'A'),
(31, 'Co to jest operator logiczny \"or\"?', 'Operator łączący dwa warunki, zwraca True tylko wtedy, gdy oba warunki są spełnione', 'Operator łączący dwa warunki, zwraca True jeśli przynajmniej jeden z warunków jest spełniony', 'Operator negacji', 'Operator różnicy', 'B'),
(32, 'Co to jest operator logiczny \'not\'?', 'Operator łączący dwa warunki, zwraca True tylko wtedy, gdy oba warunki są spełnione', 'Operator łączący dwa warunki, zwraca True jeśli przynajmniej jeden z warunków jest spełniony', 'Operator negacji, zwraca wartość przeciwną do podanego warunku', 'Operator różnicy', 'C'),
(33, 'Co to jest operator przypisania?', 'Operator, który nadaje wartość zmiennej', 'Operator, który porównuje wartości', 'Operator, który wykonuje operację modulo', 'Operator, który wykonuje operację dzielenia', 'A'),
(34, 'Co to jest operator równości?', 'Operator, który nadaje wartość zmiennej', 'Operator, który porównuje wartości', 'Operator, który wykonuje operację modulo', 'Operator, który wykonuje operację dzielenia', 'B'),
(35, 'Co to jest operator różności?', 'Operator, który nadaje wartość zmiennej', 'Operator, który porównuje wartości', 'Operator, który wykonuje operację modulo', 'Operator, który wykonuje operację dzielenia', 'B'),
(36, 'Co to jest operator relacyjny?', 'Operator, który nadaje wartość zmiennej', 'Operator, który porównuje wartości', 'Operator, który wykonuje operację modulo', 'Operator, który wykonuje operację dzielenia', 'B'),
(37, 'Co to jest operator inkrementacji?', 'Operator, który zwiększa wartość zmiennej o 1', 'Operator, który zmniejsza wartość zmiennej o 1', 'Operator, który zmienia znak zmiennej', 'Operator, który zmienia typ danych zmiennej', 'A'),
(38, 'Co to jest operator dekrementacji?', 'Operator, który zwiększa wartość zmiennej o 1', 'Operator, który zmniejsza wartość zmiennej o 1', 'Operator, który zmienia znak zmiennej', 'Operator, który zmienia typ danych zmiennej', 'B'),
(39, 'Co to jest typ danych tekstowych?', 'Typ danych przechowujący wartości logiczne', 'Typ danych przechowujący liczby całkowite', 'Typ danych przechowujący liczby zmiennoprzecinkowe', 'Typ danych przechowujący ciągi znaków', 'D'),
(40, 'Co to jest operator \'+=\'?', 'Operator, który dodaje wartość do zmiennej', 'Operator, który odejmuje wartość od zmiennej', 'Operator, który mnoży wartość zmiennej', 'Operator, który dzieli wartość zmiennej', 'A'),
(41, 'Co to jest operator \'-=\'?', 'Operator, który dodaje wartość do zmiennej', 'Operator, który odejmuje wartość od zmiennej', 'Operator, który mnoży wartość zmiennej', 'Operator, który dzieli wartość zmiennej', 'B');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `scoreboard`
--

CREATE TABLE `scoreboard` (
  `id` int(11) NOT NULL,
  `id_login` int(11) NOT NULL,
  `wynik` int(11) NOT NULL,
  `czas` int(11) DEFAULT NULL,
  `termin` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scoreboard`
--

INSERT INTO `scoreboard` (`id`, `id_login`, `wynik`, `czas`, `termin`) VALUES
(14, 4, 4, 12, '2023-04-2TASD'),
(15, 4, 6, 12, '2024-06-08'),
(16, 4, 1, 8, '2024-06-08');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `wynik` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`LoginID`);

--
-- Indeksy dla tabeli `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`QuestionID`);

--
-- Indeksy dla tabeli `scoreboard`
--
ALTER TABLE `scoreboard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_login` (`id_login`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `LoginID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `QuestionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `scoreboard`
--
ALTER TABLE `scoreboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `scoreboard`
--
ALTER TABLE `scoreboard`
  ADD CONSTRAINT `scoreboard_ibfk_1` FOREIGN KEY (`id_login`) REFERENCES `login` (`LoginID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
