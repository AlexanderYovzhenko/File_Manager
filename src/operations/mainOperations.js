import * as fs from 'fs';
import { access, writeFile, lstat, constants, rename as renameFile, rm } from 'fs/promises';
import { operationErrorString, workingDirectoryObject } from "../common/constants.js";

const checkPath = (pathToDirectory) => {
  const path = workingDirectoryObject.workingDirectory;
  const rightPath = pathToDirectory.includes(path) ? pathToDirectory : path + '\\' + pathToDirectory;
  
  return rightPath;
};

const readFileFunc = async (pathToFile) => {
  const rightPath = checkPath(pathToFile);

  try {
    await access(rightPath);
    const stat = await lstat(rightPath);
    
    if (stat.isFile()) {
      const resultReadStream = fs.createReadStream(rightPath);

      resultReadStream.on('data', (data) => {
        console.info(String(data).trim());
      });
    } else {
      throw new Error(operationErrorString);
    }
  } catch (error) {
    throw new Error(operationErrorString);
  }
};

const createFile = async (newFileName) => {
  const rightPath = checkPath(newFileName);

  try {
    const fileExists = await access(rightPath, constants.F_OK).then(() => true).catch(() => false);

    if (fileExists) {
      throw new Error(operationErrorString);
    } else {
      await writeFile(rightPath, '');
    }
  } catch (error) {
    throw new Error(operationErrorString);
  }
};

const rename = async (pathToFile, newFileName) => {
  const rightPath = checkPath(pathToFile);
  const rightPathNewFile = checkPath(newFileName);

  try {
    const fileExists = await access(rightPath, constants.F_OK).then(() => true).catch(() => false);
    const fileExistsNewFile = await access(rightPathNewFile, constants.F_OK).then(() => true).catch(() => false);

    if (fileExists && !fileExistsNewFile) {
      await renameFile(rightPath, rightPathNewFile);
    } else {
      throw new Error(operationErrorString);
    }
  } catch (error) {
    throw new Error(operationErrorString);
  }
};

const copy = async (pathToFile, newFileName) => {
  const rightPath = checkPath(pathToFile);
  const rightPathNewFile = checkPath(newFileName);

  try {
    const fileExists = await access(rightPath, constants.F_OK).then(() => true).catch(() => false);
    const fileExistsNewFile = await access(rightPathNewFile, constants.F_OK).then(() => true).catch(() => false);

    if (fileExists && !fileExistsNewFile) {
      const resultReadStream = fs.createReadStream(rightPath);
      const resultWriteStream = fs.createWriteStream(rightPathNewFile);

      resultReadStream.pipe(resultWriteStream);
    } else {
      throw new Error(operationErrorString);
    }
  } catch (error) {
    throw new Error(operationErrorString);
  }
};
 
const moveFile = async (pathToFile, newFileName) => {
  const rightPath = checkPath(pathToFile);
  const rightPathNewFile = checkPath(newFileName);

  try {
    const fileExists = await access(rightPath, constants.F_OK).then(() => true).catch(() => false);
    const fileExistsNewFile = await access(rightPathNewFile, constants.F_OK).then(() => true).catch(() => false);

    if (fileExists && !fileExistsNewFile) {
      const resultReadStream = fs.createReadStream(rightPath);
      const resultWriteStream = fs.createWriteStream(rightPathNewFile);

      resultReadStream.pipe(resultWriteStream);

      await rm(rightPath);
    } else {
      throw new Error(operationErrorString);
    }
  } catch (error) {
    throw new Error(operationErrorString);
  }
};

const removeFile = async (pathToFile) => {
  const rightPath = checkPath(pathToFile);

  try {
    const fileExists = await access(rightPath, constants.F_OK).then(() => true).catch(() => false);

    if (fileExists) {
      await rm(rightPath);
    } else {
      throw new Error(operationErrorString);
    }
  } catch (error) {
    throw new Error(operationErrorString);
  }
};

export {
  readFileFunc,
  createFile,
  rename,
  copy,
  moveFile,
  removeFile
};