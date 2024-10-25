<script>
import {ServiceApiService} from "../../service-management/services/service-api.service.js";

export default {
  name: "best-companies",
  data(){
    return{
      companies: [],
    };
  },
  async mounted() {
    const serviceApiService = new ServiceApiService();
    try {
      const companiesResponse = await serviceApiService.getCompanies();
     this.companies = companiesResponse.data;
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