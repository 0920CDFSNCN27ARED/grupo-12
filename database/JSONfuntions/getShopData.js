const getData = require("./getData");
const products = getData("../data/productsDB.json");
const comments = getData("../data/commentsDB.json");

function getShopData(shop, current_user) {
    let shopProducts = [];
    products.forEach((product) => {
        if (product.shopId == shop.id && current_user.role == "seller") {
            shopProducts.push(product);
        }
    });

    let shopComments = [];
    comments.forEach((comment) => {
        if (comment.shopId == shop.id) {
            shopComments.push(comment);
        }
    });

    return (shopData = { shopProducts, shopComments });
}

module.exports = getShopData;