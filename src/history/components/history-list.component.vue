<script setup>
import { ref, onMounted } from 'vue';
import { Appointment } from "../model/appointment.entity.js";
import HistoryItem from './history-item.component.vue';
import http from "../../shared/services/http-common.js";

const userId = 1; // Temporary user id for testing the component
const completedAppointments = ref([]);

const getCompanyId = async (id) => {
  return http.get(`/companies/${id}`);
};

const getService = async (id) => {
  return http.get(`/services/${id}`);
};

const getCompletedAppointmentsByUserId = async (userId) => {
  try {
    const response = await http.get('/appointments');
    const appointments = response.data.filter(appointment => appointment.userId === userId && appointment.status === "completed");

    const appointmentDetailsPromises = appointments.map(async appointment => {
      const serviceResponse = await getService(appointment.serviceId);
      const companyResponse = await getCompanyId(appointment.company);

      return new Appointment(
          appointment.id,
          appointment.userId,
          appointment.serviceId,
          appointment.company,
          appointment.reservationDate,
          appointment.status,
          appointment.payment,
          appointment.schedule,
          serviceResponse.data.service_name,
          companyResponse.data.name
      );
    });

    completedAppointments.value = await Promise.all(appointmentDetailsPromises);
  } catch (error) {
    console.error('Error fetching completed appointments:', error);
  }
};

onMounted(() => {
  getCompletedAppointmentsByUserId(userId);
});
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