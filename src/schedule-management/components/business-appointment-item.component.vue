<script>
export default {
  name: 'business-appointment-item',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="user-card">
    <div class="user-content">
      <div class="user-details">
        <h3 class="user-title">{{ user.name }}</h3>
        <div class="user-info">
          <p><strong>Service:</strong> {{ user.serviceName }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Phone:</strong> {{ user.phone }}</p>
          <p><strong>Address:</strong> {{ user.address }}</p>
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

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

.user-title {
  font-size: 1.5rem;
  color: black;
  margin: 5px 5px 10px;
}

.user-info p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}
</style>