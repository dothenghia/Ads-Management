const mongoose = require("mongoose")

const accountsSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    date: { type: Date, required: true },
    area: { type: String },
    role: { type: String },
    phuong_id: { type: String },
    phone: { type: String },
    quan_id: { type: String },
    email: { type: String, unique: true }, // Make email field unique
    name: { type: String },
    username: { type: String, unique: true }, // Make username field unique
    fbID: { type: String },
    hashedpassword: { type: String },
    microsoftEmail: { type: String },
    delete: { type: Boolean, default: false },
    avatar: { type: Array, default: [] },
});

const accountsModel = mongoose.model('accounts', accountsSchema);

module.exports = accountsModel;