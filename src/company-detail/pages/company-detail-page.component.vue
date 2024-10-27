<script>
import CompanyDetailProfile from "../components/company-detail-profile.component.vue";

export default {
  name: "company-detail-page",
  components: {CompanyDetailProfile}
}
</script>

<template>
<company-detail-profile :companyId="1"/>
</template>

<style scoped>

</style>