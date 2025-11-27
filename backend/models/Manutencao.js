const mongoose = require("mongoose");

const ManutencaoSchema = new mongoose.Schema({
  // Referência ao ID da Maquina
  maquina: { type: mongoose.Schema.Types.ObjectId, ref: 'Maquina', required: true },
  // Referência ao ID do Tecnico
  tecnico: { type: mongoose.Schema.Types.ObjectId, ref: 'Tecnico', required: true },
  data: { type: String, required: true },
  status: { type: String, required: true, default: 'Pendente' }
});

ManutencaoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; }
});

module.exports = mongoose.model("Manutencao", ManutencaoSchema);