<script>
import {ServicesApiService} from "../services/services-api.service.js";
import ServiceItem from "./client-service-item.component.vue";
import {Service} from "../model/service.entity.js";

export default {
  name: "service-list",
  components: {
    ServiceItem
  },
  data() {
    return {
      services: [],
    };
  },
  created() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const serviceApiService = new ServicesApiService();
        const response = await serviceApiService.getServices();
        this.services = response.data.map(service => new Service(
          service.id,
          service.category_id,
          service.company_id,
          service.service_name,
          service.description,
          service.price,
          service.duration,
          service.rating,
          service.sales,
          service.created_at,
          service.img
        ));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
  },

}
</script>

<template>

  <div>
    <h1>Services</h1>

    <div style="display: flex; flex-wrap: wrap; gap: 3rem;">
      <service-item  v-for="service in services"
                     :key="service.id"
                     :service="service"/>
    </div>


  </div>
</template>

<style scoped>

</style>