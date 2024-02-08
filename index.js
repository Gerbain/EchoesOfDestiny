import { player } from './player.js';
import * as chars from './imports.js';
import {
  postUpdate,
  findMatch,
  findInGameMap,
  isValidOption,
  getRandomInt,
  defineFirstBlood,
  isBattleOver,
  printBattleResult,
  printBattleOptions,
} from './utils.js';
import { gameMap } from './map.js';
import { navigate } from './navigator.js';

function enemyGenerator() {
  const GoblinS = new chars.GoblinSoldier();
  const GoblinA = new chars.GoblinArcher();
  const GoblinM = new chars.GoblinSpellSlinger();
  const enemies = [GoblinS, GoblinA, GoblinM];
  const randomEnemyIndex = getRandomInt(enemies.length);
  return enemies[randomEnemyIndex];
}

const randomEnemy = enemyGenerator();

function appSetup() {
  postUpdate('Welcome to Echoes Of Destiny, ');
  postUpdate("Say 'start' to begin your journey...");

  switch (getRandomInt(3)) {
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

  postUpdate('Your adventure as a ' + player.hero.archetype + ' begins..');
}

function validateDesiredPath(input) {
  const isValidInput = isValidOption(player.currentPath, input);
  const matchMap = findInGameMap(gameMap, input);

  if (input.toUpperCase() == 'START') {
    return true;
  } else if (isValidInput && matchMap != null) {
    return true;
  }
  return false;
}

function processInput(input) {
  if (validateDesiredPath(input)) {
    let matchMap = findInGameMap(gameMap, input);

    player.map = matchMap;
    player.currentType = matchMap.type;
    player.currentPath = matchMap.key;

    if (input.toUpperCase() == 'START') {
      matchMap.currentType = 'start';
    }

    switch (player.currentType) {
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
  } else {
    postUpdate('You seem to be off path... Choose one of the previous paths');
  }
}

async function battle(hero, opponent, ongoing = false, battleLogic) {
  console.log(opponent);
  player.currentState = 'battle';
  player.opponent = opponent;
  if (!ongoing) {
    battleLogic = defineFirstBlood();
  }

  // Battle loop
  if (player.currentState == 'battle') {
    console.log(player.battleState);
    console.log(battleLogic);

    if (player.battleState) {
      if (battleLogic.heroturn) {
        // Player's turn
        printBattleOptions(hero, opponent, battleLogic).then((playerChoice) => {
          let battleStatus = isBattleOver(hero, opponent);
          if (battleStatus.result) {
            printBattleResult(battleStatus, opponent);
            player.currentState = 'idle';
            player.map.numberOfEncounters--;
            player.opponent = {};
            setTimeout(() => {
              displayAreaOptions(player.map);
            }, 2000);
            console.log('HALLLOOOO!!!');
            console.log(player.currentPath);
            return true;
            //break;
          } else {
            battleLogic.heroturn = false;
            console.log(hero);
            console.log(opponent);
            console.log(battleLogic);
            console.log(player.battleState);
            console.log(player.currentState);
            battle(hero, opponent, true, battleLogic);
          }
        });
      } else {
        // Opponent's turn
        opponent.attack(hero);
        postUpdate(`You have ${hero.health.toFixed(2)} health left.`);

        let battleStatus = isBattleOver(hero, opponent);
        if (battleStatus.result) {
          printBattleResult(battleStatus);
          postUpdate('GIT GUD');
          setTimeout(() => {
            location.reload();
          }, 5000);
          //break;
        } else {
          battleLogic.heroturn = true;
          battle(hero, opponent, true, battleLogic);
        }
      }
    }
  }
}

function handleInput(input) {
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
  }

  console.log(matchMap);
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

  console.log(player.currentState);

  //if(player.map.numberOfEncounters > 0){
  postUpdate(`You encountered a ${randomEnemy.name}, prepare yourself!`);
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      player.battleState = true; //true = fight - false = await user input
      battle(player.hero, randomEnemy, false, {})
        .then((superMario) => {
          resolve({ result: true }); // Resolve the promise here, after getBattleInputLoop completes
          //processInput(player.key);
        })
        .catch((error) => {
          reject(error); // In case there's an error within getBattleInputLoop
        });
    });
  }, 3000);
  //}
  player.currentPath = matchMap.key;
  // player.currentPath = matchMap;

  console.log('GRAPJES');
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
  displayAreaOptions(player.map);
  postUpdate('---');
}

function displayAreaOptions(map) {
  postUpdate(map.description);
  if (map.options) {
    postUpdate(map.optionLabel);
    map.options.forEach((option, index) => {
      let update = index + 1 + '. [' + option.goto + '] ' + option.label;
      postUpdate(update);
    });
  }
}

function processBattleInput(input) {
  // Keyword inputs for battle actions
}

document
  .getElementById('commandInput')
  .addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && player.currentState == 'idle') {
      const command = event.target.value;
      postUpdate('> ' + command);
      processInput(command);
      event.target.value = ''; // Clear the input field
    }
  });

appSetup();
