<script setup>
import { ChartBarIcon, CalendarIcon, ListBulletIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <aside class="w-64 min-h-screen bg-gray-800 text-white p-4">
    <h1 class="text-2xl font-bold mb-8">ProSys</h1>
    <nav class="flex flex-col space-y-2">
      <router-link
        to="/"
        class="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
        active-class="bg-gray-900"
      >
        <ChartBarIcon class="h-6 w-6 mr-3" />
        Dashboard
      </router-link>
      <router-link
        to="/calendario"
        class="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
        active-class="bg-gray-900"
      >
        <CalendarIcon class="h-6 w-6 mr-3" />
        Calendário
      </router-link>
      <router-link
        to="/lista"
        class="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
        active-class="bg-gray-900"
      >
        <ListBulletIcon class="h-6 w-6 mr-3" />
        Lista
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
/* O active-class do Tailwind já cuida do estilo do link ativo */
.router-link-exact-active {
  background-color: #1f2937; /* bg-gray-800 */
}
</style>