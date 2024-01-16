<!-- App.vue -->

<script lang="ts">
import Versions from './components/Versions.vue';

export default {
  data() {
    return {
      // Vos données ici
    };
  },
  components: {
    Versions,
  },
};
</script>

<template>
  <div>
    <Versions />
    <p></p>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
