const mongoose = require('mongoose');

const permissionReqSchema = new mongoose.Schema({
  permissionReqId: { type: Number, required: true },
  enddate: { type: Date, required: true },
  locationId: { type: Number, required: true },
  name: { type: String, required: true },
  startdate: { type: Date, required: true },
  content: { type: String, required: true },
  status: { type: Number, required: true },
  co: {
    phone: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  size: { type: String, required: true },
  thumbnails: [{
    url: { type: String, required: true }
  }]
},{ collection: 'permissionReqs' }
);

const permissionReqsModel = mongoose.model('permissionReqs', permissionReqSchema);

module.exports = permissionReqsModel;
