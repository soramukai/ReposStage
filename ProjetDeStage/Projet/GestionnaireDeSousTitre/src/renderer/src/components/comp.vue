<template>
  <v-btn class="btnTest" @click="test">{{texte}}</v-btn>
</template>

<script lang="ts">
export default {
data(){
    return{
        texte:"",
    }
},
mounted(){
    this.texte="Cliquez"
},methods:{
    test(){
        this.texte="Bravo"
    }
}
}
</script>

<style>
.btnTest{
    background-color: salmon;
    color: blue;
}
</style>