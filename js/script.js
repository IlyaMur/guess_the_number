'use strict';

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

alert('Добро пожаловать в игру "Угадай число"!');

function guessNumber() {
  let number = Math.ceil(Math.random() * 100);

  function askRecursively() {
    let guess = prompt('Угадай число от 1 до 100:');

    if (guess === null) {
      alert(`Игра окончена. Загаданное число было: ${number}`);
      return;
    }

    function checkInputRecursively() {
      if (isNumber(guess)) { return; }
      alert('Введи число!');
      guess = prompt('Угадай число от 1 до 100:');
      checkInputRecursively();
    }

    checkInputRecursively();

    if (guess < number) {
      alert('Не угадал. Загаданное число больше');
    } else if (guess > number) {
      alert('Не угадал. Загаданное число меньше');
    } else {
      alert('Поздравляю, Вы угадали!!!');
      return;
    }

    askRecursively();
  }

  askRecursively();
}

guessNumber();