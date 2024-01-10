const mongoose = require('mongoose');

const changeLocReqSchema = new mongoose.Schema({
  date: { type: Date },
  reason: { type: String },
  senderRole: { type: Number },
  status: { type: Number },
  new: {
    adForm: { type: String },
    adType: { type: String },
    locationType: { type: String }
  },
  changeLocReqId: { type: Number },
  oldLocationId: { type: Number }
}, { collection: 'changeLocReqs' });

const changeLocReqsModel = mongoose.model('changeLocReqs', changeLocReqSchema);

module.exports = changeLocReqsModel;
