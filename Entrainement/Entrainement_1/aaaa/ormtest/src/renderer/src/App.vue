<!-- App.vue -->

<script lang="ts">
import Inventaire from './components/Inventaire.vue';

export default {
  data() {
    return {
      // Vos données ici
    };
  },
  components: {
    Inventaire,
  },
};
</script>

<template>
  <div>
    <Inventaire />
    <p></p>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
