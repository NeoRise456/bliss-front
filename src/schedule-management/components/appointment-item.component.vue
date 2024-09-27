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



  <pv-card style="width: 20rem; height: auto; overflow: hidden">
    <template #header>
      <img alt="user header" :src="schedule.img" width="320px" />
    </template>
    <template #title> {{ schedule.title }} </template>
    <template #content>
      <div>
        {{ schedule.date }}
      </div>
      <div>
        {{ schedule.time }}
      </div>
      <div>
        {{ schedule.place }}
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
</style>