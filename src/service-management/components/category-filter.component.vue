<script>
import { ServicesApiService } from "../services/services-api.service.js";

export default {
  name: "category-filter",
  data() {
    return {
      categories: [],
      selectedCategories: ['']
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const serviceApiService = new ServicesApiService();
        const response = await serviceApiService.getCategories();
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  }
};
</script>

<template>
  <pv-card style="width: 25rem; margin: 1rem;">
    <template #title>{{ $t('categoryFilter.title') }}</template>
    <template #content>
      <div class="card flex justify-center">
        <div class="flex flex-column gap-2">
          <div v-for="category in categories" :key="category.id">
            <pv-checkbox v-model="selectedCategories" :inputId="category.id" name="category"
                         :value="category.category_name"/>
            <label :for="category.id">{{ category.category_name }}</label>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <pv-button :label="$t('categoryFilter.filterButton')"/>
    </template>
  </pv-card>
</template>

<style scoped>
</style>