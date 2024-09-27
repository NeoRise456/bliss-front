<script>
import {Service} from "../model/service.entity.js";


export default {
  name: "business-service-item",
  components: {},
  props:{
    service:{
      type: Service,
      required: true
    }
  },
  methods :{
    redirectToServiceDetail(serviceId){
      this.$router.push({name:'Business-Service', params:{id:serviceId}});
    }
  }
}
</script>

<template>
  <pv-card style="width:20rem; height: auto; overflow:hidden">
    <template #header>
      <img alt="user header" :src="service.img" width="320px"/>
    </template>
    <template #title> {{ service.service_name }}</template>
    <template #content>
      <p class="m-0">
        {{ service.description }}
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <pv-button icon="pi pi-pencil"
                   icon-pos="right"
                   label="Edit"
                   class="w-full"
                   @click="redirectToServiceDetail(service.id)"/>
        <pv-button icon="pi pi-delete-left"
                   icon-pos="right"
                   label="Delete"
                   class="w-full"
                   severity="danger"
                   />
      </div>
    </template>
  </pv-card>
</template>

<style scoped>

</style>