const getData = require("./getData");
const products = getData("../data/productsDB.json");
const comments = getData("../data/commentsDB.json");

function getUserData(current_user) {
    let userProducts = [];
    products.forEach((product) => {
        if (product.shopId == current_user.shopId && current_user.role == "seller") {
            userProducts.push(product);
        }
    });

    let userComments = [];
    comments.forEach((comment) => {
        if (comment.userId == current_user.id) {
            userComments.push(comment);
        }
    });

    return (user_data = { userProducts, userComments });
}

module.exports = getUserData;