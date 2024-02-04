import { postUpdate } from './utils.js';

function navigate(locationPath, gameMap) {
    const pathSegments = locationPath.split('-');
    let currentLocation = gameMap;

    for (const segment of pathSegments) {
      if (currentLocation[segment]) {
        currentLocation = currentLocation[segment];
      } else {
        console.log('Location does not exist.');
        return;
      }
    }
  
}
export { navigate };
  