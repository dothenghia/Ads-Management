const mongoose = require("mongoose");

const adLocationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  reportId: { type: Number, required: true },
  latitude: { type: Number, required: true },
  locationType: { type: String, required: true },
  adList: [{
    adId: { type: Number, required: true }
  }],
  adForm: { type: String, required: true },
  planning: { type: Boolean, default: true },
  adType: { type: String, required: true },
  locationId: { type: Number, required: true },
  idQuan: { type: String, required: true },
  idPhuong: { type: String, required: true },
  thumbnails: [{
    url: { type: String, required: true }
  }],
  longitude: { type: Number, required: true },
  delete: { type: Boolean, default: false }
});

const adLocationsModel = mongoose.model('adLocations', adLocationSchema);

module.exports = adLocationsModel;
