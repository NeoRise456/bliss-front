<script>
import { Service } from "../model/service.entity.js";
import { ServiceApiService } from "../services/service-api.service.js";

export default {
  name: "edit-business-service",
  props: {
    serviceId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      service: new Service(),
      serviceName: null,
      duration: null,
      price: null,
      description: null,
      selectedCategory: null,
      categories: [
        {name: '1', cname: '1'},
        {name: '2', cname: '2'},
        {name: '3', cname: '3'}
      ]
    };
  },
  methods: {
    async fetchService() {
      try {
        const serviceApiService = new ServiceApiService();
        const response = await serviceApiService.getServiceById(parseInt(this.serviceId));
        this.service = new Service(
          response.data.id,
          response.data.category_id,
          response.data.company_id,
          response.data.service_name,
          response.data.description,
          response.data.price,
          response.data.duration,
          response.data.rating,
          response.data.sales,
          response.data.created_at,
          response.data.img
        );
        console.log('Service:', this.service);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    }
  },
  created() {
    this.fetchService();
  }
}
</script>

<template>
  <pv-card class="w-auto p-5 custom-card-3 bg-gray-50">
    <template #header>
      <div>
        <h2 class ="title">{{$t('editService.title')}}</h2>
      </div>
    </template>
    <template #content>
      <div style="text-align: left">
        <h2 style="font-weight: normal;">{{$t('editService.serviceName')}}</h2>
        <pv-input-text style="background-color: white; color: black; width: 100%" type="text" v-model="serviceName" :placeholder="service.service_name" class="custom-text-input"/>
      </div>
      <div style="text-align: left">
        <h2 style="font-weight: normal;">{{$t('editService.serviceCategory')}}</h2>
        <pv-cascade-select style="background-color: white; color: black; width: 100%" v-model="selectedCategory" :options="categories" optionLabel="cname" optionGroupLabel="name"
                           optionGroupChildren="children" :placeholder="service.category_id" class="custom-cascade-select" />
      </div>
      <div style="text-align: left">
        <h2 style="font-weight: normal;">{{$t('editService.serviceDuration')}}</h2>
        <pv-input-number style="background: white!important; color: black" v-model="duration" mode="decimal" showButtons :min="40" :max="180" fluid :placeholder="service.duration" />
      </div>
      <div style="text-align: left">
        <h2 style="font-weight: normal;">{{$t('editService.servicePrice')}}</h2>
        <pv-input-number style="background-color: white; color: black" v-model="price" inputId="currency-us" :min="0" mode="currency" currency="USD" locale="en-US" fluid
                         :placeholder="service.price" />
      </div>
      <div style="text-align: left">
        <h2 style="font-weight: normal;">{{$t('editService.serviceDescription')}}</h2>
        <pv-textarea v-model="description" rows="10" cols="75" style="background-color: white; color: black" :placeholder="service.description" />
      </div>
    </template>
    <template #footer>
      <pv-button :label="$t('editService.editButton')" class="mt-5" style="background-color: #37123C; color: white" @click="updateService" />
    </template>
  </pv-card>
</template>

<style scoped>
  .custom-card-3 {
    font-family: 'Montserrat', sans-serif;
    color: #37123C;
  }
</style>