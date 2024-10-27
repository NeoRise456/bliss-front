<script>
import BusinessAppointmentItem from './business-appointment-item.component.vue';
import { BusinessAppointmentApiService } from "../services/business-appointment-api.service.js";

export default {
  name: "business-appointment-list",
  components: { BusinessAppointmentItem },
  data() {
    return {
      userList: [],
      companyId: 1,
      selectedUser: null,
      dialogVisible: false,
      cancelDialogVisible: false,
      apiService: new BusinessAppointmentApiService(),
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const appointments = await this.apiService.getAppointments();
        const filteredAppointments = appointments.filter(appointment => appointment.company === this.companyId);

        const userDetailsPromises = filteredAppointments.map(async appointment => {
          const serviceResponse = await this.apiService.getServiceById(appointment.serviceId);
          const userResponse = await this.apiService.getUserById(appointment.userId);

          if (userResponse) {
            const user = {
              id: userResponse.id,
              name: userResponse.name,
              email: userResponse.email,
              phone: userResponse.phone,
              address: userResponse.address,
            };

            user.serviceName = serviceResponse ? serviceResponse.service_name : "Unknown Service";
            user.description = serviceResponse ? serviceResponse.description : "No Description";
            user.price = serviceResponse ? serviceResponse.price : 0;
            user.duration = serviceResponse ? serviceResponse.duration : 0;
            user.rating = serviceResponse ? serviceResponse.rating : 0;
            user.sales = serviceResponse ? serviceResponse.sales : 0;
            user.img = serviceResponse ? serviceResponse.img : "";
            user.date = appointment.date;
            user.time = appointment.time;

            return user;
          }
          return null;
        });

        this.userList = (await Promise.all(userDetailsPromises)).filter(user => user !== null);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    },

    async handleCancelAppointment(userId) {
      try {
        await this.apiService.cancelAppointment(userId);
        this.userList = this.userList.filter(user => user.id !== userId);
        this.cancelDialogVisible = false;
      } catch (error) {
        console.error('Error canceling appointment:', error);
      }
    },

    openCancelDialog(user) {
      this.selectedUser = user;
      this.cancelDialogVisible = true;
    },

    closeCancelDialog() {
      this.cancelDialogVisible = false;
      this.selectedUser = null;
    },

    openUserDialog(user) {
      this.selectedUser = user;
      this.dialogVisible = true;
    },

    closeUserDialog() {
      this.dialogVisible = false;
      this.selectedUser = null;
    },
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<template>
  <div class="user-list-container">
    <div v-if="userList.length === 0">
      <p>No users available</p>
    </div>
    <div v-for="user in userList"
         :key="user.id"
         class="user-item-container"
         @click="openUserDialog(user)">
      <business-appointment-item :user="user"
                                 @open-cancel-dialog="openCancelDialog"/>
    </div>

    <div v-if="dialogVisible" class="dialog-overlay" @click="closeUserDialog">
      <div class="dialog-card" @click.stop>
        <h3>User Details</h3>
        <p><strong>Name:</strong> {{ selectedUser?.name }}</p>
        <p><strong>Email:</strong> {{ selectedUser?.email }}</p>
        <p><strong>Phone:</strong> {{ selectedUser?.phone }}</p>
        <p><strong>Address:</strong> {{ selectedUser?.address }}</p>
        <button @click="closeUserDialog">Close</button>
      </div>
    </div>

    <div v-if="cancelDialogVisible" class="dialog-overlay" @click="closeCancelDialog">
      <div class="dialog-card" @click.stop>
        <h3>Confirm Cancellation</h3>
        <p>Are you sure you want to cancel this appointment?</p>
        <button @click="handleCancelAppointment(selectedUser.id)" class="confirm-button">Yes, Cancel</button>
        <button @click="closeCancelDialog" class="cancel-button">No, Go Back</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-list-container {
  display: block;
  width: 100%;
  color: black;
}

.user-item-container {
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

.dialog-card button {
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.3125rem;
}

.dialog-card .confirm-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
}

.dialog-card .confirm-button:hover {
  background-color: #ff1a1a;
}

.dialog-card .cancel-button {
  background-color: #ccc;
  color: black;
  border: none;
}

.dialog-card .cancel-button:hover {
  background-color: #999;
}

</style>