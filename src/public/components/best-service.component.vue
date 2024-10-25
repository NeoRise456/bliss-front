<script>
import {ServiceApiService} from "../../service-management/services/service-api.service.js";

export default {
  name: "best-service",
  data() {
    return {
      services: [],
    };
  },
  async mounted() {
    const serviceApiService = new ServiceApiService();
    try{
      const servicesResponse = await serviceApiService.getServices();
      this.services = servicesResponse.data;
    } catch (error) {
      console.error("Error loading best services: ",error);
    }
  }
}
</script>

<template>

</template>

<style scoped>

</style>