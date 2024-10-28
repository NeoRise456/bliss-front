<script>
import {ServiceApiService} from "../../service-management/services/service-api.service.js";
import {Service} from "../../shared/model/service.entity.js";
import {Appointment} from "../model/appointment.entity.js";
import {ClientAppointmentApiService} from "../services/client-appointment-api.service.js";
import ServiceMiniCard from "../components/service-mini-card.component.vue";

export default {
  name: "reservations",
  components: {ServiceMiniCard},
  data(){
    return {
      serviceId: this.$route.params.id,
      bookingService: Service,
      serviceApiService: new ServiceApiService(),
      appointment: Appointment,
      clientAppointmentApiService: new ClientAppointmentApiService(),
      date: new Date(),
      time: new Date(),
      requirements: null
    }
  },
  methods: {
    buildServiceFromResponseData(service) {
      return new Service(
          service.id,
          service.category_id,
          service.company_id,
          service.service_name,
          service.description,
          service.price,
          service.duration,
          service.rating,
          service.sales,
          service.created_at,
          service.img
      )
    },
    async getBookingService(){
      let response = await this.serviceApiService.getServiceById(this.serviceId);
      this.bookingService = this.buildServiceFromResponseData(response.data);
    },
    async bookService() {

      let nowDate = new Date();
      nowDate = nowDate.toISOString();
      let bookingDate = this.date.toISOString();
      let bookingTime = `${this.time.getHours().toString().padStart(2, '0')}:${this.time.getMinutes().toString().padStart(2, '0')}`;

      this.appointment = new Appointment(
          null,
          1,
          this.serviceId,
          this.bookingService.company_id,
          nowDate,
          "PENDING",
          bookingDate,
          bookingTime,
          this.requirements
      );

      let response = await this.clientAppointmentApiService.createAppointment(this.appointment);
      console.log(response);

    }
  },
  created(){
    this.getBookingService();
  }

}
</script>

<template>
  <div class="flex gap-5 align-items-start">
    <div class="flex-1 flex align-items-center justify-content-center">
      <div>
        <service-mini-card :service="bookingService"/>
      </div>
    </div>
    <div class="flex-none flex align-items-center justify-content-center">
      <pv-card>
        <template #title>
          Make An Appointment
        </template>
        <template #content>
          <div>
            <label class="font-bold block mb-2"> Any requirements? </label>
            <pv-textarea v-model="requirements"  rows="6" cols="30" class="w-full"/>
          </div>
          <div class="mt-5">
            <div class="flex-auto">
              <label class="font-bold block mb-2"> Select Date </label>
              <pv-datepicker v-model="date" readonly/>
              <div class="card flex justify-center">
                <pv-datepicker v-model="date" inline showWeek class="w-full sm:w-[30rem]"/>
              </div>
            </div>
            <div class="flex-auto">
              <label class="font-bold block mb-2"> Select Time </label>
              <pv-datepicker v-model="time" timeOnly readonly/>
              <div class="card flex justify-center">
                <pv-datepicker  v-model="time" inline timeOnly fluid class="w-full sm:w-[30rem]" />
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <pv-button label="Book Now" icon="pi pi-check" icon-pos="right" @click="bookService()"/>
        </template>
      </pv-card>
    </div>
    <div class="flex-1 flex align-items-start justify-content-center">
      <div>
        <pv-card style="max-width: 400px">
          <i class="pi pi-credit-card"/>
          <template #title>
            Work at the speed
          </template>
          <template #content>
            <span>
              The gradual accumulation of information about atomic and small-scale behaviour...
            </span>
          </template>
          <template #footer>
            <pv-button label="Go To Services" icon="pi pi-chevron-right" icon-pos="left"/>
          </template>
        </pv-card>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>