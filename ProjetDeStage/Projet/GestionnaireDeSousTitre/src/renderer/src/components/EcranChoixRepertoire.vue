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
      <v-btn variant="tonal" class="elementSelectionRepertoire" @click="SelectionDuRepertoire">Sélectionner un dossier</v-btn>
      
      <!-- Nom du dossier sélectionné -->
      <v-list-subheader class="descriptif">Contenue du reperto
        ire</v-list-subheader>
      <v-text-field readonly>{{ nomDuDossier }}</v-text-field>

      <!-- Récapitulatif de tous les éléments du dossier -->
      <v-row id="recapitulatif" v-if="fichiersDuRepertoire.length > 0">
        <v-col v-for="(fichier, index) in fichiersDuRepertoire" :key="index" cols="4">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ fichier }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </div>

    <div class="SelectionRepertoireSection">
      <!-- Liste de sélection pour les vidéos -->
      <div class="fichier">
        <v-list-subheader class="descriptif">Sellectionner une vidéo</v-list-subheader>
        <v-select class="video"
          v-model="fichiersVideoSelectionnee"
          :items="fichiersVideo"
          label="Sélectionnez un fichier vidéo"
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
          label="Sélectionnez un fichier de base de données"
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
</template>

<script lang="ts">
export default {
  data() {
    return {
      nomDuDossier: "",
      fichiersDuRepertoire: [], // Mettez ici les éléments statiques ou initialisez-le avec les éléments réels après la sélection du dossier
      fichiersVideo: [],
      fichiersDatabase: [],
      fichiersVideoSelectionnee: null,
      fichierDatabaseSelectionnee: null,
    };
  },
  methods: {
    async SelectionDuRepertoire() {
      try {
        // Demandez à l'utilisateur de sélectionner un dossier
        const folderHandle = await window.showDirectoryPicker();
        
        // Obtenez le chemin relatif du dossier
        const relativePath = await this.getRelativePath(folderHandle);

        // Construisez l'URL en utilisant le chemin relatif
        const folderURL = new URL(relativePath, 'file://').href;

        // Affichez l'URL dans la console
        console.log("URL du dossier sélectionné :", folderURL);
      } catch (error) {
        console.error('Erreur lors de la sélection du dossier :', error);
      }
    },
    async getRelativePath(folderHandle) {
      const entries = [];

      // Récupérez tous les éléments du dossier
      for await (const [name, handle] of folderHandle.entries()) {
        entries.push({ name, handle });
      }

      // Utilisez l'API resolve pour obtenir le chemin relatif du dossier
      const pathDetails = await folderHandle.resolve(entries.map(entry => entry.name));
      return pathDetails.relativePath;
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
      
    }
  },
};
</script>


<style lang="scss" scoped>

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
