import os from 'os';

const userNameArg = process.argv.slice(2)[0];
const userName = userNameArg.split('=')[1];
const welcomeString = `Welcome to the File Manager, ${userName}!`;
const goodbyeString = `Thank you for using File Manager, ${userName}, goodbye!`;

const invalidCommandString = 'Invalid input';
const operationErrorString = 'Operation failed';

const workingDirectoryObject = {
  workingDirectory: os.userInfo().homedir
};

const workingDirectoryString = `You are currently in `;

export {
  userName, 
  welcomeString, 
  goodbyeString, 
  invalidCommandString, 
  operationErrorString,
  workingDirectoryString,
  workingDirectoryObject
};