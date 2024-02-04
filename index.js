import { player } from './player.js';
import { postUpdate, findMatch, findInGameMap, isValidOption } from './utils.js';
import { gameMap } from './map.js';
import { navigate } from './navigator.js';

function appSetup(){
    postUpdate("Welcome to Echos Of Destiny");
    postUpdate("Say 'start' to begin your journey...");
}

function processInput(input) {

    handleInput(input);

    switch (player.currentPath.type) {
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
            postUpdate("You are a developer-wizard in an uncoded path. DEBUG:"+player.currentState);
            break;
        default:
            postUpdate("You are confused where you are..."); //unknown state
    }
}

function handleInput(input){
    //player.currentState = handleInput(input);
    //let match = findMatch(input);
    let matchMap = findInGameMap(gameMap, input);
    let isValidInput = isValidOption(player.currentState, input);

    if(isValidInput || input.toUpperCase() == "START"){
        postUpdate(matchMap.description);

        if (matchMap.options) {
            postUpdate(matchMap.optionLabel);
            matchMap.options.forEach((option, index) => {
                let update = index+1+". ["+option.goto+"] "+option.label;
                postUpdate(update);
            });
        }
        postUpdate("---")
    
        player.currentState = matchMap.key;
        player.currentPath = matchMap;
    }

    console.log(matchMap);
    console.log(matchMap.key);
    console.log(player);
    console.log(isValidInput);

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
