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
                    </v-col>
                </v-row>
                <div id="selectionAffichage">
                  <v-select 
                    :hide-details=true
                    class="selectionAffichage"
                    multiple
                    variant="outlined"
                    label="Langue"
                    :items="languesAAfficher"
                    v-model="languesAAfficherSelectionne"
                    item-title="langue_nom"
                    item-value="langue_id">
                  </v-select>
                  <v-select 
                    :hide-details=true
                    class="selectionAffichage"
                    multiple
                    variant="outlined"
                    label="Version"
                    :items="versionAAfficher"
                    v-model="versionAAfficherSelectionne"
                    item-title="version_nom"
                    item-value="version_id">
                  </v-select>
                  <v-select 
                    :hide-details=true
                    class="selectionAffichage"
                    multiple
                    variant="outlined"
                    label="Acteur"
                    :items="personnageAAfficher"
                    v-model="personnageAAfficherSelectionne"
                    item-title="personnage_nom"
                    item-value="personnage_id">
                  </v-select>
                </div>
                <div 
                  id="texteDeLaBandeRythmo">
                </div>
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
                  v-model="idLangueSelectionne" 
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
                  v-model="idVersionSelectionne" 
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
                  v-model="codeCouleurSelectionne" 
                  item-title="nom"
                  item-value="code">
                </v-select> 

                <v-select 
                  class="gridArea" 
                  variant="outlined" 
                  label="Personnage" 
                  v-model="idPersonnageSelectionne" 
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
                      class="timecodeBouton vbtn"
                      variant="tonal"
                      @click="preRemplirTimecodeDebut">
                      ⭠
                    </v-btn>
                </div>

                <div class="gridArea">
                  <v-text-field
                    variant="outlined" 
                    v-model="timecodeFinSelectionne" 
                    label="time-code fin">
                  </v-text-field>
                  <v-btn
                    class="timecodeBouton"
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
                  class="gridArea textfield" 
                  variant="outlined" 
                  label="Id" 
                  v-model="idSelectionne"
                  type="number"
                  min="1"
                  :disabled="idLigneSelectionnee.length>1">
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
                  :disabled="(conditionDeCreation() || conditionDeModification)">
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

                <v-text-field 
                  class="gridArea" 
                  label="Message:"
                  v-model="messageInformatif"
                  :hide-details=true
                  readonly>
                </v-text-field>
            </div>
        </div>

        <div 
          class="section">
            <v-data-table
              id="tableauSousTitre"
              fixed-header
              v-model="idLigneSelectionnee"
              :items="tableauSousTitre"  
              :headers="enteteTableau"
              item-value="ligne_id_interne"
              :items-per-page="itemParPage"
              show-select
              @click:row="cliqueLignes"
              :height="hauteurTableau">
            </v-data-table>

        </div>

        <div 
          class="section">
            <div class="footer">
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
                variant="tonal">
                  Sauvegarder
              </v-btn>
            </div>
            
            <router-link 
              class="route footer" 
              to="/">
                <v-btn 
                  class="bouton optionProjet retour" 
                  variant="tonal"
                  @click="fermerConnectionDatabase">
                    Retour
                </v-btn>
            </router-link>
            
        </div>
    </div>

</template>

<script lang="ts">
import { LocationQueryValue } from 'vue-router'
import Lignes from '../class/Lignes'
import {JsonCouleur, JsonLangue, JsonLigne, JsonPersonnage, JsonVersion} from '../Interface/Interface'
export default {
    data(){
        return{
          //Variable V-model
          idSelectionne:undefined as number|string|undefined,
          idPersonnageSelectionne:undefined as number|string|undefined,
          timeCodeRegEx:/^[0-9][0-9]:[0-5][0-9]:[0-5][0-9],[0-9]{3}$/ as RegExp,
          timecodeDebutSelectionne:undefined as string|undefined,
          timecodeFinSelectionne:undefined as string|undefined,
          zIndexSelectionne:undefined as number|string|undefined,
          codeCouleurSelectionne:undefined as string|undefined,
          texteSelectionne:undefined as string|undefined,
          idLangueSelectionne:undefined as number|string|undefined,
          idVersionSelectionne:undefined as number|string|undefined,
          idLigneSelectionnee: [] as number[],	
          //Variable Items
          langues:[] as JsonLangue[],
          versions:[] as JsonVersion[],
          personnages:[] as JsonPersonnage[],  
          tableauSousTitre:[] as JsonLigne[],  
          couleurs:[
            {"nom":"par defaut","code":"#85A4B1"},
            { "nom": "Noir", "code": "#000000" },
            { "nom": "Blanc", "code": "#FFFFFF" },
            { "nom": "Bleu", "code": "#2EFEF7" },
            { "nom": "Rouge", "code": "#FF0000" },
            { "nom": "Vert", "code": "#00FF00" },
            { "nom": "Rose", "code": "#FFC0CB" },
            { "nom": "Jaune", "code": "#FFFF00" },
            { "nom": "Orange", "code": "#FFA500" },
            { "nom": "Violet", "code": "#8A2BE2" }
          ] as JsonCouleur[],
          //tableau de preference de lecture
          languesAAfficher:[] as number[],
          versionAAfficher:[] as number[],
          personnageAAfficher:[] as number[],
          languesAAfficherSelectionne:[] as number[],
          versionAAfficherSelectionne:[] as number[],
          personnageAAfficherSelectionne:[] as number[],
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
            {title:'Couleur',value:'ligne_couleur',sortable:true}
          ] as any[]|undefined,
          hauteurTableau: 400 as number,
          //Prop
          urlDeLaVideo:"" as string,
          urlDuRepertoire:"" as string,
          //Variable d'interface
          messageInformatif:"" as string,
          texteDuMode:"Créer" as string,	
          itemParPage:10 as number,
          mode:"Creation" as string,

          doublon:false as boolean,
          texteDeLaBandeRythmo:"" as string,
          conditionDeModification:false as boolean,
        }
    },
    methods:{
      async creationModification(): Promise<void>{
        let couleurNom: string|undefined=""
        let couleurCode: string|undefined=""
        if(this.codeCouleurSelectionne!=''&&this.codeCouleurSelectionne!=undefined){
          couleurCode=this.codeCouleurSelectionne==""?"#85A4B1":this.codeCouleurSelectionne
          couleurNom=couleurCode? this.couleurs.find(c=>c.code==this.codeCouleurSelectionne)?.nom:undefined
        }
        const ligne: Lignes = new Lignes(
            this.idSelectionne==""?undefined:this.idSelectionne as number,
            this.idVersionSelectionne==""?undefined:this.idVersionSelectionne as number,
            this.timecodeDebutSelectionne==""?undefined:this.timecodeDebutSelectionne as string,
            this.timecodeFinSelectionne==""?undefined:this.timecodeFinSelectionne as string,
            this.zIndexSelectionne==""?undefined:this.zIndexSelectionne as number,
            this.texteSelectionne==""?undefined:this.texteSelectionne as string,
            this.idPersonnageSelectionne=="Aucun"?-1:this.idPersonnageSelectionne==""?undefined:this.idPersonnageSelectionne as number,
            couleurNom,
            couleurCode
          )
        if(this.mode=='Creation'){
          ligne.creationLigne();
          // @ts-ignore (define in dts)
          window.electron.ipcRenderer.on('electron:creationLigneReussi',async()=>{
              await this.actualiserTableau()
          })
        }else{
          this.modificationRecurssive(ligne)
          /*this.ligneSelectionnee.forEach(l=>{
            // @ts-ignore (define in dts)
            window.electron.ipcRenderer.send('electron:modifierLigne',l,ligne)
            // @ts-ignore (define in dts)
            window.electron.ipcRenderer.on('electron:modificationLigneReussi',async()=>{
              await this.actualiserTableau()
            })
          })*/
        }
      },
      async modificationRecurssive(_ligne: Lignes): Promise<void>{//Choix de la recursivité pour gerer l'assynchrone
        const uidSelectionne: number =this.idLigneSelectionnee[0]
        this.idLigneSelectionnee.splice(0,1)
        _ligne.modificationLigne(uidSelectionne)
          // @ts-ignore (define in dts)
          window.electron.ipcRenderer.on('electron:modificationLigneReussi',async()=>{
             await this.actualiserTableau()
          })
          if(this.idLigneSelectionnee.length > 0)
          {
            this.modificationRecurssive(_ligne)
          }
          else{
            this.miseAJoursEcran()
          }
      },
      async supprimerSousTitre(): Promise<void>{
        if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?\nCeci est une action irreverssible!")){
          this.idLigneSelectionnee.forEach(async i=>{
             new Lignes().suppressionLigne(i)
          })
          this.tableauSousTitre=[]
          this.idLigneSelectionnee=[]
          // @ts-ignore (define in dts)
          window.electron.ipcRenderer.on('electron:suppressionLigneReussi',async()=>{
            await this.actualiserTableau()
          })
        }
      },
      async dupliquerLigne(): Promise<void>{
        let uid: number=this.idLigneSelectionnee[0]
        for(uid of this.idLigneSelectionnee){
          await new Promise(resolve => setTimeout(resolve, 10));
          new Lignes().duplicationLigne(uid);
        }
        this.idLigneSelectionnee=[]
        await this.miseAJoursEcran()
        await this.actualiserTableau()
      },
      async chargerLigne(): Promise<JsonLigne[]>{
        // @ts-ignore (define in dts)
        return await window.electron.ipcRenderer.invoke('electron:chargerLigne')
      },

      async filtrerTableau(): Promise<void>{
        let tableauFiltre3: JsonLigne[] = []
        let tableauFiltre1: JsonLigne[] = []
        let tableauFiltre2: JsonLigne[] = []
        if(this.languesAAfficherSelectionne.length > 0){
          this.languesAAfficherSelectionne.forEach(async langueVisible=>{
            this.tableauSousTitre.forEach(sousTitre=>{
              if(langueVisible == sousTitre.version.langue.langue_id){
                tableauFiltre1.push(sousTitre)
              }
            })
          })
        }else{
          tableauFiltre1=this.tableauSousTitre
        }
        if(this.versionAAfficherSelectionne.length > 0){
          this.versionAAfficherSelectionne.forEach(async versionVisible=>{
            tableauFiltre1.forEach(async sousTitre=>{
              if(versionVisible == sousTitre.version.version_id){
                tableauFiltre2.push(sousTitre)
              }
            })
          })
        }else{
          tableauFiltre2 = tableauFiltre1
        }
        if(this.personnageAAfficherSelectionne.length > 0){
          this.personnageAAfficherSelectionne.forEach(async personnageVisible=>{
            tableauFiltre2.forEach(async sousTitre=>{
              if(personnageVisible == sousTitre.personnage.personnage_id){
                tableauFiltre3.push(sousTitre)
              }
            })
          })
        }else{
          tableauFiltre3 = tableauFiltre2
        }
        this.tableauSousTitre = tableauFiltre3
        this.changementTimeCode()
        await new Promise(resolve => setTimeout(resolve, 10));
        this.fixeCSS()
      },
      conditionDeCreation(): boolean{
        return (this.mode=='Creation'&& (this.idVersionSelectionne=='' || this.timecodeDebutSelectionne=='' || this.timecodeFinSelectionne=='' || this.zIndexSelectionne=='' || this.texteSelectionne=='' || this.doublon))||(this.mode=='Modification'&& this.doublon);
      },
      async actualiserTableau(): Promise<void>{
        // @ts-ignore (define in dts)
        this.tableauSousTitre= await window.electron.ipcRenderer.invoke('electron:chargerLigne')
        await new Promise(resolve => setTimeout(resolve, 10));
        this.fixeCSS()
        let tab = this.tableauSousTitre
        tab.sort((a, b) => {

          // Tri par le champ 'name' par défaut
          return a.ligne_id_interne - b.ligne_id_interne;
        })
        this.itemParPage = this.tableauSousTitre.length
        this.idLigneSelectionnee=[]
        this.filtrerTableau()
      },
      changementTimeCode(): void{
        let currentTime: number = (this.$refs.video as HTMLVideoElement).currentTime;
        let sousTitresActifs = this.tableauSousTitre.filter(l => {
          let debut = this.timeCodeFormatage(l.ligne_timecode_Debut);
          let fin = this.timeCodeFormatage(l.ligne_timecode_Fin);
          return debut <= currentTime && fin > currentTime;
        });
        if(sousTitresActifs){
          let balise: HTMLElement|null = document.getElementById('texteDeLaBandeRythmo')
          sousTitresActifs.reverse()
          if(balise){
            balise.innerHTML=''
            sousTitresActifs.forEach(s=>{
              let p = document.createElement('p')   
              p.textContent =(s.personnage==null?"---:"+s.ligne_texte:s.personnage.personnage_nom+": "+s.ligne_texte) +"\n"
              let color = 'color: '+s.ligne_couleur_hexa
              p.setAttribute('style',color)
              balise?.appendChild(p)
            })
          }
        }
        else{
          this.texteDeLaBandeRythmo="";
        }
      },
      preRemplirTimecodeDebut(): void{
        let currentTime: number = (this.$refs.video as HTMLVideoElement).currentTime;
        this.timecodeDebutSelectionne=this.convertirTempsEnFormat(currentTime)
      },
      preRemplirTimecodeFin(): void{
        let currentTime: number = (this.$refs.video as HTMLVideoElement).currentTime;
        this.timecodeFinSelectionne=this.convertirTempsEnFormat(currentTime)
      },
      timeCodeFormatage(_timecodeString): number{
        let timecodeConverted: number = 0;
        let timecodeArrayms: string[] = _timecodeString.split(',');
        let timecodeArrays: string[] = timecodeArrayms[0].split(':');
        let heures: number = parseInt(timecodeArrays[0]);
        let minutes: number = parseInt(timecodeArrays[1]);
        let secondes: number = parseInt(timecodeArrays[2]);
        // Convertir les heures, minutes et secondes en secondes
        let totalSeconds: number = heures * 3600 + minutes * 60 + secondes;
        // Convertir les millisecondes en secondes
        let millisecondes: number = parseFloat(timecodeArrayms[1]) / 1000;
        // Ajouter les secondes et les millisecondes
        timecodeConverted = totalSeconds + millisecondes;
        return timecodeConverted;
      },
      convertirTempsEnFormat(timeInSeconds): string {
        // Convertir les secondes en heures, minutes et secondes
        let heures: number = Math.floor(timeInSeconds / 3600);
        let minutes: number = Math.floor((timeInSeconds % 3600) / 60);
        let secondes: number = Math.floor(timeInSeconds % 60);
        // Convertir les millisecondes en trois chiffres
        let millisecondes: number = Math.floor((timeInSeconds - Math.floor(timeInSeconds)) * 1000);
        // Formater la chaîne de temps
        let formattedTime: string = `${heures.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')},${millisecondes.toString().padStart(3, '0')}`;
        return formattedTime;
      },
      ouvrirFenettreGestionLVA(page: string): void{
        this.$router.push({
          path: '/modification-lva',
          query: {
            prop1: page,
            propVideo: this.urlDeLaVideo,
            propDatabase: this.urlDuRepertoire,
          }, 
        });
      },
      async changerVersion(): Promise<void>{
        this.idVersionSelectionne = ''
        const langue: JsonLangue|undefined = this.langues.find(langue=>langue.langue_id == this.idLangueSelectionne)
        if(this.idLangueSelectionne != ""){
          // @ts-ignore (define in dts)
          this.versions = await window.electron.ipcRenderer.invoke('electron:chargerVersionDeLangue',langue?.langue_nom)  
        }else{
          this.versions=[];
        }
        this.idVersionSelectionne = this.versions.length>0?this.versions[0].version_id:''
      },
      async remplirChamps(item: JsonLigne|undefined): Promise<void>{
        if(item){
          this.idLangueSelectionne= item.version.langue.langue_id
          await new Promise(resolve => setTimeout(resolve, 10));
          this.idVersionSelectionne= item.version.version_id
          this.idPersonnageSelectionne= item.personnage==null?"":item.personnage.personnage_id
          this.idSelectionne=item.ligne_id
          this.timecodeDebutSelectionne=item.ligne_timecode_Debut
          this.timecodeFinSelectionne=item.ligne_timecode_Fin
          this.texteSelectionne=item.ligne_texte
          this.zIndexSelectionne=item.ligne_z_index
          this.codeCouleurSelectionne=item.ligne_couleur_hexa
          let video = this.$refs.video;
          (video as HTMLVideoElement).currentTime = this.timeCodeFormatage(this.timecodeDebutSelectionne);
        }
      },
      viderChamps(): void{
        if(this.idLigneSelectionnee.length>1){
          this.idLangueSelectionne=''
          this.idVersionSelectionne=''
        }else{
          this.idLangueSelectionne=this.langues.length>1?this.langues[1].langue_id:''
          this.idVersionSelectionne=this.versions.length>0?this.versions[0].version_id:''
        }
          this.idSelectionne=""
          this.timecodeDebutSelectionne=this.idLigneSelectionnee.length>1?'':"00:00:00,000"
          this.timecodeFinSelectionne=this.idLigneSelectionnee.length>1?'':"00:00:00,001"
          this.texteSelectionne=""
          this.zIndexSelectionne=1
          this.codeCouleurSelectionne=this.couleurs[0].code
          this.idPersonnageSelectionne=""
      },
      activationBouton(): void{
        if(this.mode=="Creation"){
            (document.getElementById("supprimer") as HTMLElement).style.visibility = "hidden";
            this.texteDuMode="Créer"
        }
        else{
            (document.getElementById("supprimer") as HTMLElement).style.visibility = "visible";
            this.texteDuMode="Modifier"
        }
      },
      //Quand on coche une CheckBox
      cliqueCheckBox(): void{
        this.miseAJoursEcran()
      },        
      //Quand on click sur une rangée
      cliqueLignes(event): void{
        //Ternaire qui ajoute ou enleve l'element selectionner de la liste
        let uid: number = parseInt(event.target.parentNode.children[1].textContent);
        if(this.idLigneSelectionnee.includes(uid)){
          let index: number = this.idLigneSelectionnee.indexOf(uid)
          this.idLigneSelectionnee.splice(index,1)
        }
        else{
          this.idLigneSelectionnee.push(uid)
        }
        this.miseAJoursEcran()
      },
      deSurlignageLignes(): void{
        const trsS: Element[] = Array.from(document.querySelectorAll(".v-data-table__tr--clickableSelected")).filter((l) => {
          const child: Element = l.children?.[1];
          return !this.idLigneSelectionnee.includes(parseInt(child?.textContent ?? ''));
        });
        trsS.forEach(tr => {
          if (tr instanceof HTMLElement) {
              tr.className = "v-data-table__tr v-data-table__tr--clickable";
              tr.style.backgroundColor = '#2F3241';
              tr.style.color = '#86a5b1';
          } else {
              console.error("L'élément n'est pas de type HTMLElement.");
          }
        });
      },
      async miseAJoursEcran(): Promise<void>{
        //Si une seul ligne est selectionné
        this.idLigneSelectionnee.length === 1 ? await this.remplirChamps(this.tableauSousTitre.find(x=>x.ligne_id_interne==this.idLigneSelectionnee[0])) : await this.viderChamps()
        if(this.idLigneSelectionnee.length>=1){
          this.mode="Modification"
          this.texteDuMode="Modifier"
          if(this.personnages[0].personnage_nom!="Aucun"){
            this.personnages = [{ personnage_id: undefined, personnage_nom: "Aucun" }, ...this.personnages];
          }
          if(this.couleurs[0].nom!=''){
            this.couleurs = [{nom:'',code:''},...this.couleurs]
          }
        }
        else{
          this.mode="Creation" 
          this.texteDuMode="Créer"
          if(this.personnages[0].personnage_nom=='Aucun'){
            this.personnages.splice(0,1)
          }
          if(this.couleurs[0].nom==''){
            this.couleurs.splice(0,1)
          }
        }
        this.surlignageLignes()
        this.deSurlignageLignes()
      },
      surlignageLignes(): void{
        const trsS: Element[] = Array.from(document.querySelectorAll(".v-data-table__tr--clickable")).filter((l) => {
          const child: Element = l.children?.[1];
          return this.idLigneSelectionnee.includes(parseInt(child?.textContent ?? ''));
        });
        trsS.forEach(tr=>{
          if (tr instanceof HTMLTableRowElement) {
              tr.className = "v-data-table__tr v-data-table__tr--clickableSelected";
              tr.style.backgroundColor = '#86a5b1';
              tr.style.cursor = "pointer";
              tr.style.color = "#2F3241";
          } else {
              console.error("L'élément n'est pas de type HTMLTableRowElement.");
          }
        })
      },
      /**
     * Cette méthode initialise les propriétés de la classe. Elle configure la source de la vidéo, vérifie l'état de la base de données,
     * initialise la base de données si elle n'est pas active, puis initialise les données de l'application.
     * 
     * @returns Une promesse résolue lorsque toutes les initialisations sont terminées.
     */
      async initialisationProps(): Promise<void>{
        (document.getElementById('video') as HTMLVideoElement).src='fichier://'+this.urlDeLaVideo;
        // @ts-ignore (define in dts)
        if(!await window.electron.ipcRenderer.invoke('electron:dbActive')){
          // @ts-ignore (define in dts)
          window.electron.ipcRenderer.send('electron:initialiserDatabase', this.urlDuRepertoire)//voir pour attendre la reponse de la BDD
          // @ts-ignore (define in dts)
          window.electron.ipcRenderer.on('electron:connectionReussi',async (_)=>{
            await this.initialiserDonne()
          })
        }else{
          await this.initialiserDonne()
        }
      },
      async initialiserDonne(): Promise<void>{
        // @ts-ignore (define in dts)
        this.langues = [{langue_id:undefined,langue_nom:''},...await window.electron.ipcRenderer.invoke('electron:chargerLangue')]
        // @ts-ignore (define in dts)
        this.personnages = [{personnage_id:undefined,personnage_nom:''},...(await window.electron.ipcRenderer.invoke('electron:chargerPersonnage'))]
        let tab: JsonLigne[] = await this.chargerLigne();
        tab.sort((a, b) => {

          // Tri par le champ 'name' par défaut
          return a.ligne_id_interne - b.ligne_id_interne;
        })
        this.tableauSousTitre=tab
        this.itemParPage=this.tableauSousTitre.length
        this.codeCouleurSelectionne=this.couleurs[0].code
        this.viderChamps()
        // @ts-ignore (define in dts)
        this.languesAAfficher= await window.electron.ipcRenderer.invoke('electron:chargerLangue')
        // @ts-ignore (define in dts)
        this.versionAAfficher= await window.electron.ipcRenderer.invoke('electron:chargerVersion')
        // @ts-ignore (define in dts)
        this.personnageAAfficher= await window.electron.ipcRenderer.invoke('electron:chargerPersonnage')
        await new Promise(resolve => setTimeout(resolve, 10));
        this.fixeCSS()
      },
      fixeCSS(){
        let tableCheckBox: NodeListOf<Element>= document.querySelectorAll('.v-selection-control__input input')
        tableCheckBox.forEach(element => {
          if (element instanceof HTMLElement) {
              element.style.cursor = "pointer";
              element.style.position = "absolute";
              element.style.top = "1em";
              element.style.opacity = "1";
              element.style.width = "40%";
              element.style.height = "40%";
              element.style.left = "1em";
          } else {
              console.error("L'élément n'est pas de type HTMLElement.");
          }
        });
      },
      verifierDoublon(): void{

        if(this.idLigneSelectionnee.length==1 && this.tableauSousTitre.find(l=>{ return this.idLigneSelectionnee.includes(l.ligne_id_interne)})?.ligne_id == this.idSelectionne){
          this.doublon=false
        }
        else{
          this.doublon=false
          this.tableauSousTitre.forEach(async l => {
            if((l.ligne_id==this.idSelectionne && l.version_id ==this.idVersionSelectionne) || (this.idSelectionne!='' && this.idVersionSelectionne=='')){
              this.doublon=true
            }
          });
        }

      },
      fermerConnectionDatabase(): void{
        // @ts-ignore (define in dts)
        window.electron.ipcRenderer.send('electron:fermerDatabase')
        // @ts-ignore (define in dts)
        window.electron.ipcRenderer.send('electron:dbSwitchOff')
      }
    },  
      async mounted(){
      //Sert a enlever l'outil de pagination du v-data-table
      (document.querySelector(".v-data-table-footer")as HTMLElement).innerHTML=""
      const table = document.getElementById('tableauSousTitre');
      if (table) {
          table.style.height = this.hauteurTableau.toString();
          table.style.backgroundColor = '#2F3241';
          table.style.color = '#86a5b1';
      }

      let ths=document.querySelectorAll('th')
      ths.forEach(th=>{
        th.setAttribute('style','background-color:#2F3241')
      })
      //Force toute les donnée a s'afficher dans le tableau
      await this.initialisationProps()
    },
    watch:{
      idLangueSelectionne(): void{
          this.changerVersion()
      },
      mode(): void{
          this.activationBouton()
      },
      idLigneSelectionnee(newV,oldV): void{
        if(newV.length != oldV.length){
          this.cliqueCheckBox();
        }
      },
      idSelectionne(): void{
        this.verifierDoublon()
      },
      idVersionSelectionne(): void{
        this.verifierDoublon()
      },
      timecodeDebutSelectionne(): void{
        if(this.conditionDeModification!=this.idLigneSelectionnee.length<=1){          
          if(this.timecodeDebutSelectionne){
            if (this.timeCodeRegEx.test(this.timecodeDebutSelectionne)) {
              if(this.timeCodeFormatage(this.timecodeDebutSelectionne)>= this.timeCodeFormatage(this.timecodeFinSelectionne)){
                let timeCodeDebut: string[]|undefined = this.timecodeDebutSelectionne?.split(',')
                let timecodeDetail: string[]|undefined = timeCodeDebut[0].split(':')
                let heures: string|number = parseInt(timecodeDetail[0])
                let minutes: string|number = parseInt(timecodeDetail[1])
                let secondes: string|number = parseInt(timecodeDetail[2])
                let miliseconde: string|number = parseInt(timeCodeDebut[1])

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
              this.conditionDeModification=false
            }
          } else {
            this.conditionDeModification=true
          }
        }else{
          if(this.timecodeDebutSelectionne){
            console.log("eee")
            this.conditionDeModification=!(this.timeCodeRegEx.test(this.timecodeDebutSelectionne)||this.timecodeDebutSelectionne=='')
          }
        }
        if((this.timecodeDebutSelectionne?.length != 12 || 
        this.timecodeDebutSelectionne?.length) && 
        (this.timecodeDebutSelectionne?.length != this.timecodeFinSelectionne?.length) &&
        (this.timecodeFinSelectionne?.length != 12 || 
        this.timecodeFinSelectionne?.length)||
        this.timeCodeFormatage(this.timecodeDebutSelectionne)>=this.timeCodeFormatage(this.timecodeFinSelectionne)){
          this.conditionDeModification=true;
        }else{
          this.conditionDeModification=false;
        }
      },
      timecodeFinSelectionne(): void{
        if(this.conditionDeModification!=this.idLigneSelectionnee.length<=1){     
          if(this.timecodeFinSelectionne){
            if (this.timeCodeRegEx.test(this.timecodeFinSelectionne)) {
              if(this.timeCodeFormatage(this.timecodeDebutSelectionne)>= this.timeCodeFormatage(this.timecodeFinSelectionne)){
              let timeCodeFin: string[]|undefined = this.timecodeFinSelectionne.split(',')
              let timecodeDetail: string[]|undefined = timeCodeFin[0].split(':')
              let heures: string|number = parseInt(timecodeDetail[0])
              let minutes: string|number = parseInt(timecodeDetail[1])
              let secondes: string|number = parseInt(timecodeDetail[2])
              let miliseconde: string|number = parseInt(timeCodeFin[1])

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
          }
          if(this.timecodeFinSelectionne=="00:00:00,000"){
            this.timecodeDebutSelectionne="00:00:00,000"
            this.timecodeFinSelectionne="00:00:00,001"
          }
          this.conditionDeModification=false
          }else{
            if(this.timecodeFinSelectionne=="100:00:00,000"){
              this.timecodeDebutSelectionne="00:00:00,000"
              this.timecodeFinSelectionne="00:00:00,001"
              this.conditionDeModification=false
            }else{
              this.conditionDeModification=true
            }
          }
        }else{
          if(this.timecodeFinSelectionne){
            this.conditionDeModification=!(this.timeCodeRegEx.test(this.timecodeFinSelectionne)||this.timecodeFinSelectionne=='')
          }
        }
        if((this.timecodeDebutSelectionne?.length != 12 || 
        this.timecodeDebutSelectionne?.length) && 
        (this.timecodeDebutSelectionne?.length != this.timecodeFinSelectionne?.length) &&
        (this.timecodeFinSelectionne?.length != 12 || 
        this.timecodeFinSelectionne?.length)||
        this.timeCodeFormatage(this.timecodeDebutSelectionne)>this.timeCodeFormatage(this.timecodeFinSelectionne)){
          this.conditionDeModification=true;
        }else{
          this.conditionDeModification=false;
        }
      },
      languesAAfficherSelectionne(): void{
        this.actualiserTableau()
      },
      versionAAfficherSelectionne(): void{
        this.actualiserTableau()
      },
      personnageAAfficherSelectionne(): void{
        this.actualiserTableau()
      }
    },
    created() {
      const propVideo: LocationQueryValue|LocationQueryValue[] = this.$route.query.propVideo;
      const propDatabase: LocationQueryValue|LocationQueryValue[] = this.$route.query.propDatabase;
      
      if (typeof propVideo === 'string') {
        this.urlDeLaVideo = propVideo;
      } else {
        console.error('PropVideo est undefined.');
        this.messageInformatif='PropVideo est undefined.'
      }
      if (typeof propDatabase === 'string') {
        this.urlDuRepertoire = propDatabase;
      } else {
        console.error('PropDatabase est undefined.');
        this.messageInformatif='PropDatabase est undefined.'
      }
    },
}
</script>

<style lang="scss" scoped>
    #selectionAffichage{
      display: flex;
      .selectionAffichage{
        margin: 0 5px 5px 5px;
        width: 30%;
      }
    }
    #texteDeLaBandeRythmo{
      margin: 0;
      overflow: auto;
      border: 1px outset #86a5b1;
      height: 7em;  
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
                height: 400px;
            }        
        }

        .videoGestionSousTitre:nth-child(2){
            width: 100%;
            border: 1px outset #86a5b1;
            display: grid;
            grid-template-columns: repeat(8,1fr); /* 8 colonnes égales */
            gap: 10px; /* Espacement entre les éléments */
            grid-template-areas:
                "zone1 zone1 zone1 . . . . ."
                "zone2 zone2 zone2 zone3 zone7 zone7 zone7 zone12"
                "zone4 zone4 zone4 zone5 zone6 zone6 zone6 ."
                "zone10 zone8 zone8 zone8 zone9 zone9 zone9 zone11"
                "zone13 zone13 zone13 zone13 zone13 zone13  zone13 zone13"
                "zone13 zone13 zone13 zone13 zone13 zone13  zone13 zone13"
                "zone14 zone14 zone15 zone15 . . . zone16"
                "zone17 zone17 zone17 zone17 zone17 zone17 zone17 zone17"
                ;
                .gridArea:nth-child(1){grid-area: zone1;}
                .gridArea:nth-child(2){grid-area: zone2;}
                .gridArea:nth-child(3){grid-area: zone3;}
                .gridArea:nth-child(4){grid-area: zone4;}
                .gridArea:nth-child(5){grid-area: zone5;}
                .gridArea:nth-child(6){grid-area: zone6;}
                .gridArea:nth-child(7){grid-area: zone7;}
                .gridArea:nth-child(8){
                  grid-area: zone8;                  
                  display: flex;
                  .timecodeBouton{
                    height: 72%;
                    }
                  }
                .gridArea:nth-child(9){
                  grid-area: zone9;                  
                  display: flex;
                  .timecodeBouton{
                    height: 72%;
                  }
                }
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
    .footer:nth-child(1){
      width: 100%;
    }
    .footer:nth-child(2){
      width: 14%;
    }
</style>