const mongoose = require('mongoose');

const changeLocReqSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  senderRole: { type: Number, required: true },
  status: { type: Number, required: true },
  new: {
    adForm: { type: String, required: true },
    adType: { type: String, required: true },
    locationType: { type: String, required: true }
  },
  changeLocReqId: { type: Number, required: true },
  oldLocationId: { type: Number, required: true }
});

const changeLocReqsModel = mongoose.model('changeLocReqs', changeLocReqSchema);

module.exports = changeLocReqsModel;
