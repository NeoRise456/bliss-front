<script>
import BusinessAppointmentItem from './business-appointment-item.component.vue';
import {BusinessAppointmentApiService} from "../services/business-appointment-api.service.js";

export default {
  name: "business-appointment-list",
  components: { BusinessAppointmentItem },
  data() {
    return {
      userList: [],
      companyId: 1,
      selectedUser: null,
      dialogVisible: false,
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

            return user;
          }
          return null;
        });

        this.userList = (await Promise.all(userDetailsPromises)).filter(user => user !== null);
      } catch (error) {
        console.error("Error loading users:", error);
      }
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
      <business-appointment-item :user="user"/>
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
</style>