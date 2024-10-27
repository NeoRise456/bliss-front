<script>
import BusinessAppointmentItem from './business-appointment-item.component.vue';
import { User } from "../model/business-appointment.entity.js";
import http from "../../shared/services/http-common.js";

export default {
  name: "business-appointment-list",
  components: { BusinessAppointmentItem },
  data() {
    return {
      userList: [],
      companyId: 1,
      selectedUser: null,
      dialogVisible: false,
    };
  },
  methods: {
    async getUserDetails(userId) {
      try {
        const response = await http.get(`/users/${userId}`);
        return response.data;
      } catch (error) {
        return null;
      }
    },

    async getService(serviceId) {
      try {
        const response = await http.get(`/services/${serviceId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching service:', error);
        return null;
      }
    },


    async getUsersByCompanyId(companyId) {
      try {
        const response = await http.get('/appointments');
        const appointments = response.data.filter(appointment => appointment.company === companyId);
        const userDetailsPromises = appointments.map(async appointment => {
          const serviceResponse = await this.getService(appointment.serviceId);
          const userResponse = await this.getUserDetails(appointment.userId);

          if (userResponse) {
            return new User(
                userResponse.id,
                userResponse.name,
                userResponse.email,
                userResponse.phone,
                userResponse.address,
                serviceResponse ? serviceResponse.service_name : 'Unknown Service'
            );
          }
          return null;
        });
        this.userList = (await Promise.all(userDetailsPromises)).filter(user => user !== null);
      } catch (error) {
        console.error('Error fetching users for company:', error);
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
    this.getUsersByCompanyId(this.companyId);
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