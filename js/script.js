'use strict';

// Старался сделать функции изолированными и чистыми.

// Загадываем число
function generateNumber() {
  return Math.ceil(Math.random() * 100);
}

// Проверяем на число
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Печатаем пришедшее сообщение
// Спрашиваем хотим ли играть ещё: true / false
function askConfirm(message) {
  return confirm(`${message} Хотели бы сыграть еще?`);
}

// Печатаем сообщения в окно браузера
function printMessage(message) {
  alert(message);
}

// Проверяем ввод на null (в случае нажатия 'cancel')
function isUserAnswerNull(userGuess) {
  return userGuess === null;
}

// Принимаем ввод пользователя
function askUserInput() {
  return prompt('Угадай число от 1 до 100:');
}

// Печатаем финальное сообщение
function resultMessage(number) {
  printMessage(`Игра окончена. Загаданное число было: ${number}`);
}

// Рекурсивно проверяем, что ввёл пользователь. Возвращаем:
//    undefined - в случае null (нажал 'cancel')
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

// Основная функция - загадывает число от 0 - 100 и фиксирует количество попыток.
// Вызывает askRecursively
function guessNumber() {
  let number = generateNumber();
  let counter = 10;

  // Рекурсивно запрашивает ввод и проверяет его.
  // В случае 'cancel' завершается.
  function askRecursively() {
    if (counter === 0) {
      // Хочет ли пользователь продолжить?
      if (askConfirm("Попытки закончились.")) {
        counter = 10;
        number = generateNumber();
      } else {
        // Если нет - печатаем, что игра завершена и результат
        resultMessage(number);
        return;
      }
    }

    // Принимаем ввод пользователя
    let userGuess = askUserInput();
    // -1 попытка
    counter--;

    // Проверяем ввод, в случае возвращённого undefined (нажатие 'cancel') завершаем игру
    userGuess = checkUserInputRecursively(userGuess);
    if (!userGuess) {
      // фиксируется нажатие 'cancel', выходим из рекурсии
      resultMessage(number);
      return;
    }

    if (userGuess < number) {
      printMessage(`Не угадал. Загаданное число больше. Осталось: ${counter}`);
    } else if (userGuess > number) {
      printMessage(`Не угадал. Загаданное число меньше. Осталось: ${counter}`);
    } else {
      // В случае победы печатаем сообщение и спрашиваем пользователя о продолжении.
      if (askConfirm('Поздравляю, Вы угадали!!!')) {
        // обнуляем игру
        number = generateNumber();
        counter = 10;
      } else {
        // в случае отказа выходим из рекурсии
        return;
      }
    }

    askRecursively();
  }

  askRecursively();
}

guessNumber();