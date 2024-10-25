<script>
import { Appointment } from "../model/appointment.entity.js";

export default {
  name: "history-item",
  props: {
    appointment: {
      type: Appointment,
      required: true
    }
  }
};
</script>

<template>
  <div class="history-card">
    <div class="history-content">
      <h3 class="service-name">{{ appointment.serviceName }}</h3>
      <p class="company-name">{{ appointment.companyName }}</p>
      <p class="appointment-date">{{ appointment.date }}</p>
      <p class="appointment-time">{{ appointment.time }}</p>
    </div>
  </div>
</template>

<style scoped>
.history-card {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.history-content {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.service-name {
  font-size: 1.5rem;
  color: black;
  margin: 5px 0;
}

.company-name, .appointment-date, .appointment-time {
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
}
</style>