<template>
  <header class="header-toolbar">
    <pv-toolbar style="padding: 5px; background-color: #D1E4FA; border-style: none;">
      <template #start>
        <div class="flex items-center gap-2">
          <div class="flex justify-content-center p-3 mr-8">
            <a style="font-family: 'Tajawal', sans-serif; color: #37123c; font-weight: bold; font-size: 30px"> BLISS </a>
          </div>
        </div>
      </template>
      <template #center>
        <div class="flex items-center gap-2">
          <pv-button class="custom-button" label="Home" text plain style="color: #37123c"/>
          <pv-button class="custom-button" label="Services" text plain style="color: #37123c"/>
          <pv-button class="custom-button" label="Schedule" text plain style="color: #37123c" />
        </div>
      </template>
      <template #end>
        <pv-button class="custom-button" icon="pi pi-search" text style="color: #37123c"/>
        <pv-button class="custom-button" icon="pi pi-shopping-cart" text style="color: #37123c"/>
        <pv-button class="custom-button" icon="pi pi-heart" text style="color: #37123c"/>
        <pv-button class="custom-button" icon="pi pi-user" label="Login / Register" text plain style="color: #37123c" />
        <div class="flex items-center gap-2 m-2">
          <pv-button label="Share" severity="contrast" size="small" />
          <i class="pi pi-cog" style="font-size: 2rem"></i>
        </div>
      </template>
    </pv-toolbar>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');

.header-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.custom-button:hover {
  background-color: #D1E4FA !important;
}

.custom-button {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
}
</style>
<script setup lang="ts">
</script>