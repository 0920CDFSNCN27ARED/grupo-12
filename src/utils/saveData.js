const fs = require("fs");
const path = require("path");

function saveData(array, item, filePath){
    array.push(item);
    arrayJSON = JSON.stringify(array);
    fs.writeFileSync(path.join(__dirname, filePath), arrayJSON);
}

module.exports = saveData;
