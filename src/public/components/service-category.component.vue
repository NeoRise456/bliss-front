<script>
import {CategoryApiService} from "../../service-management/services/category-api.service.js";
import {ServiceApiService} from "../../service-management/services/service-api.service.js";

export default {
  name: "service-category",
  data() {
    return {
      categories: [],
      servicesByCategory: {},
    };
  },
  methods: {
    async fetchServicesByCategory() {
      const categoryApiService = new CategoryApiService();
      const serviceApiService = new ServiceApiService();

      try {
        // Obtención de las categorías
        const categoriesResponse = await categoryApiService.getCategories();
        this.categories = categoriesResponse.data;

        // Obtención de todos los servicios
        const servicesResponse = await serviceApiService.getServices();
        const allServices = servicesResponse.data;

        // Filtrado de los servicios por categoría
        for (const category of this.categories) {
          this.servicesByCategory[category.id] = allServices.filter(
              service => service.category_id === category.id
          );
        }

      } catch (error) {
        console.error("Error loading categories or services: ", error);
      }
    }
  },
  mounted() {
    this.fetchServicesByCategory();
  }
};

</script>

<template>
  <div class="p-m-4">
    <div v-for="category in categories" :key="category.id" class="category-container p-mb-4">
      <h2 class="p-text-center">{{category.category_name}}</h2>
      <div class="services-container p-d-flex" ref="servicesContainer{{category.id}}">
        <pv-card
            v-for="service in servicesByCategory[category.id]"
            :key="service.id"
            class="service-card p-shadow-2 p-mr-2"
        >
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

.p-m-4 {
  padding: 16px;
}

.category-container {
  margin-bottom: 24px;
}

.services-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.service-card {
  min-width: 250px;
  flex: 1 1 250px;
  margin-bottom: 16px;
  background-color: #E24084;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: scale(1.05);
}

.service-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.p-text-center {
  text-align: center;
  color: #1a1a1a;
}

.p-mb-4 {
  margin-bottom: 16px;
}

.p-mt-2 {
  margin-top: 8px;
}

.p-shadow-2 {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
}

</style>
