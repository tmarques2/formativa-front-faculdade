const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

// Rotas
app.use("/api/tecnico", require("./routes/tecnico"));     // Nova rota
app.use("/api/maquina", require("./routes/maquina"));     // Rota atualizada
app.use("/api/manutencao", require("./routes/manutencao")); // Nova rota principal

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});