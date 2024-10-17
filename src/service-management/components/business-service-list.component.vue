<script>
import BusinessServiceItem from "./business-service-item.component.vue";

export default {
  name: "business-service-list",
  components: {
    BusinessServiceItem
  },
  data() {
    return {
      services: []
    };
  },
  created() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        this.services = data.map(service => ({
          img: service.img,
          id: service.id,
          service_name: service.service_name,
          description: service.description
        }));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }
  }
}
</script>

<template>
  <div class="service-list-container">
    <div v-if="services.length === 0">
      <p>{{ $t('businessService.noServices') }}</p>
    </div>
    <div v-for="service in services"
         :key="service.id"
         class="service-item-container">
      <business-service-item :service="service"/>
    </div>
  </div>
</template>

<style scoped>
.service-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.service-item-container {
  width: 100%;
  max-width: 300px;
}
</style>