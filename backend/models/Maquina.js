const mongoose = require("mongoose");

const MaquinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  modelo: { type: String, required: false }, // Exemplo de campo extra
  tipo: { type: String, required: true }      // Ex: Impressora, CNC, Torno
});

MaquinaSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model("Maquina", MaquinaSchema);