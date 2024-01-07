const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true }
});

const reportSchema = new mongoose.Schema({
  reportForm: { type: String, required: true },
  images: [imageSchema],
  reportId: { type: Number, required: true },
  latitude: { type: String },
  content: { type: String, required: true },
  reportType: { type: String, required: true },
  adId: { type: String },
  phone: { type: String, required: true },
  locationId: { type: Number, required: true },
  time: { type: Date, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  longitude: { type: String },
  status: { type: String, required: true },
  solution: { type: String }
},{ collection: 'reports' }
);

const reportsModel = mongoose.model('reports', reportSchema);

module.exports = reportsModel;
