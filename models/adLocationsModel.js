const mongoose = require("mongoose");

const adLocationSchema = new mongoose.Schema({
  address: { type: String },
  reportId: { type: Number},
  latitude: { type: Number},
  locationType: { type: String },
  adList: [{
    adId: { type: Number},
  }],
  adForm: { type: String },
  planning: { type: Boolean, default: true },
  adType: { type: String },
  locationId: { type: Number },
  idQuan: { type: String},
  idPhuong: { type: String},
  thumbnails: [{
    url: { type: String},
  }],
  longitude: { type: Number },
},{ collection: 'adLocations' }
);

const adLocationsModel = mongoose.model('adLocations', adLocationSchema);

module.exports = adLocationsModel;
