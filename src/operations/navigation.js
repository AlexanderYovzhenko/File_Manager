import os from 'os';
import { access, lstat, readdir } from 'fs/promises';
import { operationErrorString, workingDirectoryObject } from "../common/constants.js";

const navigationUp = () => {
  const path = workingDirectoryObject.workingDirectory;

  if (path === os.userInfo().homedir.split('\\').shift()) {
    return;
  }

  workingDirectoryObject.workingDirectory = path.split('\\').slice(0, path.split('\\').length - 1).join('\\');
};

const navigationPathToDirectory = async (pathToDirectory) => {
  const path = workingDirectoryObject.workingDirectory;

  try {
    pathToDirectory.includes(path) ? 
                                      (await access(pathToDirectory),
                                      workingDirectoryObject.workingDirectory = pathToDirectory)
                                   :
                                      (await access(path + '\\' + pathToDirectory),
                                      workingDirectoryObject.workingDirectory = path + '\\' + pathToDirectory);
  } catch (error) {
    throw new Error(operationErrorString);
  }
};

const sortFunc = (a, b) => {
  const  nameA=a.Name.toLowerCase(), 
         nameB=b.Name.toLowerCase();

  if (nameA > nameB) {
    return 1;
  }

  if (nameA < nameB) {
    return -1;
  }

  return 0; 
};

const navigationList = async () => {
  const path = workingDirectoryObject.workingDirectory;

  try {
    const files = await readdir(path);
    const resultPromises = files.map(async (file) => {
      const type = await lstat(path + '\\' + file);
      return {
        Name: file,
        Type: type.isFile() ? 'file' : 'directory'
      };
    });

    const resultTable = await Promise.all(resultPromises);

    const resultDirectory = resultTable.filter(el => el.Type === 'directory').sort((a, b) => sortFunc(a, b));
    const resultFile = resultTable.filter(el => el.Type === 'file').sort((a, b) => sortFunc(a, b));

    const result = [...resultDirectory, ...resultFile];

    console.table(result);
  } catch (error) {
    throw new Error(operationErrorString);
  }
};

export {
  navigationUp,
  navigationPathToDirectory,
  navigationList
};