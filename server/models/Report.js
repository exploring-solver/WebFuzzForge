const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  toolName: { type: String, required: true },
  results: { type: mongoose.Schema.Types.Mixed, required: true },
  executionTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);