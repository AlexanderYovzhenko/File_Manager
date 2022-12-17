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
  copy,
  createFile,
  moveFile,
  readFileFunc, 
  removeFile, 
  rename
} from './operations/mainOperations.js';
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

    let pathToDirectory = command.split(' ').slice(1).join(' ');
    let pathToNewDirectory = '';

    if (command.split(' ').length === 3) {
      pathToDirectory = command.split(' ').slice(1, -1).join(' ');
      pathToNewDirectory = command.split(' ').slice(2).join(' ');
    }

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
      
      case 'cat':
        await readFileFunc(pathToDirectory);
        break;

      case 'add':
        await createFile(pathToDirectory);
        break;

      case 'rn':
        await rename(pathToDirectory, pathToNewDirectory);
        break;

      case 'cp':
        await copy(pathToDirectory, pathToNewDirectory);
        break;

      case 'mv':
        await moveFile(pathToDirectory, pathToNewDirectory);
        break;

      case 'rm':
        await removeFile(pathToDirectory);
        break;


        // case 'mv':
        // await moveFile(pathToDirectory, pathToNewDirectory);
        // break;

        // case 'mv':
        // await moveFile(pathToDirectory, pathToNewDirectory);
        // break;

        // case 'mv':
        // await moveFile(pathToDirectory, pathToNewDirectory);
        // break;

        // case 'mv':
        // await moveFile(pathToDirectory, pathToNewDirectory);
        // break;

        // case 'mv':
        // await moveFile(pathToDirectory, pathToNewDirectory);
        // break;

        // case 'mv':
        // await moveFile(pathToDirectory, pathToNewDirectory);
        // break;

        // case 'mv':
        // await moveFile(pathToDirectory, pathToNewDirectory);
        // break;

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