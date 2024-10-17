<script>
import appointmentsListComponent from "../components/appointment-list.component.vue";
import appointmentList from "../components/appointment-list.component.vue";

export default {
  name: "appointment-service",
  components: { appointmentList, appointmentsListComponent },
  data() {
    return {
      userId: null // Initialize userId
    };
  },
  created() {
    this.userId = this.$route.params.userId; // Get userId from the route
  }
}
</script>

<template>
  <pv-card class="custom-card">
    <template #header>
      <h1 class="title">{{ $t('appointment.appointments') }}</h1>
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
  background-color: white; /* White background for the card */
  width: 100%;
  margin: 0 auto; /* Center the card horizontally */
  padding: 20px;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth effect */
}

.appointment-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Ensure content starts from the top */
  padding-bottom: 40px; /* Space at the bottom to grow downwards */
}

.title {
  text-align: left;
  margin-top: 50px; /* Increase top margin to lower the title */
  margin-bottom: 1px; /* Ensure space between title and content */
  color: black; /* Black title text */
}
</style>