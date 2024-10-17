<script>

import {ServiceApiService} from "../services/service-api.service.js";
import {Service} from "../model/service.entity.js";


export default {
  name: "client-service-detail",
  components: {},
  data() {
    return {
      service: Service
    };
  },
  created() {
    const serviceId = this.$route.params.id;
    const serviceApi = new ServiceApiService();
    serviceApi.getService(serviceId)
        .then(response => {
          this.service = response.data;
          console.log(this.service);
        })
        .catch(error => {
          console.error("There was an error fetching the service:", error);
        });
  }
};
</script>

<template>
  <div style="margin-top: 10rem; background-color: #1a1a1a; padding: 5rem; border-radius: 1rem;">
    <div style="display: flex; gap: 1rem">
      <div>
        <img :src="service.img" alt="Service Image" />
      </div>
      <div>
        <h1>{{ service.service_name }}</h1>
        <p>{{ $t('clientServiceDetail.description') }}: {{ service.description }}</p>
        <p>{{ $t('clientServiceDetail.price') }}: {{ service.price }}</p>
        <p>{{ $t('clientServiceDetail.duration') }}: {{ service.duration }}</p>
      </div>
    </div>
    <div class="mt-7">
      <pv-button :label="$t('clientServiceDetail.bookNow')" class="w-full" />
    </div>
  </div>
</template>

<style scoped>
/* Add any necessary styles here */
</style>