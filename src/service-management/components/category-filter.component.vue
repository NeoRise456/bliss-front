
<script>


export default {
  name: "category-filter",
  components: {},
  props: {
    categories: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      selectedCategories: ['']
    };
  }
};
</script>

<template>
  <pv-card class="m-1 w-auto">
    <template #title>Categories</template>
    <template #content>
      <div class="card flex justify-center">
        <div class="flex flex-column gap-2">
          <div v-for="category in categories" :key="category.id" class="">
            <pv-checkbox v-model="selectedCategories" :inputId="category.id" name="category" :value="category.category_name" />
            <label :for="category.id">{{ category.category_name }}</label>
          </div>
        </div>
      </div>

    </template>
    <template #footer>
      <pv-button label="Filter"/>
    </template>
  </pv-card>
</template>

<style scoped>

</style>
