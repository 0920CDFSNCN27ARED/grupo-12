function getUsers() {
    const fs = require("fs");
    const path = require("path");
    const usersFilePath = path.join(__dirname, "../data/usersDB.json");
    const usersFile = fs.readFileSync(usersFilePath, "utf-8");

    let products;
    if (usersFile == "") {
        users = [];
    } else {
        users = JSON.parse(usersFile);
    }
    return users;
}

module.exports = getUsers;
