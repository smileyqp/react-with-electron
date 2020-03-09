export function readData(filename){
    const fs = require('fs')
    const path = require('path')
    const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
    return data;
}

export function writeData(filename,writeText){
    const fs = require('fs')
    const path = require('path')
    fs.writeFile(path.resolve(__dirname,filename), writeText,  function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
    });
}