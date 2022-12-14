import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import os from 'os';

const stdIn = process.stdin;
const stdOut = process.stdout;

const userNameArg = process.argv.slice(2)[0];
const userName = userNameArg.split('=')[1];
const welcomeString = `Welcome to the File Manager, ${userName}!`;
const goodbyeString = `Thank you for using File Manager, ${userName}, goodbye!`;

let workingDirectory = os.userInfo().homedir;
const workingDirectoryString = `You are currently in ${workingDirectory}`;

const invalidCommandString = 'Invalid input';
const operationErrorString = 'Operation failed';

const commandsArray = ['up'];


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

process.on('SIGINT', () => {
  console.info(goodbyeString);
  process.exit(0);
});

const startFileManager = async () => {
  try {
    console.info(welcomeString);
    console.info(workingDirectoryString);

    await pipeline(stdIn, checkCommandLine, stdOut);
  } catch (error) {
    console.error(error);
  }
}

startFileManager();