<script>
import { Schedule } from '../model/schedule.entity.js';

export default {
  name: 'appointment-item',
  props: {
    schedule: {
      type: Schedule,
      required: true
    }
  },
  methods: {
    redirectToAppointment(scheduleId) {
      this.$router.push({ name: 'Appointment', params: { id: scheduleId } });
    }
  }
}
</script>

<template>
  <div class="appointment-card" @click="redirectToAppointment(schedule.id)"> <!-- Evento de clic aquí -->
    <div class="appointment-content">
      <img alt="user header" :src="schedule.img" class="appointment-image" />
      <div class="appointment-details">
        <h3 class="appointment-title">{{ schedule.title }}</h3>
        <div class="appointment-info">
          <div class="date-time-container">
            <div class="date-card">{{ schedule.date }}</div>
            <div class="time-card">{{ schedule.time }}</div>
          </div>
          <p>{{ schedule.place }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appointment-card {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc; /* Añadir un borde para que se vea como una tarjeta */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para dar efecto de tarjeta */
  background-color: white;
}

.appointment-content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.appointment-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.appointment-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

.appointment-title {
  font-size: 1.5rem;
  color: black;
  margin: 5px 5px 10px;
}

.date-time-container {
  display: flex;
  gap: 10px; /* Espacio entre la tarjeta de fecha y hora */
  margin-bottom: 10px; /* Espacio entre las tarjetas y el lugar */
  color: #00aced;
}

.date-card, .time-card {
  padding: 10px;
  background-color: #f5f5f5; /* Color de fondo para que se vea como una tarjeta */
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  min-width: 100px; /* Ajusta el ancho mínimo de las tarjetas */
  text-align: center; /* Alineación centrada dentro de la tarjeta */
}

.appointment-info p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}
</style>