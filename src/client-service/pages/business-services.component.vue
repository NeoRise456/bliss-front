<script>
import ServiceList from "../components/client-service-list.component.vue";
import BusinessServiceList from "../components/business-service-list.component.vue";

export default {
  name: "business-services",
  components: {BusinessServiceList, ServiceList}
}
</script>

<template>
  <div>
    <div>
      <p style="color: black">Our Services</p>
    </div>
    <business-service-list></business-service-list>
    <div>
      <pv-button icon="pi pi-plus"
                 icon-pos="right"
                 label="Add service"
                 class="w-full custom-purple-button"
      />
    </div>
  </div>
</template>

<style scoped>
  .custom-purple-button{
    background-color: #37123C;
    border-color: #37123C;
    color: #ffffff;
  }
</style>