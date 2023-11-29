<template>
    <div>
      <button @click="srtConvert">CLICK</button>
      <input type="file" @change="handleFileChange" />
      <div v-if="srtContent">
        <h2>Contenu du fichier SRT :</h2>
        <pre>{{ srtContent }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import {Lines} from '../../model/Lines.ts'
  export default {
    data() {
      return {
        srtContent: null,
        lines:null
      };
    },
    methods: {
      srtConvert(){
        let subtitleLines = this.srtContent.split('\n\n')
        this.lines = new Lines(subtitleLines);
        console.log(this.lines.getLines())
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
  
          reader.onload = () => {
            // Une fois le fichier chargé, vous pouvez accéder à son contenu ici.
            let test = reader.result;
            this.srtContent = reader.result;
          };
          reader.readAsText(file);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles CSS ici */
  </style>
  