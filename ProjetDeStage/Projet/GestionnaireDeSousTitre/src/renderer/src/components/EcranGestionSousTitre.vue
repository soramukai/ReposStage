<template>
    <div id="gestionSousTitre">
        <div class="section">
            <div class="videoGestionSousTitre">
                <v-row>
                    <v-col>
                      <video 
                        id="video" 
                        src=""
                        @timeupdate="changementTimeCode" 
                        ref="video"
                        controls>
                      </video>
                      <!-- <video id="myVideo" :src="cheminDeLaVideo" controls></video> -->
                    </v-col>
                </v-row>
                <div id="selectionAffichage">
                  <v-select 
                    class="selectionAffichage"
                    multiple=""
                    variant="outlined"
                    label="Langue"
                    :items="languesVisible"
                    v-model="languesVisibleSelectionne"
                    item-title="langue_nom"
                    item-value="langue_id">
                  </v-select>
                  <v-select 
                    class="selectionAffichage"
                    multiple=""
                    variant="outlined"
                    label="Version"
                    :items="versionsVisible"
                    v-model="versionsVisibleSelectionne"
                    item-title="version_nom"
                    item-value="version_id">
                  </v-select>
                  <v-select 
                    class="selectionAffichage"
                    multiple=""
                    variant="outlined"
                    label="Acteur"
                    :items="personnagesVisible"
                    v-model="personnagesVisibleSelectionne"
                    item-title="personnage_nom"
                    item-value="personnage_id">
                  </v-select>
                </div>
                <!-- REMPLACER la textarea par une dive, et y mettre une classe qui fera un overflow en display flex et je pourrais y appliquer les couleur pour le texte
                Je pourrais aussi plus facilement penser au defilmement du texte -->
                <v-textarea
                  class="no-resize"
                  readonly=""
                  variant="outlined"
                  rows="4"
                  v-model="bandeRythmo"
                  ref="bandeRythmo"
                  :no-resize="true">
                </v-textarea>
            </div>

            <div class="videoGestionSousTitre">
                <v-text-field 
                  readonly 
                  class="gridArea" 
                  variant="outlined"> 
                    Mode {{ mode }}
                </v-text-field>

                <v-select 
                  class="gridArea" 
                  variant="outlined" 
                  label="Langue" 
                  v-model="langueSelectionne" 
                  :items="langues"
                  item-title="langue_nom"
                  item-value="langue_id">
                </v-select>
                
                <router-link 
                  @click="() => ouvrirFenettreGestionLVA('Langue')" 
                  class="gridArea gestionLVA" 
                  to="/modification-lva">
                    <v-btn 
                      class="boutonLVA"  
                      variant="tonal">
                        Gestion Langue
                    </v-btn>
                </router-link>

                <v-select 
                  class="gridArea" 
                  variant="outlined" 
                  label="Version" 
                  v-model="versionSelectionne" 
                  :items="versions"
                  item-title="version_nom"
                  item-value="version_id">
                </v-select>
                
                <router-link 
                  @click="() => ouvrirFenettreGestionLVA('Version')" 
                  class="gridArea gestionLVA" 
                  to="/modification-lva">
                    <v-btn 
                      class="boutonLVA" 
                      variant="tonal">
                        Gestion Version
                    </v-btn>
                </router-link>

                <v-select 
                  :items="couleurs"
                  class="gridArea" 
                  variant="outlined" 
                  label="Couleur" 
                  v-model="couleurSelectionne" 
                  item-title="nom"
                  item-value="code">
                </v-select> 

                <v-select 
                  class="gridArea" 
                  variant="outlined" 
                  label="Personnage" 
                  v-model="personnageSelectionne" 
                  :items="personnages"
                  item-title="personnage_nom"
                  item-value="personnage_id">>
                </v-select>

                <div                   
                  class="gridArea" >
                    <v-text-field 
                      variant="outlined" 
                      v-model="timecodeDebutSelectionne" 
                      label="time-code debut">
                    </v-text-field>
                    <v-btn
                      variant="tonal"
                      @click="preRemplirTimecodeDebut">
                      ⭠
                    </v-btn>
                </div>

                <div class="gridArea">
                  <v-text-field 
                    class="gridArea" 
                    variant="outlined" 
                    v-model="timecodeFinSelectionne" 
                    label="time-code fin">
                  </v-text-field>
                  <v-btn
                    variant="tonal"
                    @click="preRemplirTimecodeFin">
                    ⭠
                  </v-btn>
                </div>
                
                <v-text-field 
                  class="gridArea" 
                  variant="outlined" 
                  v-model="zIndexSelectionne" 
                  label="z-index"
                  type="number"
                  min="1"
                  max="10">
                </v-text-field>

                <v-text-field 
                  class="gridArea" 
                  variant="outlined" 
                  label="Id" 
                  v-model="idSelectionne"
                  type="number"
                  min="1">
                </v-text-field>

                <router-link 
                  @click="() => ouvrirFenettreGestionLVA('Personnage')" 
                  class="gridArea gestionLVA" 
                  to="/modification-lva">
                    <v-btn 
                      class="boutonLVA" 
                      variant="tonal">
                        Gestion Acteur
                    </v-btn>
                </router-link>

                <v-textarea 
                  class="gridArea" 
                  variant="outlined" 
                  v-model="texteSelectionne"
                  rows="4"
                  :no-resize="true">
                    {{ texteSelectionne }}
                </v-textarea>
                <v-btn 
                  class="gridArea" 
                  variant="tonal"
                  @click="creationModification"
                  :disabled="((mode=='Creation'&& (versionSelectionne=='' || timecodeDebutSelectionne=='' ||timecodeFinSelectionne=='' || zIndexSelectionne=='' || texteSelectionne=='' || doublon))||(mode=='Modification'&& doublon)||creationModificationNOk)">
                    {{ texteDuMode }}
                </v-btn>
                <v-btn 
                  class="gridArea" 
                  variant="tonal"
                  @click="dupliquerLigne">
                    Copier
                </v-btn>
                <v-btn 
                  id="supprimer" 
                  class="gridArea supprimer" 
                  variant="tonal"
                  @click="supprimerSousTitre">
                    Supprimer
                </v-btn>
                <v-btn 
                  class="gridArea" 
                  variant="tonal"
                  @click="filtrerTableau">
                    Filtrer
                </v-btn>
            </div>
        </div>

        <div 
          class="section">
            <v-data-table
                v-model="ligneSelectionnee"
                :items="tableauSousTitre"  
                :headers="enteteTableau"
                item-value="ligne_id_interne"
                :items-per-page="itemParPage"
                show-select
                @click:row="cliqueLignes"
                :height="tableHeight">
            </v-data-table>
        </div>

        <div 
          class="section">
            <v-btn 
              class="bouton optionProjet" 
                variant="tonal">
                  Exporter
              </v-btn>
            <v-btn 
              class="bouton optionProjet" 
              variant="tonal">
                Importer
            </v-btn>
            <v-btn 
              class="bouton optionProjet" 
              variant="tonal"
              @click="test">
                Sauvegarder
            </v-btn>
            <v-text-field 
              class="input optionProjet" 
              readonly>
                {{ messageInformatif }}
            </v-text-field>

            <router-link 
              class="route" 
              to="/">
                <v-btn 
                  class="bouton optionProjet retour" 
                  variant="tonal">
                    Retour
                </v-btn>
            </router-link>
        </div>
    </div>

</template>

<script lang="ts">
//@ts-nocheck
import Lignes from '../class/Lignes.ts'
export default {
    data(){
        return{
          //Variable V-model
          idSelectionne:"",
          personnageSelectionne:"",
          timecodeDebutSelectionne:"00:00:00,000",
          timecodeFinSelectionne:"00:00:00,001",
          zIndexSelectionne:1,
          couleurSelectionne:"",
          texteSelectionne:"",
          langueSelectionne:"",
          versionSelectionne:"",
          acteurSelectionne:"",
          ligneSelectionnee: [],	
          //Variable Items
          langues:[],
          versions:[],
          acteurs:[],
          personnages:[],
          couleurs:[],      
          tableauSousTitre:[],  
          //tableau de preference de lecture
          languesVisible:[],
          versionsVisible:[],
          personnagesVisible:[],
          languesVisibleSelectionne:[],
          versionsVisibleSelectionne:[],
          personnagesVisibleSelectionne:[],
          //proprieter du tableau
          enteteTableau:[
            {title:'UID',value:'ligne_id_interne',sortable:true},
            {title:'ID',value:'ligne_id',sortable:true},
            {title:'Version',value:'version.version_nom',sortable:true},
            {title:'Langue',value:'version.langue.langue_nom',sortable:true},
            {title:'Debut',value:'ligne_timecode_Debut',sortable:true},
            {title:'Fin',value:'ligne_timecode_Fin',sortable:true},
            {title:'z-index',value:'ligne_z_index',sortable:true},
            {title:'Texte',value:'ligne_texte',sortable:true},
            {title:'Personnage',value:'personnage.personnage_nom',sortable:true},
            {title:'Couleur',value:'ligne_couleur'}
          ],
          couleurs:[
            {"nom":"par defaut","code":"#85A4B1"},
            { "nom": "Noir", "code": "#000000" },
            { "nom": "Blanc", "code": "#FFFFFF" },
            { "nom": "Bleu", "code": "#0000FF" },
            { "nom": "Rouge", "code": "#FF0000" },
            { "nom": "Vert", "code": "#00FF00" },
            { "nom": "Rose", "code": "#FFC0CB" },
            { "nom": "Jaune", "code": "#FFFF00" },
            { "nom": "Orange", "code": "#FFA500" },
            { "nom": "Violet", "code": "#8A2BE2" }
          ],
          tableHeight: 450, // Hauteur maximale du tableau en pixels  
          //Prop
          cheminDeLaVideo:"",
          cheminDeLaDatabase:"",
          //Variable d'interface
          messageInformatif:"",
          texteDuMode:"Créer",	
          itemParPage:10,
          mode:"Creation",
          doublon:false,
          bandeRythmo:"",
          creationModificationNOk:false,
        }
    },
    methods:{
      async filtrerTableau(){
        console.log("ee")
        let tableauFiltre3=[]
        let tableauFiltre1=[]
        let tableauFiltre2=[]
        if(this.languesVisibleSelectionne.length>0){
          this.languesVisibleSelectionne.forEach(async lv=>{
            this.tableauSousTitre.forEach(async st=>{
              if(lv==st.version.langue.langue_id){
                tableauFiltre1.push(st)
              }
            })
          })
        }else{
          tableauFiltre1=this.tableauSousTitre
        }
        if(this.versionsVisibleSelectionne.length>0){
          this.versionsVisibleSelectionne.forEach(async vv=>{
            tableauFiltre1.forEach(async st=>{
              if(vv==st.version.version_id){
                tableauFiltre2.push(st)
              }
            })
          })
        }else{
          tableauFiltre2=tableauFiltre1
        }
        if(this.personnagesVisibleSelectionne.length>0){
          this.personnagesVisibleSelectionne.forEach(async pv=>{
            tableauFiltre2.forEach(async st=>{
              if(pv==st.personnage.personnage_id){
                tableauFiltre3.push(st)
              }
            })
          })
        }else{
          tableauFiltre3=tableauFiltre2
        }
        this.tableauSousTitre=tableauFiltre3
      },
      async actualiserTableau(){
        this.tableauSousTitre= await window.electron.ipcRenderer.invoke('electron:chargerLigne')
        let tab = this.tableauSousTitre
        tab.sort((a, b) => {

          // Tri par le champ 'name' par défaut
          return a.ligne_id_interne - b.ligne_id_interne;
        })
        this.itemParPage=this.tableauSousTitre.length
        this.ligneSelectionnee=[]
        this.filtrerTableau()
      },
      async creationModification(){
        let ligne=null
        let couleurNom=""
        let couleurCode=""
        if(this.couleurSelectionne!=''&&this.couleurSelectionne!=undefined){
          couleurCode=this.couleurSelectionne
          couleurNom=this.couleurs.find(c=>c.code==this.couleurSelectionne).nom
        }
        ligne=new Lignes(
            this.idSelectionne==""?undefined:this.idSelectionne,
            this.versionSelectionne,
            this.timecodeDebutSelectionne,
            this.timecodeFinSelectionne,
            this.zIndexSelectionne,
            this.texteSelectionne,
            this.personnageSelectionne,
            couleurNom,
            couleurCode
          )
        if(this.mode=='Creation'){
          await window.electron.ipcRenderer.send('electron:creerLigne',ligne)
        }else{
          this.ligneSelectionnee.forEach(async l=>{
            await window.electron.ipcRenderer.send('electron:modifierLigne',l,ligne)
          })
        }
        setTimeout(async()=>{await this.actualiserTableau()},100)
      },
      async supprimerSousTitre(){
        await this.ligneSelectionnee.forEach(async i=>{
          await window.electron.ipcRenderer.send('electron:supprimerSousTitre',i)
        })
        this.tableauSousTitre=[]
        this.ligneSelectionnee=[]
        setTimeout(async()=>{await this.actualiserTableau()},1)
      },
      async changementTimeCode(){
        let currentTime = this.$refs.video.currentTime;
        let sousTitresActifs = this.tableauSousTitre.filter(l => {
          let debut = this.timeCodeFormatage(l.ligne_timecode_Debut);
          let fin = this.timeCodeFormatage(l.ligne_timecode_Fin);
          return debut <= currentTime && fin > currentTime;
        });
        if(sousTitresActifs){
          let script = ""
          sousTitresActifs.reverse()
          sousTitresActifs.forEach(s=>{
            script +=(s.personnage==null?"---:"+s.ligne_texte:s.personnage.personnage_nom+": "+s.ligne_texte) +"\n"
          })
          this.bandeRythmo = script
        }
        else{
          this.bandeRythmo="";
        }
      },
      preRemplirTimecodeDebut(){
        let currentTime = this.$refs.video.currentTime;
        this.timecodeDebutSelectionne=this.convertirTempsEnFormat(currentTime)
      },
      preRemplirTimecodeFin(){
        let currentTime = this.$refs.video.currentTime;
        this.timecodeFinSelectionne=this.convertirTempsEnFormat(currentTime)
      },
      timeCodeFormatage(_timecodeString){
      let timecodeConverted = 0
      let timecodeArrayms = _timecodeString.split(',')
      let timecodeArrays = timecodeArrayms[0].split(':')
      let seconde=parseInt(timecodeArrays[2])+parseInt(timecodeArrays[1]*60)+parseInt(timecodeArrays[0]*3600)
      let miliseconde = parseFloat(timecodeArrayms[1]/1000)
      timecodeConverted = parseFloat(seconde+miliseconde)
      return timecodeConverted
      },
      convertirTempsEnFormat(timeInSeconds) {
        // Convertir les secondes en heures, minutes et secondes
        let heures = Math.floor(timeInSeconds / 3600);
        let minutes = Math.floor((timeInSeconds % 3600) / 60);
        let secondes = Math.floor(timeInSeconds % 60);
        // Convertir les millisecondes en trois chiffres
        let millisecondes = Math.floor((timeInSeconds - Math.floor(timeInSeconds)) * 1000);
        // Formater la chaîne de temps
        let formattedTime = `${heures.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')},${millisecondes.toString().padStart(3, '0')}`;
        return formattedTime;
      },
      ouvrirFenettreGestionLVA(page) {
        this.$router.push({
          path: '/modification-lva',
          query: {
            prop1: page,
            propVideo: this.cheminDeLaVideo,
            propDatabase: this.cheminDeLaDatabase,
          }, 
        });
      },
      async changerVersion(){
        this.versionSelectionne=''
        const langue = this.langues.find(langue=>langue.langue_id==this.langueSelectionne)
        if(this.langueSelectionne!=""){
          this.versions=await window.electron.ipcRenderer.invoke('electron:chargerVersionDeLangue',langue.langue_nom)  
        }else{
          this.versions=[];
        }
        this.versionSelectionne=this.versions.length>0?this.versions[0].version_id:''
      },
      async remplirChamps(item){

          this.langueSelectionne=await item.version.langue.langue_id
          await new Promise(resolve => setTimeout(resolve, 10));
          this.versionSelectionne=await item.version.version_id
          this.personnageSelectionne=await item.personnage==null?"":item.personnage.personnage_id
          // this.acteurSelectionne=item.acteur
          this.idSelectionne=item.ligne_id
          this.timecodeDebutSelectionne=item.ligne_timecode_Debut
          this.timecodeFinSelectionne=item.ligne_timecode_Fin
          this.texteSelectionne=item.ligne_texte
          this.zIndexSelectionne=item.ligne_z_index
          this.couleurSelectionne=item.ligne_couleur_hexa
      },
      async viderChamps(){
        if(this.ligneSelectionnee.length>1){
          this.langueSelectionne=''
          this.versionSelectionne=''
        }else{
          this.langueSelectionne=this.langues.length>1?this.langues[1].langue_id:''
          this.versionSelectionne=this.versions.length>0?this.versions[0].version_id:''
        }

          //this.acteurSelectionne=""
          this.idSelectionne=""
          this.timecodeDebutSelectionne=this.ligneSelectionnee.length>1?'':"00:00:00,000"
          this.timecodeFinSelectionne=this.ligneSelectionnee.length>1?'':"00:00:00,001"
          this.texteSelectionne=""
          this.zIndexSelectionne=1
          this.couleurSelectionne=this.couleurs[0].code
          this.personnageSelectionne=""
      },
      activationBouton(){
        if(this.mode=="Creation"){
            document.getElementById("supprimer").style.visibility = "hidden";
            this.texteDuMode="Créer"
        }
        else{
            document.getElementById("supprimer").style.visibility = "visible";
            this.texteDuMode="Modifier"
        }
      },
      //Quand on coche une CheckBox
      cliqueCheckBox(){
        this.miseAJoursEcran()
      },        
      //Quand on click sur une rangée
      cliqueLignes(event) {
        //Ternaire qui ajoute ou enleve l'element selectionner de la liste
        let uid = parseInt(event.target.parentNode.children[1].textContent);
        if(this.ligneSelectionnee.includes(uid)){
          let index = this.ligneSelectionnee.indexOf(uid)
          this.ligneSelectionnee.splice(index,1)
        }
        else{
          this.ligneSelectionnee.push(uid)
        }
        this.miseAJoursEcran()
      },
      deSurlignageLignes(){
        const trsS = Array.from(document.querySelectorAll(".v-data-table__tr--clickableSelected")).filter((l)=>!this.ligneSelectionnee.includes(parseInt(l.children[1].textContent)))
        trsS.forEach(tr=>{
          tr.className="v-data-table__tr v-data-table__tr--clickable"
        })
      },
      async miseAJoursEcran(){
        //Si une seul ligne est selectionné
        this.ligneSelectionnee.length===1?await this.remplirChamps(this.tableauSousTitre.find(x=>x.ligne_id_interne==this.ligneSelectionnee[0])):await this.viderChamps()
        if(this.ligneSelectionnee.length>=1){
          this.mode="Modification"
          this.texteDuMode="Modifier"
          if(this.personnages[0]!='Aucun'){
            this.personnages=['Aucun'].concat(this.personnages)
          }
          if(this.couleurs[0]!=''){
            this.couleurs=[''].concat(this.couleurs)
          }
        }
        else{
          this.mode="Creation" 
          this.texteDuMode="Créer"
          if(this.personnages[0]=='Aucun'){
            this.personnages.splice(this.personnages[0],1)
          }
          if(this.couleurs[0]==''){
            this.couleurs.splice(this.couleurs[0],1)
          }
        }
        this.surlignageLignes()
        this.deSurlignageLignes()
      },
      surlignageLignes(){
        const trs = Array.from(document.querySelectorAll(".v-data-table__tr--clickable")).filter((l)=>this.ligneSelectionnee.includes(parseInt(l.children[1].textContent)))
        trs.forEach(tr=>{
          tr.className="v-data-table__tr v-data-table__tr--clickableSelected"
        })
      },
      numeroterLigne(){
        let i=1
        document.querySelectorAll(".lignesNumero").forEach(row=>{
            row.textContent=i
            i++
        })
      },
      async initialisationProps(){
        document.getElementById('video').src='fichier://'+this.cheminDeLaVideo;
        if(!await window.electron.ipcRenderer.invoke('electron:dbActive')){
          await window.electron.ipcRenderer.send('electron:initialiserDatabase', this.cheminDeLaDatabase)//voir pour attendre la reponse de la BDD
          await window.electron.ipcRenderer.send('electron:dbSwitchOn')
          setTimeout(async()=>{await this.initialiserDonne()},500)//et supprimer ce timeOut
        }else{
          await this.initialiserDonne()
        }
      },
      async initialiserDonne(){
        this.langues = [''].concat(await window.electron.ipcRenderer.invoke('electron:chargerLangue'))
        //this.versions = await window.electron.ipcRenderer.invoke('electron:chargerVersion')
        this.personnages = [''].concat(await window.electron.ipcRenderer.invoke('electron:chargerPersonnage'))
        let tab = await window.electron.ipcRenderer.invoke('electron:chargerLigne')
        tab.sort((a, b) => {

          // Tri par le champ 'name' par défaut
          return a.ligne_id_interne - b.ligne_id_interne;
        })
        this.tableauSousTitre=tab
        this.itemParPage=this.tableauSousTitre.length
        this.couleurSelectionne=this.couleurs[0].code
        this.viderChamps()
        this.languesVisible= await window.electron.ipcRenderer.invoke('electron:chargerLangue')
        this.versionsVisible= await window.electron.ipcRenderer.invoke('electron:chargerVersion')
        this.personnagesVisible= await window.electron.ipcRenderer.invoke('electron:chargerPersonnage')
      },
      async verifierDoublon(){

        if(this.ligneSelectionnee.length==1 && await this.tableauSousTitre.find(l=>{ return l.ligne_id_interne==this.ligneSelectionnee}).ligne_id == this.idSelectionne){
          this.doublon=false
        }
        else{
          this.doublon=false
          this.tableauSousTitre.forEach(async l => {
            if((l.ligne_id==this.idSelectionne && l.version_id ==this.versionSelectionne) || (this.idSelectionne!='' && this.versionSelectionne=='')){
              this.doublon=true
            }
          });
        }

      },
      async dupliquerLigne(){
        // this.ligneSelectionnee.forEach(async l=>{
        //   setTimeout(async ()=>{await window.electron.ipcRenderer.send('electron:dupliquerLigne',l)},1000)
        //   this.traiterLignesAvecDelai(l)
        // })
        for(let  l of this.ligneSelectionnee){
          await new Promise(resolve => setTimeout(resolve, 10));
          await window.electron.ipcRenderer.send('electron:dupliquerLigne', l);
        }
        this.ligneSelectionnee=[]
        await this.miseAJoursEcran()
        await this.actualiserTableau()
      },
      async test(){

      }
    },  
      async mounted(){
      //Sert a enlever l'outil de pagination du v-data-table
      document.querySelector(".v-data-table-footer").innerHTML=""
      //Force toute les donnée a s'afficher dans le tableau
      await this.initialisationProps()
    },
    watch:{
      langueSelectionne(){
          this.changerVersion()
      },
      mode(){
          this.activationBouton()
      },
      ligneSelectionnee(){
          this.cliqueCheckBox()
      },
      idSelectionne(){
        this.verifierDoublon()
      },
      versionSelectionne(){
        this.verifierDoublon()
      },
      personnageSelectionne(){

      },
      timecodeDebutSelectionne(){
        if(this.creationModificationNOk=this.ligneSelectionnee.length<1){          
          const regex = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9],[0-9]{3}$/;
          if (regex.test(this.timecodeDebutSelectionne)) {
            if(this.timeCodeFormatage(this.timecodeDebutSelectionne)>= this.timeCodeFormatage(this.timecodeFinSelectionne)){
              let timeCodeDebut= this.timecodeDebutSelectionne.split(',')
              let timecodeDetail= timeCodeDebut[0].split(':')
              let heures=parseInt(timecodeDetail[0])
              let minutes=parseInt(timecodeDetail[1])
              let secondes=parseInt(timecodeDetail[2])
              let miliseconde=parseInt(timeCodeDebut[1])

              miliseconde++
              if(miliseconde==1000){
                miliseconde="000"
                secondes++
              }else{
                miliseconde=miliseconde>=100?miliseconde.toString():miliseconde>=10?"0"+miliseconde:"00"+miliseconde
              }
              if(secondes>=60){
                secondes="00"
                minutes++
              }else{
                secondes=secondes>=10?secondes.toString():"0"+secondes
              }
              if(minutes>=60){
                minutes="00"
                heures++
              }else{
                minutes=minutes>=10?minutes.toString():"0"+minutes
              }
              heures=heures>=10?heures.toString():"0"+heures
              this.timecodeFinSelectionne=heures+":"+minutes+":"+secondes+","+miliseconde 
            }
            this.creationModificationNOk=false
          } else {
            this.creationModificationNOk=true
          }
        }else{
          const regex = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9],[0-9]{3}$/;
          this.creationModificationNOk=!(regex.test(this.timecodeDebutSelectionne)||this.timecodeDebutSelectionne=='')
        }
      },
      timecodeFinSelectionne(){
        if(this.creationModificationNOk=this.ligneSelectionnee.length<1){     
          const regex = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9],[0-9]{3}$/;
          if (regex.test(this.timecodeFinSelectionne)) {
            if(this.timeCodeFormatage(this.timecodeDebutSelectionne)>= this.timeCodeFormatage(this.timecodeFinSelectionne)){
            let timeCodeFin= this.timecodeFinSelectionne.split(',')
            let timecodeDetail= timeCodeFin[0].split(':')
            let heures=parseInt(timecodeDetail[0])
            let minutes=parseInt(timecodeDetail[1])
            let secondes=parseInt(timecodeDetail[2])
            let miliseconde=parseInt(timeCodeFin[1])

            miliseconde--
            if(miliseconde<=0 && (heures>0 || minutes>0 || secondes>0)){
              miliseconde="999"
              secondes--
            }else if(miliseconde<=0 && (heures<=0 && minutes<=0 && secondes<=0)){
              miliseconde="000"
            }else{
              miliseconde=miliseconde>=100?miliseconde.toString():miliseconde>=10?"0"+miliseconde:"00"+miliseconde
            }
            if(secondes<=0 && (heures>0 || minutes>0)){
              secondes="59"
              minutes--
            }else if(secondes==0 && (heures<=0 && minutes<=0)){
              secondes="00"
            }else{
              secondes=secondes>=10?secondes.toString():"0"+secondes
            }
            if(minutes<=0 && heures>0){
              minutes="59"
              heures--
            }else if(minutes<=0 && heures<=0){
              minutes="00"
              heures="00"
            }else{
              minutes=minutes>=10?minutes.toString():"0"+minutes
            }
            this.timecodeDebutSelectionne=heures+":"+minutes+":"+secondes+","+miliseconde 
          }
          if(this.timecodeFinSelectionne=="00:00:00,000"){
            this.timecodeDebutSelectionne="00:00:00,000"
            this.timecodeFinSelectionne="00:00:00,001"
          }
          this.creationModificationNOk=false
          }else{
            if(this.timecodeFinSelectionne=="100:00:00,000"){
              this.timecodeDebutSelectionne="00:00:00,000"
              this.timecodeFinSelectionne="00:00:00,001"
              this.creationModificationNOk=false
            }else{
              this.creationModificationNOk=true
            }
          }
        }else{
          const regex = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9],[0-9]{3}$/;
          this.creationModificationNOk=!(regex.test(this.timecodeFinSelectionne)||this.timecodeFinSelectionne=='')
        }
      },
      languesVisibleSelectionne(){
        this.actualiserTableau()
      },
      versionsVisibleSelectionne(){
        this.actualiserTableau()
      },
      personnagesVisibleSelectionne(){
        this.actualiserTableau()
      }
    },
    created() {
      const propVideo = this.$route.query.propVideo;
      const propDatabase = this.$route.query.propDatabase;
      

      if (typeof propVideo === 'string') {
        this.cheminDeLaVideo = propVideo;
      } else {
        console.error('PropVideo est undefined.');
      }
      if (typeof propDatabase === 'string') {
        this.cheminDeLaDatabase = propDatabase;
      } else {
        console.error('PropDatabase est undefined.');
      }
    },
    computed: {
    },
}
</script>

<style lang="scss" scoped>
    #selectionAffichage{
      display: flex;
      .selectionAffichage{
        margin: 5px;
        width: 30%;
      }
    }
    .bg{
        background-color: red !important;
    }

    .route{
      color: #86a5b1;
      .retour{
        width: 100%;
      }
    }
    .gestionLVA{
      color: #86a5b1;
      .boutonLVA{
        width: 100%;
      }
    }
    #gestionSousTitre{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .supprimer{
        background-color: lightcoral;
        color: white;
    }
    .section:nth-child(1){
        width: 100%;
        display: flex;
        flex-direction: row;
        border: 1px double   #86a5b1;
        .videoGestionSousTitre:nth-child(1){
            margin: auto;

            height: 100%;
            #video{
                width: 800px;
                height: 450px;
            }        
        }

        .videoGestionSousTitre:nth-child(2){
            width: 100%;
            border: 1px double #86a5b1;
            display: grid;
            grid-template-columns: repeat(7,1fr); /* 8 colonnes égales */
            gap: 10px; /* Espacement entre les éléments */
            grid-template-areas:
                "zone1 zone1 zone1 . . . . ."
                "zone2 zone2 zone2 zone3 zone7 zone7 zone7 zone12"
                "zone4 zone4 zone4 zone5 zone6 zone6 zone6 ."
                "zone10 zone8 zone8 zone8 zone9 zone9 zone9 zone11"
                "zone13 zone13 zone13 zone13 zone13 zone13  zone13 zone13"
                "zone13 zone13 zone13 zone13 zone13 zone13  zone13 zone13"
                "zone14 zone14 zone15 zone15 . . . zone16"
                "zone17 zone17 . . . . . ."
                ;
                .gridArea:nth-child(1){grid-area: zone1;}
                .gridArea:nth-child(2){grid-area: zone2;}
                .gridArea:nth-child(3){grid-area: zone3;}
                .gridArea:nth-child(4){grid-area: zone4;}
                .gridArea:nth-child(5){grid-area: zone5;}
                .gridArea:nth-child(6){grid-area: zone6;}
                .gridArea:nth-child(7){grid-area: zone7;}
                .gridArea:nth-child(8){grid-area: zone8;                  
                  display: flex;}
                .gridArea:nth-child(9){grid-area: zone9;                  
                  display: flex;}
                .gridArea:nth-child(10){grid-area: zone10;}
                .gridArea:nth-child(11){grid-area: zone11;}
                .gridArea:nth-child(12){grid-area: zone12;}
                .gridArea:nth-child(13){grid-area: zone13;}
                .gridArea:nth-child(14){grid-area: zone14;}
                .gridArea:nth-child(15){grid-area: zone15;}
                .gridArea:nth-child(16){grid-area: zone16;}
                .gridArea:nth-child(17){grid-area: zone17;}

        }

    }
    .section:nth-child(2){
        width: 100%;
        border: 1px double #86a5b1;
    }
    .section:nth-child(3){
        width: 100%;
        border: 1px double #86a5b1;
        display: flex;
        .optionProjet{
            margin: 5px 10px 5px 10px;
        }
    }    

    .bouton{
        height: 2em !important;
    }
    .input{
     height: 0;   
    }



</style>