const fs = require("fs");
const path = require("path");

function updateData(array, filePath) {
    arrayJSON = JSON.stringify(array);
    fs.writeFileSync(path.join(__dirname, filePath), arrayJSON);
}

module.exports = updateData;
