import { postUpdate } from './utils.js';

function navigate(locationPath, gameMap) {
    const pathSegments = locationPath.split('-');
    let currentLocation = gameMap;
  
    // Traverse the path to find the current location
    for (const segment of pathSegments) {
      if (currentLocation[segment]) {
        currentLocation = currentLocation[segment];
      } else {
        console.log('Location does not exist.');
        return;
      }
    }
  
    postUpdate(currentLocation.description);
  
    // If there are options, display them
    if (currentLocation.options) {
        postUpdate(currentLocation.optionLabel);
        currentLocation.options.forEach((option, index) => {
            postUpdate(`${index + 1}. ${option.label}`);
        });
    }
  }
  
  export { navigate };
  