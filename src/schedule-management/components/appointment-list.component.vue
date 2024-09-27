<script>
import { ScheduleApiService } from "../services/schedule-api.service.js";
import AppointmentItem from "./appointment-item.component.vue";
import { Schedule } from "../model/schedule.entity.js";

export default {
  name: "appointment-list",
  components: {
    AppointmentItem
  },
  data() {
    return {
      schedules: [],
    };
  },
  created() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const scheduleApiService = new ScheduleApiService();
        const response = await scheduleApiService.getSchedules();
        this.schedules = response.data.map(schedule => new Schedule(
            schedule.img,
            schedule.id,
            schedule.title,
            schedule.date,
            schedule.time,
            schedule.place
        ));
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },
  },
}
</script>

<template>
  <div class="appointment-list-container">
    <div v-for="schedule in schedules"
         :key="schedule.id"
         class="appointment-item-container">
      <appointment-item :schedule="schedule"/>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal para las tarjetas */
/* Contenedor principal para las tarjetas */
.appointment-list-container {
  display: block; /* Forzamos que los hijos se apilen verticalmente */
  width: 100%;
}

/* Estilos para cada tarjeta individual */
.appointment-item-container {
  width: 100%; /* Asegura que cada tarjeta ocupe todo el ancho disponible */
  margin-bottom: 20px; /* Añade espacio entre cada tarjeta */
}
@media (min-width: 768px) {
  .appointment-list-container {
    flex-direction: row; /* Alinear en filas cuando la pantalla sea suficientemente grande */
  }
}

</style>