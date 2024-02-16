<!-- App.vue -->
<script lang="ts">
import EcranChoixRepertoire from './components/EcranChoixRepertoire.vue';
import EcranModificationLVA from './components/EcranModificationLVA.vue';
import EcranGestionSousTitre from './components/EcranGestionSousTitre.vue';

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
  <div>
    <router-view>
    </router-view>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
