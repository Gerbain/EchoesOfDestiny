import { player } from './player.js';
import * as chars from './imports.js';
import {
  postUpdate,
  findMatch,
  findInGameMap,
  isValidOption,
  getRandomInt,
} from './utils.js';
import { gameMap } from './map.js';
import { navigate } from './navigator.js';

//const Jerry = new chars.Warrior();
const GoblinS = new chars.GoblinSoldier();
const GoblinA = new chars.GoblinArcher();
const GoblinM = new chars.GoblinSpellSlinger();
const enemies = [GoblinS, GoblinA, GoblinM];
const randomEnemyIndex = Math.floor(Math.random() * enemies.length);
const randomEnemy = enemies[randomEnemyIndex];

function appSetup() {
  postUpdate('Welcome to Echos Of Destiny');
  postUpdate("Say 'start' to begin your journey...");

  switch(getRandomInt){
    case 0:
      player.hero = new chars.Ranger();
      break;
    case 1:
      player.hero = new chars.Mage();
      break;
    case 2:
      player.hero = new chars.Warrior();
      break;
    default:
      player.hero = new chars.Warrior();
  }

  
}

function processInput(input) {
  let isValidInput = isValidOption(player.currentState, input);

  if (isValidInput || input.toUpperCase() == 'START') {
    progressStep(input);
  }
}

function progressStep(input) {
  let matchMap = findInGameMap(gameMap, input);
  switch (matchMap.type) {
    case 'start':
      processChoiceInput(input);
      break;
    case 'path':
      processPathInput(input);
      break;
    case 'area':
      processChoiceInput(input);
      break;
    case 'battle':
      processBattleInput(input);
      break;
    case undefined:
      postUpdate(
        'You are a developer-wizard in an uncoded path. DEBUG:' +
          player.currentState
      );
      break;
    default:
      postUpdate('You are confused where you are...'); //unknown state
  }
}

function handleInput(input) {
  //player.currentState = handleInput(input);
  //let match = findMatch(input);
  let matchMap = findInGameMap(gameMap, input);
  let isValidInput = isValidOption(player.currentState, input);

  if (isValidInput || input.toUpperCase() == 'START') {
    postUpdate(matchMap.description);

    if (matchMap.options) {
      postUpdate(matchMap.optionLabel);
      matchMap.options.forEach((option, index) => {
        let update = index + 1 + '. [' + option.goto + '] ' + option.label;
        postUpdate(update);
      });
    }
    postUpdate('---');

    player.currentState = matchMap.key;
    player.currentPath = matchMap;
  }

  console.log(matchMap);
  console.log(matchMap.key);
  console.log(player);
  console.log(isValidInput);
}

function processPathInput(input) {
  let matchMap = findInGameMap(gameMap, input);
  let isValidInput = isValidOption(player.currentState, input);

  /*if(isValidInput || input.toUpperCase() == "START"){
        if(player.currentTimerStart == '' && matchMap.travelTime){
            //SET TIMER START
            var start = new Date()
            var end = new Date(start.getTime() + matchMap.travelTime * 1000)
            var now = new Date();
            
            player.currentTimerStart = start;
            player.currentTimerEnd = end;
            //checkTime();
            console.log(player);
            //postUpdate('You are walking through '+matchMap.key.toLowerCase())
        }
        
        const nowVoorEcht = new Date();
        if(player.currentTimerStart != ''){
            while(nowVoorEcht >= player.currentTimerStart && nowVoorEcht <= player.currentTimerEnd){
                //kans
                var delayInMilliseconds = 5000; //1 second
                setTimeout(function() {
                    //your code to be executed after 1 second
                    console.log('travelling');
                    postUpdate('You are walking through '+matchMap.key.toLowerCase())
                }, delayInMilliseconds);
            }
        }
    }*/
  postUpdate(`You encountered a ${randomEnemy.name}, prepare yourself!`);
  setTimeout(() => {
    battle(player.hero, randomEnemy);
  }, 3000);
  setTimeout(() => {
    handleInput(input);
  }, 5000);
}

function battle(hero, opponent) {
  const heroSpeed = Math.floor(Math.random() * 21);
  const enemySpeed = Math.floor(Math.random() * 21);
  let heroTurn = false;
  let enemyTurn = false;

  // Determine who goes first based on speed
  if (heroSpeed > enemySpeed) {
    heroTurn = true;
    postUpdate('Hero goes first!');
  } else if (enemySpeed > heroSpeed) {
    enemyTurn = true;
    postUpdate('Opponent goes first!');
  } else {
    // If speeds are equal, randomly decide who goes first
    const randomTurn = Math.random() >= 0.5;
    if (randomTurn) {
      heroTurn = true;
      postUpdate('Hero goes first!');
    } else {
      enemyTurn = true;
      postUpdate('Opponent goes first!');
    }
  }

  // Battle loop
  while (hero.health > 0 && opponent.health > 0) {
    if (heroTurn) {
      // Player's turn
      postUpdate('Choose your action:');
      postUpdate('1. Normal Attack');
      postUpdate('2. Special Attack');
      postUpdate('3. Run');
      const choice = parseInt(prompt('Enter the number of your choice:'), 10);
      switch (choice) {
        case 1:
          hero.attack(opponent);
          postUpdate(`Opponent has ${opponent.health.toFixed(2)} health left.`);
          break;
        case 2:
          hero.specialAttack(opponent);
          break;
        case 3:
          postUpdate('You attempt to run from battle.');
          const runChance = Math.random();
          if (runChance <= 0.5) {
            postUpdate('You successfully run away.');
            return; // Exit battle loop
          } else {
            postUpdate('You failed to run away.');
          }
          break;
        default:
          postUpdate('Invalid choice. Defaulting to normal attack.');
          hero.normalAttack(opponent);
          break;
      }
      if (opponent.health <= 0) {
        postUpdate(
          `Opponent defeated! You gained ${opponent.experiencePoints} experience points!`
        );
        if (hero.experiencePoints >= 100) {
          postUpdate('You feel like you will be stronger next time you rest..');
        }
        hero.experiencePoints = opponent.experiencePoints;
        break;
      }
      heroTurn = false;
      enemyTurn = true;
    } else if (enemyTurn) {
      // Opponent's turn
      opponent.attack(hero);
      postUpdate(`You have ${hero.health.toFixed(2)} health left.`);
      if (hero.health <= 0) {
        postUpdate('Hero defeated! Opponent wins!');
        location.reload();
      }
      enemyTurn = false;
      heroTurn = true;
    }
  }
}

function checkTime() {
  const now = new Date();

  if (now >= player.currentTimerStart && now <= player.currentTimerEnd) {
    console.log('Now is between the start and end times.');
    return false;
  } else if (now > player.currentTimerEnd) {
    console.log('Now is after the end time.');
    return true;
  } else {
    // This case is unlikely given the setup but included for completeness
    console.log('Now is before the start time.');
    return false;
  }
  return false;
}

function processChoiceInput(input) {
  let matchMap = findInGameMap(gameMap, input);
  let isValidInput = isValidOption(player.currentState, input);

  if (isValidInput || input.toUpperCase() == 'START') {
    postUpdate(matchMap.description);

    if (matchMap.options) {
      postUpdate(matchMap.optionLabel);
      matchMap.options.forEach((option, index) => {
        let update = index + 1 + '. [' + option.goto + '] ' + option.label;
        postUpdate(update);
      });
    }
    postUpdate('---');

    player.currentState = matchMap.key;
    player.currentPath = matchMap;
  }

  console.log(matchMap);
  console.log(matchMap.key);
  console.log(player);
  console.log(isValidInput);
}

function processBattleInput(input) {
  // Keyword inputs for battle actions
}

document
  .getElementById('commandInput')
  .addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const command = event.target.value;
      postUpdate('> ' + command);
      processInput(command);
      event.target.value = ''; // Clear the input field
    }
  });

appSetup();
