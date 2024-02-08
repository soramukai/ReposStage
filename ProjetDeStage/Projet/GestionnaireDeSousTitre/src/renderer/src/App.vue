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
    async send(method,_json){

    _json.forEach(async x=>{
        window.electron.ipcRenderer.send("electron:creer"+method,x)
    })
    let test = await window.electron.ipcRenderer.invoke("electron:charger"+method) 
    return test;
    }
  },
  async mounted(){
    // let couleur=[
    //   {
    //     "id":1,
    //     "nom":"black"
    //   },
    //   {
    //     "id":2, 
    //     "nom":"blue"
    //   },
    //   {
    //     "id":3,
    //     "nom":"red"
    //   },
    //   {
    //     "id":4,
    //     "nom":"green"
    //   },
    //   {
    //     "id":5,
    //     "nom":"jaune"
    //   }
    // ]
    // await this.send("Couleur",couleur)

    // let langue =[
    //   {
    //     "id":1,
    //     "nom":"Francais"
    //   },
    //   {
    //     "id":2,
    //     "nom":"Anglais"
    //   },
    //   {
    //     "id":3,
    //     "nom":"Japonais"
    // }]
    // await this.send("Langue",langue)

    // let ver = [
    //     {
    //         "id":1,
    //         "nom":"FR001",
    //         "langue":1
    //     },
    //     {
    //         "id":2,
    //         "nom":"FR002",
    //         "langue":1
    //     },
    //     {
    //         "id":3,
    //         "nom":"EN001",
    //         "langue":2
    //     },
    //     {
    //         "id":4,
    //         "nom":"JP001",
    //         "langue":3
    //     },
    //     {
    //         "id":5,
    //         "nom":"FR003",
    //         "langue":1
    //     },
    //     {
    //         "id":6,
    //         "nom":"JP002",
    //         "langue":3
    //     }
        
    // ]
    // setTimeout(async()=>{
    // await this.send("Version",ver)
    // },2000)

    // let perso = [
    //     {
    //         "id":1,
    //         "nom":"Johnny"
    //     },
    //     {
    //         "id":2,
    //         "nom":"Marc"
    //     },
    //     {
    //       "id":3,
    //       "nom":"Mimi",
    //       "couleur":3
    //     }
    // ]
    // setTimeout(async()=>{
    // await this.send("Personnage",perso)
    // },2000)

  }
};
</script>

<template>
  <div>

    <!-- <router-link to="/choix-repertoire">Choix Répertoire</router-link>
    <router-link to="/modification-lva">Modification LVA</router-link>
    <router-link to="/gestion-sous-titre">Gestion Sous-Titre</router-link>
    <router-link to="/test">Test</router-link> -->

    <router-view>
    </router-view>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
