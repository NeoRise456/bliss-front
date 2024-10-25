<script>
import {CategoryApiService} from "../../service-management/services/category-api.service.js";

export default {
  name: "service-category",
  data(){
    return {
      categories: [],
    };
  },
  async mounted(){
    const categoryApiService = new CategoryApiService();
    try {
      const categoriesResponse = await categoryApiService.getCategories();
      this.categories = categoriesResponse.data;
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