<script>
import {ServiceApiService} from "../../service-management/services/service-api.service.js";

export default {
  name: "best-service",

  data() {
    return {
      services: [],
      bestService: null,
    };
  },
  async mounted() {
    const serviceApiService = new ServiceApiService();
    try{
      const servicesResponse = await serviceApiService.getServices();
      this.services = servicesResponse.data;

      if (this.services.length > 0) {
        const sortedServices = this.services.sort((a, b) => b.rating - a.rating);
        this.bestService = sortedServices[0];
      }

    } catch (error) {
      console.error("Error loading best services: ",error);
    }
  }
}
</script>

<template>
  <div v-if="bestService" class="best-service-container flex justify-content-center">
    <pv-card>
      <template #title>
        <h2>{{ bestService.service_name }}</h2>
      </template>
      <template #content>
        <div class="flex align-items-center gap-4">
          <img :src="bestService.img" alt="Imagen del servicio" class="service-img" style="width: 100px; height: auto; border-radius: 8px;" />
          <div>
            <p class="p-mt-2">{{$t('servicesHome.price')}}: ${{bestService.price}}</p>
            <p class="p-mt-2">{{$t('servicesHome.duration')}}: {{bestService.duration}} min</p>
            <p class="p-mt-2">{{$t('servicesHome.sales')}}: {{bestService.sales}}</p>
            <p class="p-mt-2">{{$t('servicesHome.rating')}}: {{bestService.rating}}</p>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
  <div v-else class="flex justify-content-center">
    <p>Error</p>
  </div>
</template>

<style scoped>

</style>