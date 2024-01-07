const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  adId: { type: Number, required: true },
  size: { type: String, required: true },
  reportId: { type: String }, // Assuming reportId is of string type, adjust if needed
  contractStartDate: { type: Date, required: true },
  name: { type: String, required: true },
  contractEndDate: { type: Date, required: true },
  thumbnails: [{
    url: { type: String, required: true }
  }]
},{ collection: 'ads' }
);

const adsModel = mongoose.model('ads', adSchema);

module.exports = adsModel;
