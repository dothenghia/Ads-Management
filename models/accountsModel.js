const mongoose = require("mongoose")

const accountsSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    date: { type: Date },
    area: { type: String },
    role: { type: String },
    phuong_id: { type: String },
    phone: { type: String },
    quan_id: { type: String },
    email: { type: String, unique: true },
    name: { type: String },
    username: { type: String, unique: true }, 
    fbID: { type: String, unique: true },
    hashedpassword: { type: String },
    microsoftEmail: { type: String },
    delete: { type: Boolean, default: false },
    avatar: { type: Array, default: [] },
},{ collection: 'accounts' }
);

const accountsModel = mongoose.model('accounts', accountsSchema);

module.exports = accountsModel;