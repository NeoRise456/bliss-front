<script>
import appointmentsListComponent from "../components/appointment-list.component.vue";
import appointmentList from "../components/appointment-list.component.vue";

export default {
  name: "appointment-service",
  components: {appointmentList, appointmentsListComponent},
  data() {
    return {
      userId: null // Inicializamos userId
    };
  },
  created() {
    this.userId = this.$route.params.userId; // Obtener userId de la ruta
  }
}
</script>

<template>
  <pv-card class="custom-card">
    <template #header>
      <h1 class="title">Appointments</h1>
    </template>
    <template #content>
      <div class="appointment-container">
        <appointment-list :userId="userId"/>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.custom-card {
  background-color: white; /* Fondo blanco para la tarjeta */
  width: 100%;
  margin: 0 auto; /* Centra la tarjeta horizontalmente */
  padding: 20px;
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para darle efecto de profundidad */
}

.appointment-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Asegura que el contenido comience desde arriba */
  padding-bottom: 40px; /* Espacio en la parte inferior para crecer hacia abajo */
}

.title {
  text-align: left;
  margin-top: 50px; /* Aumenta el margen superior para bajar el título */
  margin-bottom: 1px; /* Esto asegura que haya espacio entre el título y el contenido */
  color: black; /* Letra del título en color negro */

}
</style>