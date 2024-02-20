<!-- App.vue -->
<script lang="ts">
import EcranChoixRepertoire from './views/EcranChoixRepertoire.vue';
import EcranModificationLVA from './views/EcranModificationLVA.vue';
import EcranGestionSousTitre from './views/EcranGestionSousTitre.vue';

export default {
  data() {
    return {
      tabLangue:[]
    };
  },
  components: {
    EcranChoixRepertoire,
    EcranModificationLVA,
    EcranGestionSousTitre,
  },
  methods:{
  },
  async mounted(){
  }
};
</script>

<template>
    <router-view>

    </router-view>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
