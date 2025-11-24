<script setup>
import { ref, watch } from 'vue';

// Define as props para v-model (edição)
const props = defineProps({
  maquina: String,
  data: String,
  tecnico: String,
  status: String,
  buttonText: { type: String, default: 'Salvar' },
  cancelText: { type: String, default: 'Cancelar' },
});

// Define os eventos: submit, cancel e os eventos de atualização para o v-model
const emit = defineEmits(['submit', 'update:maquina', 'update:data', 'update:tecnico', 'update:status', 'cancel']);

// Estado local que usa as props iniciais
const form = ref({
  maquina: props.maquina || '',
  data: props.data || '',
  tecnico: props.tecnico || '',
  status: props.status || 'Pendente',
});

// Observa as mudanças nas props e atualiza o estado local para pré-preenchimento
watch(props, (newProps) => {
  form.value.maquina = newProps.maquina || '';
  form.value.data = newProps.data || '';
  form.value.tecnico = newProps.tecnico || '';
  form.value.status = newProps.status || 'Pendente';
}, { immediate: true });


// Função chamada quando o formulário é enviado
function handleSubmit() {
  emit('submit', form.value);
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
            <label for="maquina" class="block text-sm font-medium text-gray-700">Máquina</label>
            <input 
                :value="form.maquina" 
                @input="$emit('update:maquina', $event.target.value); form.maquina = $event.target.value"
                type="text" 
                id="maquina" 
                required 
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm h-10 px-3 py-2 border-gray-300 rounded-md">
        </div>
        <div>
            <label for="data" class="block text-sm font-medium text-gray-700">Data</label>
            <input 
                :value="form.data" 
                @input="$emit('update:data', $event.target.value); form.data = $event.target.value"
                type="date" 
                id="data" 
                required 
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm h-10 px-3 py-2 border-gray-300 rounded-md">
        </div>
        <div>
            <label for="tecnico" class="block text-sm font-medium text-gray-700">Técnico</label>
            <input 
                :value="form.tecnico" 
                @input="$emit('update:tecnico', $event.target.value); form.tecnico = $event.target.value"
                type="text" 
                id="tecnico" 
                placeholder="Nome do técnico" 
                required 
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm h-10 px-3 py-2 border-gray-300 rounded-md">
        </div>
        <div>
             <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <select 
                :value="form.status" 
                @change="$emit('update:status', $event.target.value); form.status = $event.target.value"
                id="status" 
                class="mt-1 block w-full h-10 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm">
                <option>Concluída</option>
                <option>Pendente</option>
                <option>Atrasada</option>
            </select>
        </div>
        <div class="flex justify-end pt-4">
            <slot name="footer-actions-left"></slot> 
            
            <button type="button" @click="$emit('cancel')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-300 transition-colors">
                {{ cancelText }}
            </button>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                {{ buttonText }}
            </button>
        </div>
    </form>
</template>