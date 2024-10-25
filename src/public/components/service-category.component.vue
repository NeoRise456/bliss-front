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

</template>

<style scoped>

</style>