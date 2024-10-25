<script>
import {CategoryApiService} from "../../service-management/services/category-api.service.js";
import {ServiceApiService} from "../../service-management/services/service-api.service.js";


export default {
  name: "service-category",
  data(){
    return {
      categories: [],
      servicesByCategory: {},
    };
  },
  async mounted(){
    const categoryApiService = new CategoryApiService();
    const serviceApiService = new ServiceApiService();

    try {
      // Obtención de las categories
      const categoriesResponse = await categoryApiService.getCategories();
      this.categories = categoriesResponse.data;
      // Obtención de todos los servicios
      const servicesResponse = await serviceApiService.getServices();
      const allServices = servicesResponse.data;

      // Filtrado de los servicios por categoría
      for (const category of this.categories) {
        this.servicesByCategory[category.id] =
            allServices.filter(
                service =>
                    service.category_id === category.id
            );
      }

    } catch (error) {
      console.error("Error loading categories or services: ",error);
    }
  }

}
</script>

<template>
  <div class="p-m-4">
    <div v-for="category in categories" :key="category.id" class="category-container p-mb-4">
      <h2 class="p-text-center">{{category.name}}</h2>
      <div class="services-container p-d-flex p-flex-nowrap p-overflow-x-auto" ref="servicesContainer{{category.id}}">
        <pv-card
            v-for="service in servicesByCategory[category.id]"
            :key="service.id"
            class="sercice-card p-shadow-2 p-mr-2">
          <template #header>
            <img :src="service.img" alt="Service image" class="service-img"/>
          </template>
          <template #title>
            {{service.service_name}}
          </template>
          <template #content>
            <p>{{service.description}}</p>
            <p class="p-mt-2">{{$t('servicesHome.price')}}: ${{service.price}}</p>
            <p class="p-mt-2">{{$t('servicesHome.duration')}}: {{service.duration}} min</p>
            <p class="p-mt-2">{{$t('servicesHome.sales')}}: {{service.sales}}</p>
            <p class="p-mt-2">{{$t('servicesHome.rating')}}: {{service.rating}}</p>
          </template>
        </pv-card>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>