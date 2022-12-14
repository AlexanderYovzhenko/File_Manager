import { Transform } from 'node:stream';
import { 
  commandsArray, 
  goodbyeString, 
  invalidCommandString, 
  operationErrorString, 
  workingDirectoryString 
} from './common/constants.js';

const checkCommand = async (data) => {
  const command = data.trim();

  try {
    if (command === '.exit') {
      console.info(goodbyeString);
      return process.exit(0);
    }

    if (!commandsArray.includes(command)) {
      console.info(invalidCommandString);
      return workingDirectoryString + '\n';
    }

    switch (command) {
      case 'up':
        console.log(1234214);
        break;

      case 'val':
      
      break;
      
      default:
        break;
    }

    return workingDirectoryString + '\n';
  } catch (error) {
    console.error(operationErrorString);
    return workingDirectoryString + '\n';
  }
};

const checkCommandLine = new Transform({
  async transform(chunk, encoding, callback) {
    callback(null, await checkCommand(String(chunk)));
  }
});

export {
  checkCommandLine
}