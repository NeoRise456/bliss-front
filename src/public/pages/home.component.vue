<script>

import BestService from "../components/best-service.component.vue";
import ServiceCategory from "../components/service-category.component.vue";
import BestCompanies from "../components/best-companies.component.vue";

export default {
  name: "home",
  components: {BestCompanies, ServiceCategory, BestService}
}
</script>

<template>
  <best-service/>
  <service-category/>
  <best-companies/>
</template>

<style>

</style>