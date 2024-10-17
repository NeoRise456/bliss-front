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
    <HistoryList />
  </div>
</template>

<style scoped>
.history-page {
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}
</style>