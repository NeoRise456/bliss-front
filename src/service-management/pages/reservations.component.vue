<script>
import {ServiceApiService} from "../services/service-api.service.js";
import {Service} from "../model/service.entity.js";



export default {
  name: "reservations",
  components: {},
  data(){
    return {
      serviceId: this.$route.params.id,
      bookingService: Service,
      serviceApiService: new ServiceApiService(),
      date: new Date(),
      time: new Date(),
    }
  },
  methods: {
    buildServiceFromResponseData(service) {
      return new Service(
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
      )
    },
    async getBookingService(){
      const response = await this.serviceApiService.getServiceById(this.serviceId);
      this.bookingService = this.buildServiceFromResponseData(response.data);
    }
  },
  created(){
    this.getBookingService();
  }

}
</script>

<template>

</template>

<style scoped>

</style>