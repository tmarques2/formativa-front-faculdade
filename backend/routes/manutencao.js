const express = require("express");
const router = express.Router();
const Manutencao = require("../models/Manutencao");

// LISTAR TODAS (GET) - Com Populate
router.get("/", async (req, res) => {
  try {
    const manutencoes = await Manutencao.find()
      .populate('maquina') // Preenche os dados da máquina
      .populate('tecnico'); // Preenche os dados do técnico
    res.json(manutencoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRIAR (POST)
router.post("/", async (req, res) => {
  try {
    const nova = await Manutencao.create(req.body);
    // Popula o retorno para o frontend exibir o nome imediatamente
    const populada = await nova.populate(['maquina', 'tecnico']);
    res.status(201).json(populada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ATUALIZAR (PUT)
router.put("/:id", async (req, res) => {
  try {
    const atualizada = await Manutencao.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate(['maquina', 'tecnico']);
    
    if (!atualizada) return res.status(404).json({ mensagem: "Manutenção não encontrada" });
    res.json(atualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETAR (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletada = await Manutencao.findByIdAndDelete(req.params.id);
    if (!deletada) return res.status(404).json({ mensagem: "Manutenção não encontrada" });
    res.json({ mensagem: "Manutenção deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;