<script>
import {ServiceApiService} from "../../service-management/services/service-api.service.js";

export default {
  name: "best-companies",
  data(){
    return{
      companies: [],
      services: [],
    };
  },
  async mounted() {
    const serviceApiService = new ServiceApiService();
    try {
      const servicesResponse = await serviceApiService.getServices();
      const companiesResponse = await serviceApiService.getCompanies();

      this.services = servicesResponse.data;
      this.companies = companiesResponse.data;

      const companyRatings = {};

      this.services.forEach(service => {
        if (!companyRatings[service.company_id]) {
          companyRatings[service.company_id] = {totalRating: 0, serviceCount: 0};
        }

        companyRatings[service.company_id].totalRating += service.rating;
        companyRatings[service.company_id].serviceCount++;

      })

    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<template>

</template>

<style scoped>

</style>