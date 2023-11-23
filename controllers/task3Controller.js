const controller = {};

controller.show = (req,res) => {
    let {products,categories} = require("../data");
    let productList = req.query.category ? products.filter((item) => item.category == req.query.category)  : products;
    res.render("task3",{
        products: productList,
        categories
    });
}

module.exports = controller;