import { gameMap } from './map.js';
import { navigate } from './navigator.js';

navigate('WOODS-PATH1', gameMap);
console.log(gameMap);
console.log('app loaded');

function postUpdate(message) {
  const gameOutput = document.getElementById('gameOutput');
  const newMessage = document.createElement('div');
  newMessage.textContent = message;
  gameOutput.appendChild(newMessage);

  gameOutput.scrollTop = gameOutput.scrollHeight;
}

document
  .getElementById('commandInput')
  .addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const command = event.target.value;
      postUpdate('> ' + command);

      event.target.value = ''; // Clear the input field
    }
  });
postUpdate('Welcome to the game! Enter commands to play.');
