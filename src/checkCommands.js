import { Transform } from 'node:stream';
import { 
  commandsArray, 
  goodbyeString, 
  invalidCommandString, 
  operationErrorString, 
  workingDirectoryObject, 
  workingDirectoryString 
} from './common/constants.js';
import { 
  navigationList,
  navigationPathToDirectory, 
  navigationUp 
} from './operations/navigation.js';

const checkCommands = async (data) => {
  const command = data.trim();

  try {
    if (command === '.exit') {
      console.info(goodbyeString);
      return process.exit(0);
    }

    if (!commandsArray.includes(command.split(' ').shift())) {
      return invalidCommandString + '\n';
    }

    const pathToDirectory = command.split(' ').slice(1).join(' ');

    switch (command.split(' ').shift()) {
      case 'up':
        navigationUp();
        break;

      case 'cd':
        await navigationPathToDirectory(pathToDirectory);
        break;

      case 'ls':
        await navigationList();
        break;
      
      default:
        break;
    }

    return '';
  } catch (error) {
    return operationErrorString + '\n';
  }
};

const checkCommandLine = new Transform({
  async transform(chunk, encoding, callback) {
    callback(null, await checkCommands(String(chunk)) + workingDirectoryString + workingDirectoryObject.workingDirectory + '\n');
  }
});

export {
  checkCommandLine
}