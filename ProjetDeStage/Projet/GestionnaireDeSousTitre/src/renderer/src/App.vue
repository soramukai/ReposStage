<!-- App.vue -->

<script lang="ts">
import EcranChoixRepertoire from './components/EcranChoixRepertoire.vue';
import EcranModificationLVA from './components/EcranModificationLVA.vue';
import EcranGestionSousTitre from './components/EcranGestionSousTitre.vue';

export default {
  data() {
    return {
      // Vos données ici
    };
  },
  components: {
    EcranChoixRepertoire,
    EcranModificationLVA,
    EcranGestionSousTitre
  },
};
</script>

<template>
  <div>
    <EcranGestionSousTitre />
    <p></p>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
