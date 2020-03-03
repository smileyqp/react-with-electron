const os = require('os');

export default function getCarname(){
    return os.hostname();
}