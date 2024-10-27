<script>
import {ServiceApiService} from "../../service-management/services/service-api.service.js";
import {CompanyDetailApiService} from "../services/company-detail-api.service.js";


export default {
  name: "company-detail-profile",
  data() {
    return {
      services: [],
      company: null,
      avgRating: null
    };
  },
  props: {
    companyId: {
      type: Number,
      required: false
    }
  },
  watch: {
    companyId: "fetchCompanyDetail"
  },
  methods: {
    async fetchCompanyDetail() {
      const serviceApiService = new ServiceApiService();
      const companyDetailApiService = new CompanyDetailApiService();

      try {
        const id = this.companyId || this.$route.params.id;
        if (!id) {
          console.error("No company id provided");
          return;
        }
        const servicesResponse = await serviceApiService.getServices();
        const companyResponse = await companyDetailApiService.getCompanies();

        this.services = servicesResponse.data.filter(service => service.company_id === Number(id));
        this.company = companyResponse.data.find(company => company.id === Number(id));

        if (this.services.length > 0) {
          const totalRating = this.services.reduce((sum, service) => sum + service.rating, 0);
          this.avgRating = (totalRating / this.services.length).toFixed(2);
        } else {
          this.avgRating = "No hay calificaciones disponibles";
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
  },
  created() {
    this.fetchCompanyDetail();
  }
};
</script>

<template>
  <div v-if="company" class="p-grid p-dir-col p-align-center">
    <div class="p-col-12 p-md-6 p-lg-4">
      <pv-card class="company-card p-shadow-4">
        <template #title>
          <h2 class="p-mt-3">{{ company.name }}</h2>
        </template>

        <template #content>
          <div class="service-content flex">
          <div class="image-container">
            <img :src="company.img" alt="Company Image" class="service-img" />
          </div>
          <div class="info-container">
          <p>{{ company.description }}</p>
          <p><strong>{{$t('companyDetail.ruc')}}:</strong> {{ company.ruc }}</p>
          <p><strong>{{$t('companyDetail.email')}}:</strong> {{ company.email }}</p>
          <p><strong>{{$t('companyDetail.website')}}:</strong> <a :href="company.website" target="_blank">{{ company.website }}</a></p>
          <p><strong>{{$t('companyDetail.averageRating')}}:</strong> {{ avgRating }}</p>
          </div>
          </div>
        </template>
      </pv-card>
    </div>

    <div class="p-col-12">
      <h4>{{$t('servicesHome.services')}}:</h4>
      <div class="service-cards">
        <div v-for="service in services" :key="service.id" class="service-card">
          <pv-card class="services-card p-shadow-4">
            <template #header>
              <img :src="service.img" alt="Service Image" class="service-img"/>
            </template>
            <template #title>
              {{service.service_name}}
            </template>
            <template #content>
              <p><strong>Compania :</strong> {{ service.company_id }}</p>
              <p><strong>{{$t('servicesHome.rating')}}: m </strong> {{ service.rating }}</p>
              <p>{{ service.description }}</p>
            </template>
          </pv-card>
        </div>
      </div>
    </div>
  </div>
  <p v-else>{{$t('companyDetail.companyNotFound')}}</p>
</template>

<style scoped>
.company-card {
  background: #37123C;
}
.services-card{
  background: #C3A3BF;
}
.service-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.service-card {
  width: 300px;
  flex: 1 1 300px;
}
.service-content {
  display: flex;
}
.image-container {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-container {
  width: 50%;
  padding: 0 16px;
}
.service-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>

