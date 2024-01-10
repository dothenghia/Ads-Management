const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  adId: { type: Number },
  size: { type: String },
  reportId: { type: String }, 
  contractStartDate: { type: Date },
  name: { type: String },
  contractEndDate: { type: Date },
  thumbnails: [{
    url: { type: String }
  }]
}, { collection: 'ads' });

const adsModel = mongoose.model('ads', adSchema);

module.exports = adsModel;
