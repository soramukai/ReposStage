<template>
    <div>
      <div id="srtControl">
        <select name="langue" id="langSelect">
          <option value="french">Francais</option>
          <option value="english">Englais</option>
          <option value="japanese">Japonais</option>
        </select>          
        </div>
      <button @click="srtConvert">Save</button>
      <input type="file" @change="handleFileChange" />
      <div v-if="srtContent">
        <h2>Contenu du fichier SRT :</h2>
        <pre>{{ srtContent }}</pre>
      </div>
      <button @click="test">Load</button>
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
        this.lines = new Lines(subtitleLines,"video_a_choisir",document.getElementById("langSelect").value);
        this.lines.dbSave();
      }
      ,
      async loadData(){
          try {
          // Charger les données avec IPCRenderer
          return await window.electron.ipcRenderer.invoke('electron:LoadData');
        } catch (error) {
          console.error('Erreur lors du chargement des données :', error);
        }
      }
      ,
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
  
          reader.onload = () => {
            // Une fois le fichier chargé, vous pouvez accéder à son contenu ici.
            this.srtContent = reader.result;
          };
          reader.readAsText(file);
        }
      },
    },
  };
  </script>
  
  <style>

  </style>
  