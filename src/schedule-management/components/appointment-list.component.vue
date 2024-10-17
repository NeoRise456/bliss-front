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
      userId: 1 // Inicializamos userId
    };
  },
  created() {
    console.log('User ID in created hook:', this.userId); // Verifica aquí
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const scheduleApiService = new ScheduleApiService();
        const response = await scheduleApiService.getSchedules();

        console.log('API Response:', response.data); // Mostrar la respuesta de la API
        console.log('User ID to compare:', this.userId); // Verificar el userId a comparar

        response.data.forEach(schedule => {
          console.log('Schedule User ID:', schedule.userId); // Verifica los userIds en la API
        });

        this.schedules = response.data
            .filter(schedule => schedule.userId === this.userId) // Eliminar parseInt si userId es un número
            .map(schedule => new Schedule(
                schedule.img,
                schedule.id,
                schedule.title,
                schedule.date,
                schedule.time,
                schedule.place
            ));
        console.log('Filtered Schedules:', this.schedules); // Verificar que se hayan filtrado correctamente


      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },
  },
}
</script>

<template>
  <div class="appointment-list-container">
    <div v-if="schedules.length === 0">
      <p>{{ $t('appointment.noAppointments') }}</p>
    </div>
    <div v-for="schedule in schedules"
         :key="schedule.id"
         class="appointment-item-container">
      <appointment-item :schedule="schedule"/>
    </div>
  </div>
</template>

<style scoped>
.appointment-list-container {
  display: block; /* Forzamos que los hijos se apilen verticalmente */
  width: 100%;
  color: black;
}

/* Estilos para cada tarjeta individual */
.appointment-item-container {
  width: 100%;
  margin-bottom: 20px; /* Añade espacio entre cada tarjeta */
}

@media (min-width: 768px) {
  .appointment-list-container {
    flex-direction: row; /* Alinear en filas cuando la pantalla sea suficientemente grande */
  }
}
</style>