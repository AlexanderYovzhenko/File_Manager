import { createHash } from 'node:crypto';
import { access, constants, lstat } from 'node:fs/promises';
import { operationErrorString, workingDirectoryObject } from '../common/constants.js';

const checkPath = (pathToDirectory) => {
    const path = workingDirectoryObject.workingDirectory;
    const rightPath = pathToDirectory.includes(path) ? pathToDirectory : path + '\\' + pathToDirectory;
    
    return rightPath;
};

const calculateHash = async (pathToFile) => {
    const rightPath = checkPath(pathToFile);

    try {
        const fileExists = await access(rightPath, constants.F_OK).then(() => true).catch(() => false);
        const stat = await lstat(rightPath);
        
        if (fileExists && stat.isFile()) {
            const result = createHash('sha256').update(rightPath).digest('hex');
            console.info(result);
        } else {
          throw new Error(operationErrorString);
        }
      } catch (error) {
        throw new Error(operationErrorString);
    }
};

export {
    calculateHash
};