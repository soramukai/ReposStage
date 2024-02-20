<template>
  <!-- Titre de la page -->
  <v-card 
    class="NomDeLaPage" 
    readonly>
      <h1>
        Choix du repertoire
      </h1>
  </v-card>

  <!-- Section de selection de dossier et recapitulatif -->
  <div id="SelectionRepertoireSection">
    <div class="SelectionRepertoireSection">
      <!-- Bouton de sélection du dossier -->
      <v-btn 
        variant="tonal" 
        @click="selectionnerDossier">
          Sélectionner un dossier
      </v-btn>
      

      <!-- Nom du dossier sélectionné -->
      <v-list-subheader>
        Chemin du repertoire
      </v-list-subheader>
      <v-text-field readonly>
        {{ urlDuRepertoire }}
      </v-text-field>

      <!-- Récapitulatif de tous les éléments du dossier -->
      <v-list
        :items="recapitulatif"
        class="recapitulatif"
        variant="outlined">
      </v-list>
    </div>

    <!-- Section de selection de Video -->
    <div class="SelectionRepertoireSection">
      <!-- Liste de sélection pour les vidéos -->
      <div class="fichier">
        <v-list-subheader>
          Sellectionner une vidéo
        </v-list-subheader>
        <v-select class="video"
          v-model="fichierVideoSelectionnee"
          :items="fichiersVideo">
        </v-select>
        
        <!--Bouton d'importation de video-->
        <v-list-subheader>
          Inmporter une Video
        </v-list-subheader>
        <v-file-input 
          class="video"
          :disabled="urlDuRepertoire==''"
          v-model="urlVideoAimporter"
          :accept="extensionsVideoAcceptees">
        </v-file-input>
        <v-btn 
          variant="tonal" 
          class="video"
          :disabled="urlVideoAimporter.length==0"
          @click="()=>copierUnElement(urlVideoAimporter)">
            Convertir
        </v-btn>
        <v-btn 
          variant="tonal" 
          class="video"
          :disabled="fichierVideoSelectionnee==''"
          @click="()=>{supprimerUnElement(instanceRepertoireDeTravail.recupererUrlVideo());fichierVideoSelectionnee=''}">
            Supprimer
        </v-btn>
      </div>
       
      <div class="fichier">
        <img
          v-if="urlDuRepertoire!=''"
          id="rafraichir" 
          src="../assets/rafraichir.png" 
          alt="" 
          tabindex="0"
          @keydown.space.prevent="(event) => actualiserImageRafraichir('presse',event)"
          @keyup.space="(event) => actualiserImageRafraichir('pressePas',event)"
          @mouseover="(event) => actualiserImageRafraichir('hover',event)" 
          @mouseout="(event) => actualiserImageRafraichir('normal',event)"
          @mouseup="(event) => actualiserImageRafraichir('cliquePas',event)"
          @mousedown="(event) => actualiserImageRafraichir('clique',event)">
      </div>

      <!-- Section de selection de Base de données -->
      <div 
        class="fichier">
          <v-list-subheader>
            Sellectionner une BDD
          </v-list-subheader>
          <v-select 
            class="BDD"
            v-model="fichierDatabaseSelectionnee"
            :items="fichiersDatabase">
          </v-select>
          <v-list-subheader>
            Importer une BDD
          </v-list-subheader>
          <v-file-input 
            class="BDD"
            :disabled="urlDuRepertoire==''"
            v-model="urlDatabaseAImporter"
            :accept="extensionsDatabaseAcceptees">
          </v-file-input>
          <v-btn 
            variant="tonal" 
            class="BDD"
            :disabled="urlDatabaseAImporter.length==0"
            @click="()=>copierUnElement(urlDatabaseAImporter)">
              Copier
          </v-btn>
          <v-btn 
            variant="tonal" 
            class="BDD"
            :disabled="fichierDatabaseSelectionnee==''"
            @click="()=>{supprimerUnElement(instanceRepertoireDeTravail.recupererUrlBaseDeDonnee());fichierDatabaseSelectionnee=''}">
              Supprimer
          </v-btn>
      </div>
    </div>

    <!-- Bouton charger de la page -->
    <div 
      id="boutonCharger" 
      class="SelectionRepertoireSection">
        <v-btn id="v-boutonCharger" variant="tonal" :disabled="!fichierVideoSelectionnee">
          Charger
        </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Repertoire from '../class/Repertoire';
export default {
  data() {
    return {
      // Liste des extenssion accepté pour les videos et databases
      extensionsVideoAcceptees:['.mp4', '.mkv', '.avi', '.wmv', '.flv', '.mpeg'] as string[],
      extensionsDatabaseAcceptees:['.db', '.sqlite', '.sqlite3'] as string[],
      // Instance de la class Repertoir
      instanceRepertoireDeTravail:Repertoire.recupererInstanceDuRepertoire() as Repertoire,
      urlDuRepertoire: "" as string,
      // fichier a importer
      urlVideoAimporter:[] as File[],
      urlDatabaseAImporter:[] as File[],
      // Liste avec le contenue du dossier 
      recapitulatif:[] as Object[],
      fichiersVideo: [] as string[],
      fichiersDatabase: [] as string[],
      fichierVideoSelectionnee: '' as string | undefined,
      fichierDatabaseSelectionnee: '' as string|undefined,
    };
  },
  methods: {
    async selectionnerDossier() {
      this.instanceRepertoireDeTravail.modifierUrlRepertoire('')
      this.urlDuRepertoire="En Selection"
      // @ts-ignore (define in dts)
      window.electron.ipcRenderer.send('electron:selectionDossier');
      // @ts-ignore (define in dts)
      window.electron.ipcRenderer.on('electron:renvoyerUrlDossier', async (_,folderPath) => {
        this.fichierDatabaseSelectionnee=""
        this.fichierVideoSelectionnee=""
        this.instanceRepertoireDeTravail.modifierUrlRepertoire(folderPath!=""?folderPath:"")
        this.urlDuRepertoire = await folderPath;
      });
    },
    chargerRepertoire(){
      if(this.urlDuRepertoire!="En Selection" && this.urlDuRepertoire!=""){
        // @ts-ignore (define in dts)
        window.electron.ipcRenderer.send('electron:recapitulatifRepertoire',this.urlDuRepertoire)
        // @ts-ignore (define in dts)
        window.electron.ipcRenderer.on('electron:contenueDossier', async (_,_dossiers,_fichiers)=>{

          this.instanceRepertoireDeTravail.modifierFichiers(_fichiers)
          const contenueReacp = _dossiers
          contenueReacp.push(...this.instanceRepertoireDeTravail.recupererFichiers())
          this.recapitulatif = contenueReacp

          this.fichiersVideo = this.filtrerParExtension(this.instanceRepertoireDeTravail.recupererFichiers(),this.extensionsVideoAcceptees)
          this.fichiersDatabase = this.filtrerParExtension(this.instanceRepertoireDeTravail.recupererFichiers(),this.extensionsDatabaseAcceptees)
        })
      }else{
        this.urlDuRepertoire= this.instanceRepertoireDeTravail.recupererUrlRepertoire()!=""? this.instanceRepertoireDeTravail.recupererUrlRepertoire():"";
      }
    },
  /**
   * Cette méthode est responsable du chargement d'un fichier video et base de données. 
   * Si aucun fichier n'est sélectionné pour la base de donnés, un fichier par défaut est chargé.
   * Ensuite, elle redirige l'utilisateur vers la page de gestion des sous-titres en utilisant le routeur.
   * @returns void
   */
    ChargerFichier(): void {
      if(this.fichierDatabaseSelectionnee==""){
          this.instanceRepertoireDeTravail.modifierUrlBaseDeDonnee(this.instanceRepertoireDeTravail.recupererUrlRepertoire()+"\\"+"subtitleParDefault.db")
      }
      //Chargement des props à passer à la page ciblé par le router.
      this.$router.push({
        path: '/gestion-sous-titre',
        query: {
          propVideo: this.instanceRepertoireDeTravail.recupererUrlVideo(),
          propDatabase: this.instanceRepertoireDeTravail.recupererUrlBaseDeDonnee(),
        },
      });
    },
    async copierUnElement(_elementACopier){
      const nomElementACopier= _elementACopier[0].name
      // @ts-ignore (define in dts)
      window.electron.ipcRenderer.send('electron:copierElement',_elementACopier[0].path,this.instanceRepertoireDeTravail.recupererUrlRepertoire()+"\\"+nomElementACopier)
    },
    async supprimerUnElement(_fichierASupprimer){
      if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?\nCeci est une action irreverssible!")){
        // @ts-ignore (define in dts)
        window.electron.ipcRenderer.send('electron:supprimerElement',_fichierASupprimer)
        this.chargerRepertoire()
      }
    },
    filtrerParExtension(_fichiers: string[],_extensionsAcceptees:string[]): string[] {
      const fichers = _fichiers.filter((fichier) => {
        const extension = fichier.toLowerCase().slice((Math.max(0, fichier.lastIndexOf(".")) || Infinity) + 1);
        // Vérifie si l'extension est dans la liste des extensions acceptées
        return _extensionsAcceptees.includes('.' + extension);
      });

      return fichers;
    },
    actualiserImageRafraichir(_etat: string, event: MouseEvent|KeyboardEvent) {
      let img: HTMLElement|null = document.getElementById('rafraichir');  
      if(this.urlDuRepertoire!='' && img){
        switch(_etat){
            case 'presse':
              (img as HTMLImageElement).src = './src/assets/rafraichirClique.png'
              break
            case 'pressePas':
             (img as HTMLImageElement).src = '../src/assets/rafraichir.png'; // Revenez à l'image normale lorsque la souris quitte
              this.chargerRepertoire()
              break
            case 'clique':
             (img as HTMLImageElement).src = './src/assets/rafraichirClique.png'
              break
            case 'cliquePas':
              if (this.survoleImageRafraichir(img,event)){
               (img as HTMLImageElement).src = './src/assets/rafraichirHover.png'; // Changez l'image lors du survol
                this.chargerRepertoire()
              }else{
               (img as HTMLImageElement).src = '../src/assets/rafraichir.png'; // Revenez à l'image normale lorsque la souris quitte
              }
              break
            case 'normal':
             (img as HTMLImageElement).src = '../src/assets/rafraichir.png'; // Revenez à l'image normale lorsque la souris quitte
              break
            case 'hover':
             (img as HTMLImageElement).src = './src/assets/rafraichirHover.png'; // Changez l'image lors du survol
              break
          }
        }else{
         (img as HTMLImageElement).src = './src/assets/rafraichirDesactive.png'
        }
    },
    survoleImageRafraichir(element, event) {
      if (!event) return false; // Vérifie si l'événement est défini
      let bounding = element.getBoundingClientRect();
      return bounding.top <= (event.clientY || 0) && (event.clientY || 0) <= bounding.bottom
          && bounding.left <= (event.clientX || 0) && (event.clientX || 0) <= bounding.right;
    },
    actualiserContenue(){
      this.chargerRepertoire()
    }
  },
  async mounted(){
    // @ts-ignore (define in dts)
    window.electron.ipcRenderer.on('electron:copieSucces',(_)=>{
      this.chargerRepertoire()
    })
  },
  watch:{
    async urlDuRepertoire(newValue,oldValue){
      if(oldValue!=newValue){
        if(newValue!='En Selection' && newValue!=''){
          this.chargerRepertoire()
        }else{
          this.recapitulatif=[]
          this.urlDuRepertoire=''
        }
      }
      else
      {
        this.recapitulatif=[]
        this.urlDuRepertoire=''
      }
    },
    fichierVideoSelectionnee(){
      // Chemin du fichier
      this.instanceRepertoireDeTravail.modifierUrlVideo(this.urlDuRepertoire + '\\' + this.fichierVideoSelectionnee);

      if(this.fichierVideoSelectionnee!=""){
        let routage: HTMLElement|null = document.getElementById('boutonCharger')
        let vbouton: HTMLElement|null = document.getElementById('v-boutonCharger')
        let router: HTMLElement|null = document.createElement("router-link")
        
        router.className="route"
        router.addEventListener('click',this.ChargerFichier)
        router.setAttribute('to',"/gestion-sous-titre")
        if(vbouton){
          router.appendChild(vbouton);
        }
        if(routage){
          routage.innerHTML="";
          routage.appendChild(router)
        }
      }
      else{
        this.instanceRepertoireDeTravail.modifierUrlVideo("")
      }
    },
    fichierDatabaseSelectionnee(){
      // Chemin du fichier
      if(this.fichierDatabaseSelectionnee!=""){
        this.instanceRepertoireDeTravail.modifierUrlBaseDeDonnee(this.urlDuRepertoire+ "\\"+ this.fichierDatabaseSelectionnee)
      }
      else{
        this.instanceRepertoireDeTravail.modifierUrlBaseDeDonnee(this.urlDuRepertoire+ "\\"+"SousTitreParDefaut.db")
      }
    },
  }
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
    .SelectionRepertoireSection {
      width: 100%;
      margin: 15px auto; /* Marge entre les sections */
      button {
        color: #ffffff; /* Couleur du texte du bouton */
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease; /* Transition de la couleur de fond */
      }

      button:disabled {
        background-color: #bdc3c7; /* Couleur de fond du bouton désactivé */
        cursor: not-allowed;
      }

      button:hover:enabled {
        background-color: #2980b9; /* Couleur de fond du bouton lorsqu'on survole */
      }
    }
    .SelectionRepertoireSection:nth-child(1) {
      .recapitulatif{
        display: flex;
        flex-wrap: wrap;
        max-height: 350px;
        padding: 5px;
        justify-content: space-around;
      }
    }
    .SelectionRepertoireSection:nth-child(2) {
      display: flex;
      justify-content: space-between; /* Centrer horizontalement */
      .fichier:nth-child(1) {
        width: 100%;
        margin: 0 10% 0 0;
        .video{
          margin: 0 0 10px 0;
          width: 100%;
        }
      }
      .fichier:nth-child(2) {
        width: 10%;
        margin: 4% 0 0 0;
        #rafraichir{
          width: 100%;
        }
      }
      .fichier:nth-child(3) {
        width: 100%;
        margin: 0 0 0 10%;
        .BDD{
          margin: 0 0 10px 0;
          width: 100%;
        }
      }
    }
  }
  /*.progress-container {
    text-align: center;
    margin-top: 20px;
    .progress-bar {
      width: 100%;
    }

    .progress-label {
      margin-top: 10px;
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
    }
  }*/
</style>
