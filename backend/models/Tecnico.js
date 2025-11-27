const mongoose = require("mongoose");

const TecnicoSchema = new mongoose.Schema({
  nome: { type: String, required: true }
});

// Remove _id e usa id no JSON
TecnicoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model("Tecnico", TecnicoSchema);