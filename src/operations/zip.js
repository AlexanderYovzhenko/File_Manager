import * as fs from 'node:fs';
import { access, constants } from 'node:fs/promises';
import zlib from 'node:zlib';
import { operationErrorString, workingDirectoryObject } from '../common/constants.js';

const checkPath = (pathToDirectory) => {
  const path = workingDirectoryObject.workingDirectory;
  const rightPath = pathToDirectory.includes(path) ? pathToDirectory : path + '\\' + pathToDirectory;
  
  return rightPath;
};

const compress = async (pathToFile, zipFileName) => {
  const rightPath = checkPath(pathToFile);
  const rightPathZipFile = checkPath(zipFileName);

    try {
      const fileExists = await access(rightPath, constants.F_OK).then(() => true).catch(() => false);
      const fileExistsZipFile = await access(rightPathZipFile, constants.F_OK).then(() => true).catch(() => false);

        if(fileExists && !fileExistsZipFile) {
          const readStream = fs.createReadStream(rightPath);
          const writeStream = fs.createWriteStream(rightPathZipFile);
          const brotli = zlib.createBrotliCompress();

          readStream.pipe(brotli).pipe(writeStream);
        } else {
          throw new Error(operationErrorString);
        }
    } catch (error) {
      throw new Error(operationErrorString);
    }
};

const decompress = async (pathToFileZip, pathFileName) => {
  const rightPathZipFile = checkPath(pathToFileZip);
  const rightPathFile = checkPath(pathFileName);

    try {
      const fileExists = await access(rightPathZipFile, constants.F_OK).then(() => true).catch(() => false);
      const fileExistsZipFile = await access(rightPathFile, constants.F_OK).then(() => true).catch(() => false);

        if(fileExists && !fileExistsZipFile) {
          const readStream = fs.createReadStream(rightPathZipFile);
          const writeStream = fs.createWriteStream(rightPathFile);
          const brotli = zlib.createBrotliDecompress();

          readStream.pipe(brotli).pipe(writeStream);
        } else {
          throw new Error(operationErrorString);
        }
    } catch (error) {
      throw new Error(operationErrorString);
    }
};

export {
  compress,
  decompress
};