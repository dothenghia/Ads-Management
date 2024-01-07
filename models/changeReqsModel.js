const mongoose = require('mongoose');

const changeReqSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  changeReqId: { type: Number, required: true },
  senderRole: { type: Number, required: true },
  status: { type: Number, required: true },
  oldAdId: { type: Number, required: true },
  new: {
    name: { type: String, required: true },
    size: { type: String, required: true },
    thumbnails: [{
      url: { type: String, required: true }
    }]
  }
},{ collection: 'changeReqs' }
);

const changeReqsModel = mongoose.model('changeReqs', changeReqSchema);

module.exports = changeReqsModel;
