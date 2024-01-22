<!-- FolderSelectButton.vue -->
<template>
  <div id="SelectionRepertoireSection">
    <div class="SelectionRepertoireSection">
      <!-- Bouton de sélection du dossier -->
      <v-btn class="elementSelectionRepertoire" @click="SelectionDuRepertoire">Sélectionner un dossier</v-btn>
      
      <!-- Nom du dossier sélectionné -->
      <v-list-subheader class="descriptif">Contenue du repertoire</v-list-subheader>
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
        <v-btn class="video">Convertir</v-btn>
        <v-btn class="video">Supprimer</v-btn>
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
        <v-btn class="BDD">Copier</v-btn>
        <v-btn class="BDD">Supprimer</v-btn>
      </div>
    </div>

    <div class="SelectionRepertoireSection">
      <!-- Bouton "Charger" -->
      <v-btn @click="ChargerFichier" :disabled="!fichiersVideoSelectionnee">Charger</v-btn>
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
    SelectionDuRepertoire() {
      // Logique pour la sélection du dossier
      const selectedFolderPath = '/chemin/du/dossier';
      this.nomDuDossier = selectedFolderPath;

      // Liste des fichiers du répertoire (remplacer par la vraie liste de fichiers)
      const listeFichiers = ['test.mp4', 'test2.mp4', 'test3.avi', 'test1.pdf', 'test1.sqlite3', 'test.db', 'data.sqlite'];

      // Mise à jour de la liste de tous les fichiers du répertoire
      this.fichiersDuRepertoire = listeFichiers;

      // Filtrer les fichiers par extension pour la liste de sélection des vidéos
      this.fichiersVideo = listeFichiers.filter(fichier => {
        const extension = fichier.split('.').pop().toLowerCase();
        return ['.mp4', '.avi', '.wmv'].includes(`.${extension}`);
      });

      // Filtrer les fichiers par extension pour la liste de sélection des bases de données
      this.fichiersDatabase = listeFichiers.filter(fichier => {
        const extension = fichier.split('.').pop().toLowerCase();
        return ['.sqlite3', '.sqlite', '.database'].includes(`.${extension}`);
      });
    },
    ChargerFichier() {
      // Logique de chargement du fichier
      if (this.fichiersVideoSelectionnee) {
        const cheminComplet = `/chemin/du/dossier/${this.fichiersVideoSelectionnee}`;
        // Ajoutez ici la logique pour charger le fichier, par exemple afficher la vidéo
        console.log(`Chargement du fichier vidéo : ${cheminComplet}`);
      }

      if (this.fichierDatabaseSelectionnee) {
        const cheminDatabaseComplet = `/chemin/du/dossier/${this.fichierDatabaseSelectionnee}`;
        // Ajoutez ici la logique pour charger le fichier de base de données
        console.log(`Chargement du fichier de base de données : ${cheminDatabaseComplet}`);
      }
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
  background-color: #3498db; /* Couleur de fond du bouton */
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
