
const { client } = require("../../../config/mongodbConfig");
const dbName = 'Ads-Management';

const controller = {}

controller.ddqc = async (req,res) => {
    res.json({
        message: "ddqc"
    })
}

controller.ddbcbk = async (req,res) => {
    res.json({
        message: "ddbcbk"
    })
}

module.exports = controller;
