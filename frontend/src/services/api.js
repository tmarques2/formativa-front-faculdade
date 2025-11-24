// src/services/api.js
import axios from 'axios';

// CORREÇÃO: A URL base deve incluir o recurso /machines se o json-server estiver rodando no modo padrão
// Se o json-server estiver rodando em http://localhost:3000, as rotas serão /machines
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getManutencoes() {
    // Rota correta para buscar a lista de máquinas/manutenções
    return apiClient.get('/machines'); 
  },
  addManutencao(manutencao) {
    return apiClient.post('/machines', manutencao);
  },
  // NOVO: Função para excluir (DELETE)
  deleteManutencao(id) {
    // Exemplo: DELETE http://localhost:3000/machines/1
    return apiClient.delete(`/machines/${id}`);
  },
  // Opcional: Atualizar para suportar PUT/PATCH real
  updateManutencao(manutencaoAtualizada) {
    // Exemplo: PUT http://localhost:3000/machines/1
    return apiClient.put(`/machines/${manutencaoAtualizada.id}`, manutencaoAtualizada);
  },
};