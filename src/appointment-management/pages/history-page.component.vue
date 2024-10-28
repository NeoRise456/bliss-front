<script>
import HistoryList from '../components/history-list.component.vue';

export default {
  name: 'history-page',
  components: {
    HistoryList
  }
};
</script>

<template>
  <div class="history-page">
    <h1>Completed Appointments</h1>
        <HistoryList/>
  </div>
</template>

<style scoped>

.history-page {
  margin-top: 0px; /* Resetea el margen superior */
  padding: 16px;
  width: 100%;
  max-width: 800px; /* Controla el ancho máximo del contenido */
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.parent-container {
  display: flex;
  flex-direction: column; /* Asegúrate de que el contenido esté en columna */
  justify-content: flex-start; /* Esto moverá el contenido hacia la parte superior */
  align-items: center; /* Si deseas centrar horizontalmente */
  min-height: 100vh; /* Asegúrate de que no se estire al 100% de la altura */
}

html, body {
  height: 100%; /* Esto asegura que el body ocupe el 100% del alto de la ventana */
}


</style>