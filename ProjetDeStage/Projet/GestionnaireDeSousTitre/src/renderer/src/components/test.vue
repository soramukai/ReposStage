<template>
  <v-select @input="changerV" :items="langues" ></v-select>
</template>

<script>
export default {
 data(){
    return{
        langues:["fr","en","jp"]
    }
 },
 methods:{
    changerV(){
        console.log("Bonjour")
    }
 }
}
</script>

<style>

</style>