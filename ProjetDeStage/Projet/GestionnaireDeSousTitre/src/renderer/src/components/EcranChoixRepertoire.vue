<!-- FolderSelectButton.vue -->
<template>
    <v-card 
      class="NomDeLaPage" 
      readonly>
      <h1>
          Choix du repertoire
      </h1>
  </v-card>
  <div id="SelectionRepertoireSection">
    <div class="SelectionRepertoireSection">
      <!-- Bouton de sélection du dossier -->
      <v-btn variant="tonal" @click="selectFolder">Sélectionner un dossier</v-btn>
      

      <!-- Nom du dossier sélectionné -->
      <v-list-subheader class="descriptif">
        Chemin du repertoire
      </v-list-subheader>
      <v-text-field readonly>
        {{ cheminDuRepertoire }}
      </v-text-field>

      <!-- Récapitulatif de tous les éléments du dossier -->
      <v-list
        :items="recapitulatif"
        class="recapitulatif"
        variant="outlined"
        >
        
      </v-list>
    </div>

    <div class="SelectionRepertoireSection">
      <!-- Liste de sélection pour les vidéos -->
      <div class="fichier">
        <v-list-subheader class="descriptif">Sellectionner une vidéo</v-list-subheader>
        <v-select class="video"
          v-model="fichiersVideoSelectionnee"
          :items="fichiersVideo"
        ></v-select>
        
        <!--Bouton d'importation de video-->
        <v-list-subheader class="descriptif">Inmporter une Video</v-list-subheader>
        <v-file-input class="video"></v-file-input>
        <v-btn variant="tonal" class="video">Convertir</v-btn>
        <v-btn variant="tonal" class="video">Supprimer</v-btn>
      </div>
      
      <!-- Liste de sélection pour les bases de données -->
      <div class="fichier">
        <v-list-subheader class="descriptif">Sellectionner une BDD</v-list-subheader>
        <v-select class="BDD"
          v-model="fichierDatabaseSelectionnee"
          :items="fichiersDatabase"
        ></v-select>
        <v-list-subheader class="descriptif">Importer une BDD</v-list-subheader>
        <v-file-input class="BDD"></v-file-input>
        <v-btn variant="tonal" class="BDD">Copier</v-btn>
        <v-btn variant="tonal" class="BDD">Supprimer</v-btn>
      </div>
    </div>

    <div class="SelectionRepertoireSection">
      <router-link class="route" to="/gestion-sous-titre">
      <!-- Bouton "Charger" -->
      <!--<v-btn @click="ChargerFichier" :disabled="!fichiersVideoSelectionnee">Charger</v-btn>-->
        <v-btn variant="tonal" @click="ChargerFichier" >Charger</v-btn>
      </router-link>
    </div>
  </div>
  <video id="myVideo" width="640" height="360" controls>
  Your browser does not support the video tag.
</video>
</template>

<script lang="ts">

import {ContenueRepertoire} from '../class/ContenueRepertoire'
export default {
  data() {
    return {
      extensionsVideoAcceptees:['.mp4', '.mkv', '.avi', '.wmv', '.flv', '.mpeg'],
      extensionsDatabaseAcceptees:['.db', '.sqlite', '.sqlite3'],
      contenueRepertoire:ContenueRepertoire.recupererInstance(),
      recapitulatif:[],
      cheminDuRepertoire: "",
      fichiersDuRepertoire: [], // Mettez ici les éléments statiques ou initialisez-le avec les éléments réels après la sélection du dossier
      fichiersVideo: [],
      fichiersDatabase: [],
      fichiersVideoSelectionnee: [],
      fichierDatabaseSelectionnee: [],
    };
  },
  methods: {
    async selectFolder() {
      window.electron.ipcRenderer.send('electron:selectionDossier');
      window.electron.ipcRenderer.on('electron:renvoyerUrlDossier', async (event, folderPath) => {
        this.cheminDuRepertoire = await folderPath;
      });
    },
    ChargerFichier() {

    },
    importerUneVideo(){

    },
    convertirUneVideo(){

    },
    importerUneBDD(){

    },
    copierUneBDD(){

    },
    supprimerUnElement(){
      
    },
    filtrerParExtension(_fichiers: string[],_extensionsAcceptees:string[]): string[] {

      const fichers = _fichiers.filter((fichier) => {
        const extension = fichier.toLowerCase().slice((Math.max(0, fichier.lastIndexOf(".")) || Infinity) + 1);
        // Vérifie si l'extension est dans la liste des extensions acceptées
        return _extensionsAcceptees.includes('.' + extension);
      });

      return fichers;
    }
  },
  watch:{
    async cheminDuRepertoire(){
      window.electron.ipcRenderer.send('electron:recapitulatifRepertoire',this.cheminDuRepertoire)

      window.electron.ipcRenderer.on('electron:contenueDossier', async (event,_dossiers,_fichiers)=>{

        this.contenueRepertoire.enregistrerInstance(_dossiers,_fichiers)
        const contenueReacp = _dossiers
        contenueReacp.push(..._fichiers)
        this.recapitulatif = contenueReacp

        this.fichiersVideo= this.filtrerParExtension(_fichiers,this.extensionsVideoAcceptees)
        this.fichiersDatabase=this.fichiersDatabase?? this.filtrerParExtension(_fichiers,this.extensionsDatabaseAcceptees)

        
      })
    },
    fichiersVideoSelectionnee(){
      // Chemin du fichier
      let filePath = this.cheminDuRepertoire + '\\' + this.fichiersVideoSelectionnee;
      // Envoyer le chemin du fichier au processus principal


      // Recevoir la réponse du processus principal
        const videoElement = document.getElementById('myVideo');
      // Utilisation du protocole personnalisé 'atom' dans l'URL de la vidéo
        videoElement.src = 'atom://'+filePath;

    }

  }
};
</script>


<style lang="scss" scoped>
.recapitulatif{
  display: flex;
  flex-wrap: wrap;
  max-height: 350px;
  padding: 5px;
  justify-content: space-around;
}
.NomDeLaPage{
  text-align: center;
        margin: 10px auto 10px auto;
        width: 50%;
        background-color: rgba(0, 0, 0, 0.1);
        color: lightgray;
    }    

#SelectionRepertoireSection {
  margin: auto auto;
  max-width: 860px;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  border: 1px solid #d1d1d1; /* Bordure */
  border-radius: 8px; /* Coins arrondis */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Ombre */
  padding: 15px; /* Espacement intérieur */
  margin: 15px; /* Marge extérieure */
  background-color: #f8f8f8; /* Couleur de fond */
  transition: border-color 0.3s ease; /* Transition de la couleur de la bordure */
}
.elementSelectionRepertoire{
  margin: 0 0 10px 0;
}
#recapitulatif{
  margin: 5px;
  background-color: #f8f8f8;
}
.container:hover {
  border-color: #3498db; /* Couleur de la bordure lorsqu'on survole */
}

.SelectionRepertoireSection {
  width: 100%;
  margin: 15px auto; /* Marge entre les sections */
}

.fichier:nth-child(1) {
  width: 100%;
  margin: 0 10% 0 0;
}
.fichier:nth-child(2) {
  width: 100%;
  margin: 0 0 0 10%;
}
.video{
  margin: 0 0 10px 0;
  width: 100%;
}
.BDD{
  margin: 0 0 10px 0;
  width: 100%;
}

.SelectionRepertoireSection:nth-child(2) {
  display: flex;
  justify-content: space-between; /* Centrer horizontalement */
}

/* Style pour le bouton Charger */
.SelectionRepertoireSection button {
  color: #ffffff; /* Couleur du texte du bouton */
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Transition de la couleur de fond */
}

.SelectionRepertoireSection button:disabled {
  background-color: #bdc3c7; /* Couleur de fond du bouton désactivé */
  cursor: not-allowed;
}

.SelectionRepertoireSection button:hover:enabled {
  background-color: #2980b9; /* Couleur de fond du bouton lorsqu'on survole */
}
</style>
