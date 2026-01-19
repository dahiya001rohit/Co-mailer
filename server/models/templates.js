const mongoose = require('mongoose');
const templateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  template: { type: String, required: true, default: null}
});

const Templates = mongoose.model('templates', templateSchema);
module.exports = Templates;