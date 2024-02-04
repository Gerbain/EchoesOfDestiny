import { player } from './player.js';
import { gameMap } from './map.js';

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
}

export{postUpdate};

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

export{findMatch};

function findInGameMap(map, input, parentKey = null) {
    const normalizedInput = input.trim().toLowerCase();

    for (const key in map) {
        const item = map[key];
        
        if (key.toLowerCase() === normalizedInput) {
            return { ...item, key, parentKey }; // Return a copy of the item with its key and parent key if applicable
        }

        if (item.options && item.options.length > 0) {
            const foundInOptions = item.options.find(option => option.label.toLowerCase() === normalizedInput);
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

export{findInGameMap};

function findOptionInCurrentLocation(currentLocationKey, input) {
    const currentLocation = gameMap[currentLocationKey];
    if (!currentLocation) {
        console.log("Current location not found in the game map.");
        return null;
    }

    const normalizedInput = input.trim().toLowerCase();

    if (currentLocation.options) {
        const foundOption = currentLocation.options.find(option => option.label.toLowerCase() === normalizedInput);
        if (foundOption) {
            return foundOption.goto;
        }
    }

    return null;
}
export{findOptionInCurrentLocation};

function isValidOption(currentPath, userInput) {
    const currentLocation = gameMap[currentPath];

    if (currentLocation && currentLocation.options) {
        const normalizedInput = userInput.trim().toUpperCase(); // Assuming inputs are keys like 'CABIN', 'COLLECT-START'
        
        const optionMatch = currentLocation.options.find(option => option.goto === normalizedInput);

        if (optionMatch) {
            player.currentPath = optionMatch;
            return true;
        }
    }

    return false;
}

export{isValidOption}