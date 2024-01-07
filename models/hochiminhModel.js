import mongoose from 'mongoose';

const wardSchema = new mongoose.Schema({
  division_type: { type: String },
  name: { type: String },
  idPhuong: { type: String },
});

const hochiminhSchema = new mongoose.Schema({
  division_type: { type: String },
  name: { type: String },
  idQuan: { type: String },
  wards: [wardSchema], 
},{ collection: 'hochiminh' }
);

const hochiminhModel = mongoose.model('hochiminh', hochiminhSchema);

module.exports = hochiminhModel;
