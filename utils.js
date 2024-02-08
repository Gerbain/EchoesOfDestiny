import { player } from './player.js';
import { gameMap } from './map.js';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export { getRandomInt };

let index = 0;
function typeCharacter(message) {
  if (index < message.length) {
    newMessage.textContent += message.charAt(index);
    index++;
    setTimeout(typeCharacter, 50);
  } else {
    const separator = document.createElement('div');
    separator.textContent = '\u00A0';
    gameOutput.appendChild(separator);
  }
}

function postUpdate(message) {
  const gameOutput = document.getElementById('gameOutput');
  const newMessage = document.createElement('div');
  newMessage.textContent = message;
  gameOutput.appendChild(newMessage);

  //typeCharacter(newMessage);

  const emptyLine = document.createElement('div');
  emptyLine.innerHTML = '&nbsp;';
  gameOutput.appendChild(emptyLine);

  gameOutput.scrollTop = gameOutput.scrollHeight;
  updateStats();
}

export { postUpdate };

function findMatch(input) {
  // v1 of match finding
  const normalizedInput = input.trim().toUpperCase();

  for (const location in gameMap) {
    if (location === normalizedInput) {
      return gameMap[location];
    }

    const options = gameMap[location].options;
    if (options.includes(normalizedInput)) {
      return { location: location, item: normalizedInput };
    }
  }
  return null;
}

export { findMatch };

function findInGameMap(map, input, parentKey = null) {
  const normalizedInput = input.trim().toLowerCase();

  for (const key in map) {
    const item = map[key];

    if (key.toLowerCase() === normalizedInput) {
      return { ...item, key, parentKey }; // Return a copy of the item with its key and parent key if applicable
    }

    if (item.options && item.options.length > 0) {
      const foundInOptions = item.options.find(
        (option) => option.label.toLowerCase() === normalizedInput
      );
      if (foundInOptions) {
        return { ...foundInOptions, parentKey: key }; // Return the found option with its parent key
      }
    }

    // If the item is an object and has nested paths (like 'WOODS'), search recursively
    if (typeof item === 'object' && !(item.options instanceof Array)) {
      const foundInNested = findInGameMap(item, input, key);
      if (foundInNested) return foundInNested;
    }
  }

  return null;
}

export { findInGameMap };

function findOptionInCurrentLocation(currentLocationKey, input) {
  const currentLocation = gameMap[currentLocationKey];
  if (!currentLocation) {
    console.log('Current location not found in the game map.');
    return null;
  }

  const normalizedInput = input.trim().toLowerCase();

  if (currentLocation.options) {
    const foundOption = currentLocation.options.find(
      (option) => option.label.toLowerCase() === normalizedInput
    );
    if (foundOption) {
      return foundOption.goto;
    }
  }

  return null;
}
export { findOptionInCurrentLocation };

function isValidOption(currentPath, userInput) {
  const currentLocation = gameMap[currentPath];

  if (currentLocation && currentLocation.options) {
    const normalizedInput = userInput.trim().toUpperCase();
    const optionMatch = currentLocation.options.find(
      (option) => option.goto === normalizedInput
    );

    if (optionMatch) {
      player.currentPath = optionMatch;
      return true;
    }
  }
  console.log(currentLocation);
  console.log(currentPath);
  console.log(userInput);
  return false;
}

export { isValidOption };

function defineFirstBlood() {
  const heroSpeed = Math.floor(Math.random() * 21);
  const enemySpeed = Math.floor(Math.random() * 21);
  let heroTurn = false;
  //let enemyTurn = false; -- obsolete, if !heroturn == enemyturn

  // Determine who goes first based on speed
  if (heroSpeed > enemySpeed) {
    heroTurn = true;
    postUpdate('Hero goes first!');
  } else if (enemySpeed > heroSpeed) {
    heroTurn = false;
    postUpdate('Opponent goes first!');
  } else {
    // If speeds are equal, randomly decide who goes first
    const randomTurn = Math.random() >= 0.5;
    if (randomTurn) {
      heroTurn = true;
      postUpdate('Hero goes first!');
    } else {
      heroTurn = false;
      postUpdate('Opponent goes first!');
    }
  }

  return { herospeed: heroSpeed, enemyspeed: enemySpeed, heroturn: heroTurn };
}
export { defineFirstBlood };

function isBattleOver(hero, opponent) {
  let result = false;
  let status = false;

  if (opponent.health <= 0) {
    player.currentState = 'idle';
    result = true;
    status = true;
  }

  if (hero.health <= 0) {
    player.currentState = 'idle';
    result = true;
    status = false;
  }

  return { result: result, status: status, hero: hero, opponent: opponent };
  // result: true battle is over, one is dead
  // status - true hero = alive, false hero = dead
}
export { isBattleOver };

function printBattleOptions(hero, opponent, battleLogic) {
  postUpdate('-------------------------------');
  postUpdate('Choose your action:');
  postUpdate('1. Normal Attack');
  postUpdate('2. Special Attack');
  postUpdate('3. Run');
  postUpdate('-------------------------------');
  player.battleState = false;

  return new Promise((resolve, reject) => {
    // Display battle options to the player
    getBattleInputLoop(hero, opponent, battleLogic)
      .then(() => {
        resolve({ result: true }); // Resolve the promise here, after getBattleInputLoop completes
      })
      .catch((error) => {
        reject(error); // In case there's an error within getBattleInputLoop
      });
  });
}
export { printBattleOptions };

function waitForInput(inputElement) {
  return new Promise((resolve) => {
    const handleInput = (event) => {
      if (event.key === 'Enter') {
        inputElement.removeEventListener('keypress', handleInput);
        resolve(inputElement.value);
        inputElement.value = '';
      }
    };
    inputElement.addEventListener('keypress', handleInput);
  });
}

// Async function containing the while loop
async function getBattleInputLoop(hero, opponent, battleLogic) {
  const inputElement = document.getElementById('commandInput');
  let continueLoop = true;
  player.battleState = false;

  while (continueLoop) {
    console.log('Waiting for input...');
    player.battleState = false;
    const userInput = await waitForInput(inputElement);
    console.log('User input:', userInput);

    switch (userInput) {
      case '1':
        hero.attack(opponent);
        postUpdate(`Opponent has ${opponent.health.toFixed(2)} health left.`);
        continueLoop = false;
        break;
      case '2':
        hero.specialAttack(opponent);
        continueLoop = false;
        break;
      case '3':
        postUpdate('You attempt to run from battle.');
        const runChance = Math.random();
        if (runChance <= 0.5) {
          postUpdate('You successfully run away.');
        } else {
          postUpdate('You failed to run away.');
        }
        continueLoop = false;
        break;
      default:
        postUpdate('Invalid choice. Defaulting to normal attack.');
        hero.normalAttack(opponent);
    }

    if (userInput.toLowerCase() === 'exit') {
      continueLoop = false;
    }

    player.battleState = true;
  }

  console.log('Exited loop');
  console.log(player.battleState);

  return true;
}

function printBattleResult(battleStatus, opponent) {
  if (battleStatus.result) {
    if (battleStatus.status) {
      postUpdate(
        `Opponent defeated! You gained ${opponent.experiencePoints} experience points!`
      );
    } else {
      postUpdate('Hero defeated! Opponent wins!');
    }
    if (player.hero.experiencePoints >= 100) {
      postUpdate('You feel like you will be stronger next time you rest..');
    }
    player.hero.experiencePoints = battleStatus.opponent.experiencePoints;
  }
}

export { printBattleResult };

function updateStats() {
  let playerStats = document.querySelector('.playerStats');
  let enemyStats = document.querySelector('.enemyStats');

  playerStats.querySelector('.job').innerHTML = player.hero.archetype;
  playerStats.querySelector('.hp').innerHTML = parseFloat(
    player.hero.health
  ).toFixed(2);
  playerStats.querySelector('.maxHp').innerHTML = parseFloat(
    player.hero.maxHealth
  ).toFixed(2);
  playerStats.querySelector('.meleeAtt').innerHTML = player.hero.melee;
  playerStats.querySelector('.magicAtt').innerHTML = player.hero.magic;
  playerStats.querySelector('.rangedAtt').innerHTML = player.hero.ranged;
  if (player.currentState == 'battle') {
    enemyStats.querySelector('.name').innerHTML = player.opponent.name;
    enemyStats.querySelector('.eHp').innerHTML = parseFloat(
      player.opponent.health
    ).toFixed(2);
    enemyStats.querySelector('.eMaxHp').innerHTML = parseFloat(
      player.opponent.maxHealth
    ).toFixed(2);
    enemyStats.querySelector('.eMeleeAtt').innerHTML = player.opponent.melee;
    enemyStats.querySelector('.eMagicAtt').innerHTML = player.opponent.magic;
    enemyStats.querySelector('.eRangedAtt').innerHTML = player.opponent.ranged;
    setInterval(() => {
      enemyStats.style.visibility = 'visible';
    }, 3000);
  } else {
    enemyStats.style.visibility = 'hidden';
  }
}
