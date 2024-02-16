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
                    :hide-details=true
                    class="selectionAffichage"
                    multiple
                    variant="outlined"
                    label="Langue"
                    :items="languesVisible"
                    v-model="languesVisibleSelectionne"
                    item-title="langue_nom"
                    item-value="langue_id">
                  </v-select>
                  <v-select 
                    :hide-details=true
                    class="selectionAffichage"
                    multiple
                    variant="outlined"
                    label="Version"
                    :items="versionsVisible"
                    v-model="versionsVisibleSelectionne"
                    item-title="version_nom"
                    item-value="version_id">
                  </v-select>
                  <v-select 
                    :hide-details=true
                    class="selectionAffichage"
                    multiple
                    variant="outlined"
                    label="Acteur"
                    :items="personnagesVisible"
                    v-model="personnagesVisibleSelectionne"
                    item-title="personnage_nom"
                    item-value="personnage_id">
                  </v-select>
                </div>
                <div 
                  id="bandeRythmo">
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
              fixed-header
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
              variant="tonal">
                Sauvegarder
            </v-btn>


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
import { LocationQueryValue } from 'vue-router'
import Lignes from '../class/Lignes'
import {JsonCouleur, JsonLangue, JsonLigne, JsonPersonnage, JsonVersion} from '../Interface/Interface'
export default {
    data(){
        return{
          //Variable V-model
          idSelectionne:undefined as number|string|undefined,
          personnageSelectionne:undefined as number|string|undefined,
          timeCodeRegEx:/^[0-9][0-9]:[0-5][0-9]:[0-5][0-9],[0-9]{3}$/ as RegExp,
          timecodeDebutSelectionne:undefined as string|undefined,
          timecodeFinSelectionne:undefined as string|undefined,
          zIndexSelectionne:undefined as number|string|undefined,
          couleurSelectionne:undefined as string|undefined,
          texteSelectionne:undefined as string|undefined,
          langueSelectionne:undefined as number|string|undefined,
          versionSelectionne:undefined as number|string|undefined,
          ligneSelectionnee: [] as number[],	
          //Variable Items
          langues:[] as JsonLangue[],
          versions:[] as JsonVersion[],
          personnages:[] as JsonPersonnage[],  
          tableauSousTitre:[] as JsonLigne[],  
          //tableau de preference de lecture
          languesVisible:[] as number[],
          versionsVisible:[] as number[],
          personnagesVisible:[] as number[],
          languesVisibleSelectionne:[] as number[],
          versionsVisibleSelectionne:[] as number[],
          personnagesVisibleSelectionne:[] as number[],
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
          ],
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
          tableHeight: 400 as number, // Hauteur maximale du tableau en pixels  
          //Prop
          cheminDeLaVideo:"" as string,
          cheminDeLaDatabase:"" as string,
          //Variable d'interface
          messageInformatif:"" as string,
          texteDuMode:"Créer" as string,	
          itemParPage:10 as number,
          mode:"Creation" as string,
          doublon:false as boolean,
          bandeRythmo:"" as string,
          creationModificationNOk:false as boolean,
        }
    },
    methods:{
      async filtrerTableau(): Promise<void>{
        let tableauFiltre3:JsonLigne[]=[]
        let tableauFiltre1:JsonLigne[]=[]
        let tableauFiltre2:JsonLigne[]=[]
        if(this.languesVisibleSelectionne.length>0){
          this.languesVisibleSelectionne.forEach(async lv=>{
            this.tableauSousTitre.forEach(st=>{
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
        this.changementTimeCode()
      },
      async actualiserTableau(): Promise<void>{
        // @ts-ignore (define in dts)
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
      async creationModification(): Promise<void>{
        let ligne: Lignes|null = null
        let couleurNom: string|undefined=""
        let couleurCode: string|undefined=""
        if(this.couleurSelectionne!=''&&this.couleurSelectionne!=undefined){
          couleurCode=this.couleurSelectionne==""?"#85A4B1":this.couleurSelectionne
          couleurNom=couleurCode? this.couleurs.find(c=>c.code==this.couleurSelectionne)?.nom:undefined
        }
        ligne=new Lignes(
            this.idSelectionne==""?undefined:this.idSelectionne as number,
            this.versionSelectionne==""?undefined:this.versionSelectionne as number,
            this.timecodeDebutSelectionne==""?undefined:this.timecodeDebutSelectionne as string,
            this.timecodeFinSelectionne==""?undefined:this.timecodeFinSelectionne as string,
            this.zIndexSelectionne==""?undefined:this.zIndexSelectionne as number,
            this.texteSelectionne==""?undefined:this.texteSelectionne as string,
            this.personnageSelectionne=="Aucun"?-1:this.personnageSelectionne==""?undefined:this.personnageSelectionne as number,
            couleurNom=couleurNom,
            couleurCode=couleurCode
          )
        if(this.mode=='Creation'){
          // @ts-ignore (define in dts)
          window.electron.ipcRenderer.send('electron:creerLigne',ligne)
        }else{
          this.ligneSelectionnee.forEach(l=>{
            // @ts-ignore (define in dts)
            window.electron.ipcRenderer.send('electron:modifierLigne',l,ligne)
          })
        }
        setTimeout(async()=>{await this.actualiserTableau()},100)
      },
      async supprimerSousTitre(): Promise<void>{
        if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?\nCeci est une action irreverssible!")){
          this.ligneSelectionnee.forEach(async i=>{
            // @ts-ignore (define in dts)
             window.electron.ipcRenderer.send('electron:supprimerSousTitre',i)
          })
          this.tableauSousTitre=[]
          this.ligneSelectionnee=[]
          setTimeout(async()=>{await this.actualiserTableau()},1)
          }
      },
      changementTimeCode(): void{
        let currentTime: number = (this.$refs.video as HTMLVideoElement).currentTime;
        let sousTitresActifs = this.tableauSousTitre.filter(l => {
          let debut = this.timeCodeFormatage(l.ligne_timecode_Debut);
          let fin = this.timeCodeFormatage(l.ligne_timecode_Fin);
          return debut <= currentTime && fin > currentTime;
        });
        if(sousTitresActifs){
          let balise: HTMLElement|null = document.getElementById('bandeRythmo')
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
          this.bandeRythmo="";
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
      ouvrirFenettreGestionLVA(page): void{
        this.$router.push({
          path: '/modification-lva',
          query: {
            prop1: page,
            propVideo: this.cheminDeLaVideo,
            propDatabase: this.cheminDeLaDatabase,
          }, 
        });
      },
      async changerVersion(): Promise<void>{
        this.versionSelectionne = ''
        const langue: JsonLangue|undefined = this.langues.find(langue=>langue.langue_id == this.langueSelectionne)
        if(this.langueSelectionne != ""){
          // @ts-ignore (define in dts)
          this.versions = await window.electron.ipcRenderer.invoke('electron:chargerVersionDeLangue',langue?.langue_nom)  
        }else{
          this.versions=[];
        }
        this.versionSelectionne = this.versions.length>0?this.versions[0].version_id:''
      },
      async remplirChamps(item): Promise<void>{
          this.langueSelectionne=await item.version.langue.langue_id
          await new Promise(resolve => setTimeout(resolve, 10));
          this.versionSelectionne=await item.version.version_id
          this.personnageSelectionne=await item.personnage==null?"":item.personnage.personnage_id
          this.idSelectionne=item.ligne_id
          this.timecodeDebutSelectionne=item.ligne_timecode_Debut
          this.timecodeFinSelectionne=item.ligne_timecode_Fin
          this.texteSelectionne=item.ligne_texte
          this.zIndexSelectionne=item.ligne_z_index
          this.couleurSelectionne=item.ligne_couleur_hexa
      },
      viderChamps(): void{
        if(this.ligneSelectionnee.length>1){
          this.langueSelectionne=''
          this.versionSelectionne=''
        }else{
          this.langueSelectionne=this.langues.length>1?this.langues[1].langue_id:''
          this.versionSelectionne=this.versions.length>0?this.versions[0].version_id:''
        }
          this.idSelectionne=""
          this.timecodeDebutSelectionne=this.ligneSelectionnee.length>1?'':"00:00:00,000"
          this.timecodeFinSelectionne=this.ligneSelectionnee.length>1?'':"00:00:00,001"
          this.texteSelectionne=""
          this.zIndexSelectionne=1
          this.couleurSelectionne=this.couleurs[0].code
          this.personnageSelectionne=""
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
        if(this.ligneSelectionnee.includes(uid)){
          let index: number = this.ligneSelectionnee.indexOf(uid)
          this.ligneSelectionnee.splice(index,1)
        }
        else{
          this.ligneSelectionnee.push(uid)
        }
        this.miseAJoursEcran()
      },
      deSurlignageLignes(): void{
        const trsS: Element[] = Array.from(document.querySelectorAll(".v-data-table__tr--clickableSelected")).filter((l) => {
          const child: Element = l.children?.[1];
          return !this.ligneSelectionnee.includes(parseInt(child?.textContent ?? ''));
        });
        trsS.forEach(tr=>{
          tr.className="v-data-table__tr v-data-table__tr--clickable"
        })
      },
      async miseAJoursEcran(): Promise<void>{
        //Si une seul ligne est selectionné
        this.ligneSelectionnee.length===1?await this.remplirChamps(this.tableauSousTitre.find(x=>x.ligne_id_interne==this.ligneSelectionnee[0])):await this.viderChamps()
        if(this.ligneSelectionnee.length>=1){
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
          return this.ligneSelectionnee.includes(parseInt(child?.textContent ?? ''));
        });
        trsS.forEach(tr=>{
          tr.className="v-data-table__tr v-data-table__tr--clickableSelected"
        })
      },
      numeroterLigne(): void{
        let i: number = 1;
        document.querySelectorAll(".lignesNumero").forEach(row=>{
            row.textContent=i.toString()
            i++
        })
      },
      async initialisationProps(): Promise<void>{
        (document.getElementById('video') as HTMLVideoElement).src='fichier://'+this.cheminDeLaVideo;
        // @ts-ignore (define in dts)
        if(!await window.electron.ipcRenderer.invoke('electron:dbActive')){
          // @ts-ignore (define in dts)
          window.electron.ipcRenderer.send('electron:initialiserDatabase', this.cheminDeLaDatabase)//voir pour attendre la reponse de la BDD
          // @ts-ignore (define in dts)
          window.electron.ipcRenderer.send('electron:dbSwitchOn')
          setTimeout(async()=>{await this.initialiserDonne()},500)//et supprimer ce timeOut
        }else{
          await this.initialiserDonne()
        }
      },
      async initialiserDonne(): Promise<void>{
        // @ts-ignore (define in dts)
        this.langues = [{langue_id:undefined,langue_nom:''},...await window.electron.ipcRenderer.invoke('electron:chargerLangue')]
        // @ts-ignore (define in dts)
        this.personnages = [{personnage_id:undefined,personnage_nom:''},...(await window.electron.ipcRenderer.invoke('electron:chargerPersonnage'))]
        // @ts-ignore (define in dts)
        let tab = await window.electron.ipcRenderer.invoke('electron:chargerLigne')
        tab.sort((a, b) => {

          // Tri par le champ 'name' par défaut
          return a.ligne_id_interne - b.ligne_id_interne;
        })
        this.tableauSousTitre=tab
        this.itemParPage=this.tableauSousTitre.length
        this.couleurSelectionne=this.couleurs[0].code
        this.viderChamps()
        // @ts-ignore (define in dts)
        this.languesVisible= await window.electron.ipcRenderer.invoke('electron:chargerLangue')
        // @ts-ignore (define in dts)
        this.versionsVisible= await window.electron.ipcRenderer.invoke('electron:chargerVersion')
        // @ts-ignore (define in dts)
        this.personnagesVisible= await window.electron.ipcRenderer.invoke('electron:chargerPersonnage')
      },
      verifierDoublon(): void{

        if(this.ligneSelectionnee.length==1 && this.tableauSousTitre.find(l=>{ return this.ligneSelectionnee.includes(l.ligne_id_interne)})?.ligne_id == this.idSelectionne){
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
      async dupliquerLigne(): Promise<void>{
        for(let  l of this.ligneSelectionnee){
          await new Promise(resolve => setTimeout(resolve, 10));
          // @ts-ignore (define in dts)
          window.electron.ipcRenderer.send('electron:dupliquerLigne', l);
        }
        this.ligneSelectionnee=[]
        await this.miseAJoursEcran()
        await this.actualiserTableau()
      }
    },  
      async mounted(){
      //Sert a enlever l'outil de pagination du v-data-table
      (document.querySelector(".v-data-table-footer")as HTMLElement).innerHTML=""

      let ths=document.querySelectorAll('th')
      ths.forEach(th=>{
        th.setAttribute('style','background-color:#2F3241')
      })
      //Force toute les donnée a s'afficher dans le tableau
      await this.initialisationProps()
    },
    watch:{
      langueSelectionne(): void{
          this.changerVersion()
      },
      mode(): void{
          this.activationBouton()
      },
      ligneSelectionnee(): void{
          this.cliqueCheckBox()
      },
      idSelectionne(): void{
        this.verifierDoublon()
      },
      versionSelectionne(): void{
        this.verifierDoublon()
      },
      timecodeDebutSelectionne(): void{
        if(this.creationModificationNOk=this.ligneSelectionnee.length<1){          
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
              this.creationModificationNOk=false
            }
          } else {
            this.creationModificationNOk=true
          }
        }else{
          if(this.timecodeDebutSelectionne){
            this.creationModificationNOk=!(this.timeCodeRegEx.test(this.timecodeDebutSelectionne)||this.timecodeDebutSelectionne=='')
          }
        }
      },
      timecodeFinSelectionne(): void{

        if(this.creationModificationNOk=this.ligneSelectionnee.length<1){     
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
          if(this.timecodeFinSelectionne){
            this.creationModificationNOk=!(this.timeCodeRegEx.test(this.timecodeFinSelectionne)||this.timecodeFinSelectionne=='')
          }
        }
      },
      languesVisibleSelectionne(): void{
        this.actualiserTableau()
      },
      versionsVisibleSelectionne(): void{
        this.actualiserTableau()
      },
      personnagesVisibleSelectionne(): void{
        this.actualiserTableau()
      }
    },
    created() {
      const propVideo: LocationQueryValue|LocationQueryValue[] = this.$route.query.propVideo;
      const propDatabase: LocationQueryValue|LocationQueryValue[] = this.$route.query.propDatabase;
      
      if (typeof propVideo === 'string') {
        this.cheminDeLaVideo = propVideo;
      } else {
        console.error('PropVideo est undefined.');
        this.messageInformatif='PropVideo est undefined.'
      }
      if (typeof propDatabase === 'string') {
        this.cheminDeLaDatabase = propDatabase;
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
    #bandeRythmo{
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
                "zone17 zone17 zone17 zone17 zone17 zone17 zone17 zone17"
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