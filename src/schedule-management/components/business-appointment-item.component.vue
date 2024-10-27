<script>
export default {
  name: 'business-appointment-item',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    openCancelDialog() {
      this.$emit('open-cancel-dialog', this.user);
    }
  }
}
</script>

<template>
  <div class="user-card">
    <div class="user-content">
      <img :src="user.img" alt="Service Image" class="user-image" />
      <div class="user-details">
        <div class="appointment-info">
          <h3 class="section-title">Appointment</h3>
          <p><strong>Date:</strong> {{ user.date }}</p>
          <p><strong>Time:</strong> {{ user.time }}</p>
        </div>
        <hr class="divider" />
        <div class="service-info">
          <h3 class="section-title">Service: {{ user.serviceName }}</h3>
          <p><strong>Description:</strong> {{ user.description }}</p>
          <p><strong>Price:</strong> ${{ user.price }}</p>
          <p><strong>Duration:</strong> {{ user.duration }} mins</p>
          <p><strong>Rating:</strong> {{ user.rating }}</p>
        </div>
        <hr class="divider" />
        <div class="user-info">
          <h3 class="section-title">User: {{ user.name }}</h3>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Phone:</strong> {{ user.phone }}</p>
          <p><strong>Address:</strong> {{ user.address }}</p>
        </div>
        <div class="button-container">
          <button @click.stop="openCancelDialog" class="cancel-button">Cancel Appointment</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.user-content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.user-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

.section-title {
  font-size: 1.5rem;
  color: black;
  margin: 5px 0 10px;
}

.divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ccc;
}

.appointment-info p,
.service-info p,
.user-info p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 0.625rem;
}

.cancel-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  font-size: 1rem;
  width: 12rem;
  text-align: center;
}

.cancel-button:hover {
  background-color: #ff1a1a;
}
</style>