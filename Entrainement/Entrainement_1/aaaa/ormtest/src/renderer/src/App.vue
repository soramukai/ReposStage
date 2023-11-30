<!-- App.vue -->

<script lang="ts">
//import Versions from './components/Versions.vue';
import Inventaire from './components/Inventaire.vue';
import VideoSelect from './components/VideoSelect.vue';
import SrtTest from './components/SrtTest.vue';

export default {
  data() {
    return {
      // Vos données ici
    };
  },
  components: {
    //Versions,
    Inventaire,
    VideoSelect,
    SrtTest
  },
};
</script>

<template>
  <div>
    <!-- <Versions /> -->
    <!-- <Inventaire /> -->
    <VideoSelect />
    <!-- <SrtTest /> -->
    <p></p>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
