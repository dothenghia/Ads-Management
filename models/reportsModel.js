const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: { type: String }
});

const reportSchema = new mongoose.Schema({
    reportForm: { type: String },
    images: [imageSchema],
    reportId: { type: Number },
    latitude: { type: String },
    content: { type: String },
    reportType: { type: String },
    adId: { type: String },
    phone: { type: String },
    locationId: { type: Number },
    time: { type: Date },
    fullname: { type: String },
    email: { type: String },
    longitude: { type: String },
    status: { type: String },
    solution: { type: String }
}, { collection: 'reports' });

const reportsModel = mongoose.model('reports', reportSchema);

module.exports = reportsModel;
