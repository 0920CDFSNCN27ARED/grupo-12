const fs = require("fs");
const path = require("path");

function deleteData(array, newArray, filePath) {
    array = newArray;
    arrayJSON = JSON.stringify(array);
    fs.writeFileSync(path.join(__dirname, filePath), arrayJSON);
}

module.exports = deleteData;
