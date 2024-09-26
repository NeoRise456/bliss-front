<script>
  import HeaderToolbar from "./shared/components/header-toolbar.component.vue";

  export default {
    name: 'app',
    components: {HeaderToolbar}
  }
</script>

<template>
  <header-toolbar/>
  <router-view/>
</template>

<style>

</style>
