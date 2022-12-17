import { Transform } from 'node:stream';
import { calculateHash } from './operations/hash.js';
import { osFunc } from './operations/os.js';
import { 
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

    let oneCommandArgument = command.split(' ').slice(1).join(' ');
    let twoCommandArgument = '';

    if (command.split(' ').length === 3) {
      oneCommandArgument = command.split(' ').slice(1, -1).join(' ');
      twoCommandArgument = command.split(' ').slice(2).join(' ');
    }

    switch (command.split(' ').shift()) {
      case 'up':
        navigationUp();
        break;

      case 'cd':
        await navigationPathToDirectory(oneCommandArgument);
        break;

      case 'ls':
        await navigationList();
        break;
      
      case 'cat':
        await readFileFunc(oneCommandArgument);
        break;

      case 'add':
        await createFile(oneCommandArgument);
        break;

      case 'rn':
        await rename(oneCommandArgument, twoCommandArgument);
        break;

      case 'cp':
        await copy(oneCommandArgument, twoCommandArgument);
        break;

      case 'mv':
        await moveFile(oneCommandArgument, twoCommandArgument);
        break;

      case 'rm':
        await removeFile(oneCommandArgument);
        break;

      case 'os':
        osFunc(oneCommandArgument);
        break;

      case 'hash':
        await calculateHash(oneCommandArgument);
        break;

        // case 'mv':
        // await moveFile(oneCommandArgument, twoCommandArgument);
        // break;

        // case 'mv':
        // await moveFile(oneCommandArgument, twoCommandArgument);
        // break;

      default:
        return invalidCommandString + '\n';
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