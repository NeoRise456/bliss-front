<script setup>
import { ref, onMounted } from 'vue';
import HistoryItem from './history-item.component.vue';
import { HistoryApiService } from '../services/history.service.js';
import { Appointment } from '../model/appointment.entity.js';
import { Review } from '../../review/model/review.entity.js';

const userId = 1; // Temporary user id for testing the component
const completedAppointments = ref([]);
const historyApiService = new HistoryApiService();

const fetchCompletedAppointments = async () => {
  try {
    const appointments = await historyApiService.getCompletedAppointmentsByUserId(userId);
    completedAppointments.value = appointments.map(appointment => {
      const newAppointment = new Appointment(
          appointment.id,
          appointment.userId,
          appointment.serviceId,
          appointment.companyId,
          appointment.reservationDate,
          appointment.status,
          appointment.date,
          appointment.time,
          appointment.review ? new Review(appointment.review) : null
      );
      newAppointment.serviceName = appointment.serviceName;
      newAppointment.companyName = appointment.companyName;
      newAppointment.review = appointment.review ? new Review(appointment.review) : null; // Add review property

      return newAppointment;
    });
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