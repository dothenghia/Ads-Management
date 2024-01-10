const mongoose = require('mongoose');

const changeReqSchema = new mongoose.Schema({
  date: { type: Date },
  reason: { type: String },
  changeReqId: { type: Number },
  senderRole: { type: Number },
  status: { type: Number },
  oldAdId: { type: Number },
  new: {
    name: { type: String },
    size: { type: String },
    thumbnails: [{
      url: { type: String }
    }]
  }
}, { collection: 'changeReqs' });

const changeReqsModel = mongoose.model('changeReqs', changeReqSchema);

module.exports = changeReqsModel;
