import { EOL, cpus, userInfo, arch } from 'os';
import { invalidCommandString, operationErrorString } from "../common/constants.js";

const osFunc = (argument) => {
  const rightArgument = argument.slice(2);

  try {
    switch (rightArgument) {
      case 'EOL':
        console.info(JSON.stringify(EOL));
        break;

      case 'cpus':
        console.table(cpus().map(proc => {
          return {
            model: proc.model,
            'clock rate': (proc.speed / 1000).toFixed(2) + ' GHz'
          }
        }));
        break;

      case 'homedir':
        const homedir = userInfo().homedir;
        console.info(homedir);
        break;

      case 'username':
        const userName = userInfo().username;
        console.info(userName);
        break;

      case 'architecture':
        const architecture = arch();
        console.info(architecture);
        break;
    
      default:
        console.info(invalidCommandString);
        break;
    }
  } catch (error) {
    throw new Error(operationErrorString);
  }
};


export {
  osFunc
};