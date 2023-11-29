<template>
  <div class="blockItem">
    <div>
      <p>{{ nom }} </p>
      <p>nombre : {{ quantite }}</p>
      <p>Description : {{ description }}</p>
      <p>{{ categorie }}</p>
    </div>
    <img :src="image" :alt="description">
  </div>
</template>

<script lang="ts">
import {Item} from "../class/Item";
import {EnumCategorie} from "../class/EnumCategorie";
export default {
  data(){
    return{
      itemTest:null as Item|null,
      nom:"",
      description:"",
      quantite:0,
      categorie:"",
      image:""
    }
  },
  created(){
     this.itemTest = new Item("Ruger Rimfire Precision",1,"Carabine 22lr",[EnumCategorie.Arme ,EnumCategorie.Survie],"ruger-22lr.jpg");
  },
  mounted(){
    if(this.itemTest){
      this.nom=this.itemTest.getNom();
      this.description=this.itemTest.getDescription();
      this.quantite=this.itemTest.getQuantite();
      this.categorie=this.categorieFormat(this.itemTest.getCategorie());
      this.image="src/img/"+this.itemTest.getImageUrl(); 
    }
  },
  methods:{
    categorieFormat(_categorie:Array<typeof EnumCategorie>){
      let result="";
      _categorie.forEach((cat)=>{
        result+=cat.toString() + " - ";
      });
      return result.substring(0,result.length-3);
    }
  }
}
</script>

<style lang="scss">
  .blockItem{
    border: 1px dotted black;
    width: 25%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 5px;
    div{
      width: 65%;
      display: flex;
      flex-wrap: wrap;
      margin: 5px;
      p{
        width: 100%;
      }
    }
    img{
      width: 30%;
    }
  }
</style>