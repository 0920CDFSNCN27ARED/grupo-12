function getComments() {
    
    const fs = require("fs");
    const path = require("path");
    const commentsFilePath = path.join(__dirname, "../data/commentsDB.json");
    const commentsFile = fs.readFileSync(commentsFilePath, "utf-8");

    let comments;
    if (commentsFile == "") {
        comments = [];
    } else {
        comments = JSON.parse(commentsFile);
    }
    return comments;
}

module.exports = getComments;
