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
  <div style="margin: 6rem 0rem; display: flex; ">
    <div>
      <category-filter/>
      <price-filter/>
    </div>
    <div>
      <service-list/>
    </div>
  </div>
</template>

<style>

</style>