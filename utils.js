function postUpdate(message) {
    const gameOutput = document.getElementById('gameOutput');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    gameOutput.appendChild(newMessage);
    gameOutput.scrollTop = gameOutput.scrollHeight;
}

export{postUpdate};
