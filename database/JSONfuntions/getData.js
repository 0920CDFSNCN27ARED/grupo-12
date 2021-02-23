const fs = require("fs");
const path = require("path");

function getData(filePath){  
    const mainPath = path.join(__dirname, filePath);
    const customFile = fs.readFileSync(mainPath, "utf-8");
    let array;
    if (customFile == "") {
        return (array = []);
    } else {
        return (array = JSON.parse(customFile));
    }
}

module.exports = getData;