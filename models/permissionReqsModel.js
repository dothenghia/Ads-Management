const mongoose = require('mongoose');

const permissionReqSchema = new mongoose.Schema({
  permissionReqId: { type: Number },
  enddate: { type: Date },
  locationId: { type: Number },
  name: { type: String },
  startdate: { type: Date },
  content: { type: String },
  status: { type: Number },
  co: {
    phone: { type: String },
    name: { type: String },
    email: { type: String }
  },
  size: { type: String },
  thumbnails: [{
    url: { type: String }
  }]
}, { collection: 'permissionReqs' });

const permissionReqsModel = mongoose.model('permissionReqs', permissionReqSchema);

module.exports = permissionReqsModel;
