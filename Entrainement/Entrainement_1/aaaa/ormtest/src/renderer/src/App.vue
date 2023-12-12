<!-- App.vue -->

<script lang="ts">
import VideoSelect from './components/VideoSelect.vue';

export default {
  data() {
    return {
      // Vos données ici
    };
  },
  components: {
    VideoSelect,
  },
};
</script>

<template>
  <div>
    <VideoSelect />
    <p></p>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
