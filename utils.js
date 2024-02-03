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
