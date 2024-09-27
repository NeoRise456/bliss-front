<script>
import {ServicesApiService} from "../services/services-api.service.js";
import {Service} from "../model/service.entity.js";

export default {
  name: "client-service-detail",
  components: {},
  data(){
    return {
      service: Service
    }
  },
  created() {
    const serviceId = this.$route.params.id;
    const serviceApi = new ServicesApiService();
    serviceApi.getService(serviceId)
        .then(response => {
          this.service = response.data;
          console.log(this.service);
        })
        .catch(error => {
          console.error("There was azn error fetching the service:", error);
        });
  }
}
</script>
<template>
  <div style="margin-top: 10rem; background-color: #1a1a1a; padding: 5rem; border-radius: 1rem;" >
    <div style="display: flex; gap: 1rem">
      <div>
        <img :src="service.img" alt="Service Image" />
      </div>
      <div>
        <h1> {{ service.service_name }}</h1>
        <p> {{ service.description }} </p>
        <p> Price : {{ service.price }} </p>
        <p> Duration : {{ service.duration }} </p>
      </div>

    </div>
    <div class="mt-7">
      <pv-button label="Book Now" class="w-full"/>
    </div>
  </div>
</template>

<style scoped>

</style>