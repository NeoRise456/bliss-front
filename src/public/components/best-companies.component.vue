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
      // suma de ranting y el conteo de servicio por empresa
      const companyRatings = {};

      this.services.forEach(service => {
        if (!companyRatings[service.company_id]) {
          companyRatings[service.company_id] = {totalRating: 0, serviceCount: 0};
        }

        companyRatings[service.company_id].totalRating += service.rating;
        companyRatings[service.company_id].serviceCount++;

      })

      // calculo de promedio de rating por empresa
      const companyAvgRating = Object.keys(companyRatings).map(companyId =>{
        const avgRating = companyRatings[companyId].totalRating / companyRatings[companyId].serviceCount;
        return {companyId: parseInt(companyId), avgRating};
      })

      const topCompanyIds = companyAvgRating
          .sort((a,b)=> b.avgRating - a.avgRating)
          .slice(0,3)
          .map(item => item.companyId);

      this.companies = this.companies.filter(company => topCompanyIds.includes(company.id));



    } catch (e) {
      console.error("Error loading services and companies:",e);
    }
  }
}
</script>

<template>

</template>

<style scoped>

</style>