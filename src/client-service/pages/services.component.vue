<script>
import serviceListComponent from "../components/service-list.component.vue";
import ServiceList from "../components/service-list.component.vue";
import PriceFilter from "../components/price-filter.component.vue";
import CategoryFilter from "../components/category-filter.component.vue";

export default {
  name: "services",
  components: {CategoryFilter, PriceFilter, ServiceList, serviceListComponent}
}
</script>

<template>
  <div class="flex m-5">
    <div class="flex-1 text-center p-4">
      <category-filter/>
      <price-filter/>
    </div>
    <div class="flex-1  text-center p-4  mx-4">
      <service-list/>
    </div>
  </div>
</template>

<style>

</style>