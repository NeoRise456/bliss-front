<script setup>
import { HistoryApiService } from '../services/history.service.js';
import HistoryItem from './history-item.component.vue';

const historyApiService = new HistoryApiService();
const userId = 1; // User id momentaneo para testear el componente
let completedAppointments = [];

const fetchCompletedAppointments = async () => {
  try {
    completedAppointments = await historyApiService.getCompletedAppointmentsByUserId(userId);
  } catch (error) {
    console.error('Error fetching completed appointments:', error);
  }
};

await fetchCompletedAppointments();
</script>

<template>
  <div class="history-list">
    <history-item
        v-for="appointment in completedAppointments"
        :key="appointment.id"
        :appointment="appointment"
    />
  </div>
</template>

<style scoped>
.history-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>