<script setup>
import { ref, onMounted } from 'vue';
import HistoryItem from './history-item.component.vue';
import { HistoryApiService } from '../services/history.service.js';

const userId = 1; // Temporary user id for testing the component
const completedAppointments = ref([]);
const historyApiService = new HistoryApiService();

const fetchCompletedAppointments = async () => {
  try {
    completedAppointments.value = await historyApiService.getCompletedAppointmentsByUserId(userId);
  } catch (error) {
    console.error('Error fetching completed appointments:', error);
  }
};

onMounted(() => {
  fetchCompletedAppointments();
});

const handleReviewDeleted = (reviewId) => {
  completedAppointments.value = completedAppointments.value.map(appointment => {
    if (appointment.review?.id === reviewId) {
      return { ...appointment, review: undefined };
    }
    return appointment;
  });
};
</script>

<template>
  <div class="history-list">
    <history-item
        v-for="appointment in completedAppointments"
        :key="appointment.id"
        :appointment="appointment"
        :review="appointment.review"
        @reviewDeleted="handleReviewDeleted"
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