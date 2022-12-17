import { pipeline } from 'node:stream/promises';
import { checkCommandLine } from './checkCommands.js';
import { 
  goodbyeString, 
  welcomeString, 
  workingDirectoryObject, 
  workingDirectoryString 
} from './common/constants.js';

const stdIn = process.stdin;
const stdOut = process.stdout;

const startFileManager = async () => {
  try {
    process.on('SIGINT', () => {
      console.info(goodbyeString);
      process.exit(0);
    });

    console.info(welcomeString);
    console.info(workingDirectoryString + workingDirectoryObject.workingDirectory);

    await pipeline(stdIn, checkCommandLine, stdOut);
  } catch (error) {
    console.error(error);
  }
}

await startFileManager();