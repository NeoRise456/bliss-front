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
  <pv-card class="bg-white item-card">
    <template #header>
      <div style="padding: 10px">
        <img alt="user header" :src="service.img" width="300px"/>
      </div>
    </template>
    <template #title>
      <div class="content-text">
        {{ service.service_name }}
      </div>
    </template>
    <template #content>
      <div class="content-text">
        {{ service.description }}
      </div>
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
  .item-card{
    width:20rem;
    height: auto;
    overflow:hidden;
    border-style: solid;
    border-color: black;
    border-width: 1px;
  }
  .content-text {
    color: #37123C;
  }
</style>