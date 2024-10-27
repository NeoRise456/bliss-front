<script>
import AppointmentItem from './appointment-item.component.vue';
import http from "../../shared/services/http-common.js";
import { Appointment } from "../../history/model/appointment.entity.js";

export default {
  name: "appointment-list",
  components: { AppointmentItem },
  data() {
    return {
      pendingAppointments: [],
      userId: 1,
      selectedAppointment: null,
      dialogVisible: false,
    };
  },
  methods: {
    async getCompanyId(id) {
      try {
        const response = await http.get(`/companies/${id}`);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`Company with id ${id} not found`);
        } else {
          console.error(`Error fetching company with id ${id}:`, error);
        }
        return null;
      }
    },

    async getService(id) {
      try {
        const response = await http.get(`/services/${id}`);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`Service with id ${id} not found`);
        } else {
          console.error(`Error fetching service with id ${id}:`, error);
        }
        return null;
      }
    },

    async getPendingAppointmentsByUserId(userId) {
      try {
        const response = await http.get('/appointments');
        const appointments = response.data.filter(appointment => appointment.userId === userId && appointment.status === "PENDING");

        const appointmentDetailsPromises = appointments.map(async appointment => {
          const serviceResponse = await this.getService(appointment.serviceId);
          const companyResponse = await this.getCompanyId(appointment.company);

          return new Appointment(
              appointment.id,
              appointment.userId,
              appointment.serviceId,
              appointment.company,
              appointment.reservationDate,
              appointment.status,
              appointment.date,
              appointment.time,
              appointment.payment,
              appointment.schedule,
              serviceResponse ? serviceResponse.service_name : 'Unknown Service',
              companyResponse ? companyResponse.name : 'Unknown Company'
          );
        });

        this.pendingAppointments = await Promise.all(appointmentDetailsPromises);
      } catch (error) {
        console.error('Error fetching pending appointments:', error);
      }
    },

    openAppointmentDialog(appointment) {
      console.log(appointment);
      this.selectedAppointment = appointment;
      this.dialogVisible = true;
    },

    closeAppointmentDialog() {
      this.dialogVisible = false;
      this.selectedAppointment = null;
    },
  },
  created() {
    this.getPendingAppointmentsByUserId(this.userId);
  }
};
</script>


<template>
  <div class="appointment-list-container">
    <div v-if="pendingAppointments.length === 0">
      <p>No appointments available</p>
    </div>
    <div v-for="appointment in pendingAppointments"
         :key="appointment.id"
         class="appointment-item-container"
         @click="openAppointmentDialog(appointment)">
      <appointment-item :appointment="appointment"/>
    </div>

    <div v-if="dialogVisible" class="dialog-overlay" @click="closeAppointmentDialog">
      <div class="dialog-card" @click.stop>
        <h3>Appointment Details</h3>
        <p><strong>Service:</strong> {{ selectedAppointment?.serviceName }}</p>
        <p><strong>Company:</strong> {{ selectedAppointment?.companyName }}</p>
        <p><strong>Date:</strong> {{ selectedAppointment?.date }}</p>
        <p><strong>Time:</strong> {{ selectedAppointment?.time }}</p>
        <button @click="closeAppointmentDialog">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appointment-list-container {
  display: block;
  width: 100%;
  color: black;
}

.appointment-item-container {
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.dialog-card h3 {
  margin-top: 0;
}

.dialog-card p {
  margin: 10px 0;
}

.card-content {
  padding: 16px;
}

.mt-3 {
  margin-top: 1rem;
}

.appointment-details {
  background-color: #f9f9f9;
  padding: 15px;
  margin-top: 10px;
  border: 1px solid #ddd;
}

@media (min-width: 768px) {
  .appointment-list-container {
    flex-direction: row;
  }
}
</style>
