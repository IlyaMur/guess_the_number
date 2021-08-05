'use strict';

// Проверяем на число
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Печатаем сообщения
function printMessage(message) {
  alert(message);
}

// Проверяем на null
function isUserAnswerNull(userGuess) {
  return userGuess === null;
}

// Принимаем ввод пользователя
function askUserInput() {
  return prompt('Угадай число от 1 до 100:');
}

// Рекурсивно проверяем, что ввёл пользователь. Возвращаем:
//    undefined - в случае null
//    число - если всё ок
function checkUserInputRecursively(userGuess) {
  if (isUserAnswerNull(userGuess)) {
    return;
  } else if (isNumber(userGuess)) {
    return userGuess;
  }

  printMessage('Введи число!');
  userGuess = askUserInput();

  checkUserInputRecursively(userGuess);
}


printMessage('Добро пожаловать в игру "Угадай число"!');

// Основная функция - загадывает число от 0 - 100.
// Рекурсивно вызывает askRecursively
function guessNumber() {
  let number = Math.ceil(Math.random() * 100);

  // Запрашивает ввод и проверяет его.
  // В случае 'cancel' завершается и говорит число.
  function askRecursively() {
    let userGuess = askUserInput();

    userGuess = checkUserInputRecursively(userGuess);

    if (!userGuess) {
      printMessage(`Игра окончена. Загаданное число было: ${number}`);
      return;
    }

    if (userGuess < number) {
      printMessage('Не угадал. Загаданное число больше');
    } else if (userGuess > number) {
      printMessage('Не угадал. Загаданное число меньше');
    } else {
      printMessage('Поздравляю, Вы угадали!!!');
      return;
    }

    askRecursively();
  }

  askRecursively();
}

guessNumber();