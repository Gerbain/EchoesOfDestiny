import { postUpdate } from './utils.js';
import { gameMap } from './map.js';
import { navigate } from './navigator.js';
let currentState = 'START';

function appSetup(){
    postUpdate("Welcome to Echos Of Destiny");
    postUpdate("Say 'start' to begin your journey...");
    console.log(gameMap);
    console.log('app loaded');
}

function processInput(input) {

    currentState = handleInput(input);

    switch (currentState) {
        case 'start':
            // random event chance
            break;
        case 'path':
            // random event chance
            break;
        case 'area':
            processChoiceInput(input);
            break;
        case 'battle':
            processBattleInput(input);
            break;
        case undefined:
            postUpdate("You are a developer-wizard in an uncoded path. DEBUG:"+currentState);
            break;
        default:
            postUpdate("You are confused where you are..."); //unknown state
    }
}

function handleInput(input){
    navigate(currentState, gameMap);
}

function processChoiceInput(input) {
    // Numeric inputs for choices
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
