// frontend/src/store/maintenanceStore.spec.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useMaintenanceStore } from './maintenanceStore';
import api from '../services/api'; // Importa o mock implícito do serviço de API

// Mocka a chamada de API para que os testes sejam rápidos e isolados (unitários)
vi.mock('../services/api', () => ({
  default: {
    getManutencoes: vi.fn(),
    addManutencao: vi.fn(),
  },
}));

describe('Maintenance Store (Pinia)', () => {
  // Configura o Pinia antes de cada teste
  beforeEach(() => {
    setActivePinia(createPinia());
    // Reseta o mock da função para cada teste
    api.getManutencoes.mockResolvedValue({
      data: [
        { id: 1, status: 'Concluída' },
        { id: 2, status: 'Pendente' },
        { id: 3, status: 'Atrasada' },
        { id: 4, status: 'Concluída' },
        { id: 5, status: 'Pendente' },
      ]
    });
  });

  it('deve calcular corretamente os KPIs após o fetch', async () => {
    // 1. Acessa a Store
    const store = useMaintenanceStore();
    
    // O KPI deve começar com zero antes do fetch
    expect(store.kpis.concluidas).toBe(0);
    expect(store.kpis.pendentes).toBe(0);
    expect(store.kpis.atrasadas).toBe(0);

    // 2. Executa a action que busca os dados
    await store.fetchManutencoes();

    // 3. Verifica se os getters (KPIs) refletem o estado atualizado
    // TESTE: Garante que os KPIs são calculados corretamente.
    expect(store.kpis.concluidas).toBe(2);
    expect(store.kpis.pendentes).toBe(2);
    expect(store.kpis.atrasadas).toBe(1);
    expect(store.totalManutencoes).toBe(5);
  });

  it('deve adicionar uma nova manutenção corretamente', async () => {
    const store = useMaintenanceStore();
    
    // Simula a API retornando a manutenção criada com um ID
    const novaManutencao = { maquina: 'Nova Máquina', status: 'Pendente' };
    api.addManutencao.mockResolvedValue({ data: { id: 6, ...novaManutencao } });

    // 1. Executa o fetch inicial para carregar os dados base
    await store.fetchManutencoes();
    const initialCount = store.totalManutencoes;

    // 2. Adiciona uma nova manutenção
    await store.addManutencao(novaManutencao);

    // 3. Verifica se o estado local foi atualizado
    // TESTE: Garante que o estado (lista de manutenções) foi modificado.
    expect(store.totalManutencoes).toBe(initialCount + 1);
    expect(store.manutencoes.some(m => m.maquina === 'Nova Máquina')).toBe(true);
  });

  it('deve atualizar o estado de loading corretamente durante o fetch', async () => {
    const store = useMaintenanceStore();

    // 1. Verifica estado inicial
    expect(store.isLoading).toBe(false);

    // 2. Chama a função, mas usa a Promise do mock para inspecionar o estado intermediário
    const fetchPromise = store.fetchManutencoes();

    // 3. Verifica se o estado está true (Carregando...)
    expect(store.isLoading).toBe(true);

    // 4. Aguarda a conclusão da busca
    await fetchPromise;

    // 5. Verifica se o estado voltou para false (Carregamento concluído)
    expect(store.isLoading).toBe(false);
  });
});