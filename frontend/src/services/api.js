// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getManutencoes() {
    return apiClient.get('/machines'); 
  },
  addManutencao(manutencao) {
    return apiClient.post('/machines', manutencao);
  },
  // ATIVADO: Função para atualizar (PUT) no servidor
  updateManutencao(manutencaoAtualizada) {
    // Envia o objeto completo para o endpoint específico do ID.
    // Exemplo: PUT http://localhost:3000/machines/1
    return apiClient.put(`/machines/${manutencaoAtualizada.id}`, manutencaoAtualizada);
  },
  deleteManutencao(id) {
    // Exemplo: DELETE http://localhost:3000/machines/1
    return apiClient.delete(`/machines/${id}`);
  },
};