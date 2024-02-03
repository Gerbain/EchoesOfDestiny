function postUpdate(message) {
    const gameOutput = document.getElementById('gameOutput');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    gameOutput.appendChild(newMessage);

    const emptyLine = document.createElement('div');
    emptyLine.innerHTML = '&nbsp;'; // Non-breaking space for an empty line
    gameOutput.appendChild(emptyLine);

    gameOutput.scrollTop = gameOutput.scrollHeight;
}

export{postUpdate};
