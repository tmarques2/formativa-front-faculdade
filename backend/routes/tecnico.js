const express = require("express");
const router = express.Router();
const Tecnico = require("../models/Tecnico");

// LISTAR TODOS (GET)
router.get("/", async (req, res) => {
  try {
    const tecnicos = await Tecnico.find();
    res.json(tecnicos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRIAR (POST)
router.post("/", async (req, res) => {
  try {
    const novo = await Tecnico.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ATUALIZAR (PUT)
router.put("/:id", async (req, res) => {
  try {
    const atualizado = await Tecnico.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ mensagem: "Técnico não encontrado" });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETAR (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletado = await Tecnico.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ mensagem: "Técnico não encontrado" });
    res.json({ mensagem: "Técnico deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;