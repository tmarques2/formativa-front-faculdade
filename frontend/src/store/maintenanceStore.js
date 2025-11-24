import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../services/api'; 

export const useMaintenanceStore = defineStore('maintenance', () => {
  // === STATE ===
  const manutencoes = ref([]);
  const isLoading = ref(false);

  // === GETTERS ===
  const totalManutencoes = computed(() => manutencoes.value.length);

  const kpis = computed(() => {
    return {
      concluidas: manutencoes.value.filter(m => m.status === 'Concluída').length,
      pendentes: manutencoes.value.filter(m => m.status === 'Pendente').length,
      atrasadas: manutencoes.value.filter(m => m.status === 'Atrasada').length,
    };
  });

  // === ACTIONS ===
  async function fetchManutencoes() {
    isLoading.value = true;
    try {
      const response = await api.getManutencoes();
      manutencoes.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar manutenções:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function addManutencao(novaManutencao) {
    try {
      // 1. Encontra o maior ID numérico existente para garantir a sequência (1, 2, 3...)
      const maxId = manutencoes.value.reduce((max, m) => {
        const currentId = Number(m.id);
        return isNaN(currentId) ? max : Math.max(max, currentId);
      }, 0);

      // 2. Atribui o próximo ID sequencial como STRING para consistência
      const nextId = maxId + 1;
      const manutencaoComId = { id: String(nextId), ...novaManutencao };
      
      // 3. Envia o objeto COMPLETO (com o novo ID) para o json-server
      const response = await api.addManutencao(manutencaoComId);
      
      manutencoes.value.push(response.data);
      
    } catch (error) {
      console.error('Erro ao adicionar manutenção:', error);
      throw error;
    }
  }

  async function updateManutencao(manutencaoAtualizada) {
    try {
      // CORREÇÃO CRÍTICA: Garante que o ID no objeto enviado para a API é uma string.
      const dataToPut = {
        ...manutencaoAtualizada,
        id: String(manutencaoAtualizada.id) 
      };

      // 1. CHAMA A API: Envia a requisição PUT (o api.js já lida com a URL)
      const response = await api.updateManutencao(dataToPut);
      const updatedData = response.data;
      
      // 2. Atualizar o estado local
      const index = manutencoes.value.findIndex(m => String(m.id) === String(updatedData.id));
      if (index !== -1) {
        // Atualiza a store com o dado retornado pelo servidor
        manutencoes.value[index] = updatedData;
      }
      return updatedData;
    } catch (error) {
      console.error('Erro ao atualizar manutenção:', error);
      throw error;
    }
  }

  async function deleteManutencao(id) {
    try {
      // 1. CHAMA A API: Envia a requisição DELETE para o json-server
      await api.deleteManutencao(id);

      // 2. Atualiza o estado local APENAS se a API retornar sucesso
      const initialLength = manutencoes.value.length;
      manutencoes.value = manutencoes.value.filter(m => String(m.id) !== String(id));
      
      if (manutencoes.value.length === initialLength) {
        throw new Error(`Manutenção com ID ${id} não encontrada para exclusão local.`);
      }

    } catch (error) {
      console.error('Erro ao excluir manutenção:', error);
      throw error;
    }
  }

  return {
    manutencoes,
    isLoading,
    totalManutencoes,
    kpis,
    fetchManutencoes,
    addManutencao,
    updateManutencao,
    deleteManutencao,
  };
});