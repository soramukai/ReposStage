<template>
    <div id="gestionSousTitre">
        <div class="section">
            <div class="videoGestionSousTitre">
                <v-row>
                    <v-col>
                        <video id="video" :src="cheminDeLaVideo" controls></video>
                    </v-col>
                </v-row>
            </div>

            <div class="videoGestionSousTitre">
                <v-text-field readonly class="gridArea" variant="outlined"> Mode {{ mode }}</v-text-field>

                <v-select class="gridArea" variant="outlined" label="Langue" v-model="langueSelectionne" :items="langues"></v-select>
                <router-link @click="() => ouvrirNouvelleFenetre('Langue')" class="gridArea gestionLVA" to="/modification-lva">
                  <v-btn class="boutonLVA"  variant="tonal">Gestion Langue</v-btn>
                </router-link>

                <v-select class="gridArea" variant="outlined" label="Version" v-model="versionSelectionne" :items="versions"></v-select>
                <router-link @click="() => ouvrirNouvelleFenetre('Version')" class="gridArea gestionLVA" to="/modification-lva">
                  <v-btn class="boutonLVA" variant="tonal">Gestion Version</v-btn>
                </router-link>

                <v-text-field class="gridArea" variant="outlined" v-model="idSousTitre" label="id"></v-text-field>
                <v-text-field class="gridArea" variant="outlined" v-model="zIndexSousTitre" label="z-index"></v-text-field>
                <v-text-field class="gridArea" variant="outlined" v-model="timecodeDebutSousTitre" label="time-code debut"></v-text-field>
                <v-text-field class="gridArea" variant="outlined" v-model="timecodeFinSousTitre" label="time-code fin"></v-text-field>

                <v-select class="gridArea" variant="outlined" label="Acteur" v-model="acteurSelectionne" :items="acteurs"></v-select>

                <router-link @click="() => ouvrirNouvelleFenetre('Personnage')" class="gridArea gestionLVA" to="/modification-lva">
                  <v-btn class="boutonLVA" variant="tonal">Gestion Acteur</v-btn>
                </router-link>

                <v-textarea class="gridArea" variant="outlined" v-model="texteSousTitre">{{ texteSousTitre }}</v-textarea>
                <v-btn class="gridArea" variant="tonal">{{ texteDuMode }}</v-btn>
                <v-btn class="gridArea" variant="tonal">Copier</v-btn>
                <v-btn id="supprimer" class="gridArea supprimer" variant="tonal">Supprimer</v-btn>
                <v-btn class="gridArea" variant="tonal">Filtrer</v-btn>
            </div>
        </div>

        <div class="section">
            <v-data-table
                v-model="ligneSelectionnee"
                :items="items"  
                item-value="id"
                :items-per-page="itemParPage"
                show-select
                @click:row="cliqueLignes"
                :height="tableHeight"
            >
            </v-data-table>
        </div>

        <div class="section">
            <v-btn class="bouton optionProjet" variant="tonal">Exporter</v-btn>
            <v-btn class="bouton optionProjet" variant="tonal">Importer</v-btn>
            <v-btn class="bouton optionProjet" variant="tonal">Sauvegarder</v-btn>
            <v-text-field class="input optionProjet" readonly si>{{ messageInformatif }}</v-text-field>

            <router-link class="route" to="/">
              <v-btn class="bouton optionProjet retour" variant="tonal">Retour</v-btn>
            </router-link>
        </div>
    </div>
    
</template>

<script lang="ts">
//@ts-nocheck
export default {
    data(){
        return{
            itemParPage:10,
            mode:"",
            idSousTitre:"",
            zIndexSousTitre:"",
            timecodeDebutSousTitre:"",
            timecodeFinSousTitre:"",
            texteSousTitre:"",
            langues:[],
            langueSelectionne:"",
            versions:[],
            versionSelectionne:"",
            acteurs:[],
            acteurSelectionne:"",
            cheminDeLaVideo:"",
            messageInformatif:"",
            texteDuMode:"",
            ligneSelectionnee: [],
      items: [	
          {	
            id:	1
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:33',	
            timeCodeFin: '00:01:35',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "Salut... Jhonny",	
          },	
          {	
            id:	2
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:36',	
            timeCodeFin: '00:01:39',	
            acteur: 'Jhonny',	
            zindex: 1,	
            texte: "Hey Comment tu vas l'ami?",	
          },	
          {	
            id:	3
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:42',	
            timeCodeFin: '00:01:48',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "Ho... Tu sais les affaires ne sont pas tres florrissante en ce moment",	
          },	
          {	
            id:	4
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:50',	
            timeCodeFin: '00:01:55',	
            acteur: 'Jhonny',	
            zindex: 1,	
            texte: "Ha ca... Elles ne le sont pas pour un grand nombre de gens honettes",	
          },	
          {	
            id:	5
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:59',	
            timeCodeFin: '00:02:04',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "humm... Pourtant tu as l'air de bien t'en sortir toi?",	
          },	
          {	
            id:	6
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:06',	
            timeCodeFin: '00:02:08',	
            acteur: 'Jhonny',	
	        zindex: 1,
            texte: "C'est bien ce que je viens de dire",	
          },	
          {	
            id:	7
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:10',	
            timeCodeFin: '00:02:13',	
            acteur: 'Boby',	
	        zindex: 1,
            texte: 'Toujours dans les magouille... Jhonny',	
          },	
          {	
            id:	8
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:16',	
            timeCodeFin: '00:02:19',	
            acteur: 'Jhonny',	
	        zindex: 1,
            texte: "On se debrouille comme on peut",	
          },	
          {	
            id:	9
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:36',	
            timeCodeFin: '00:01:39',	
            acteur: 'Jhonny',	
            zindex: 1,	
            texte: "Hey Comment tu vas l'ami?",	
          },	
          {	
            id:	10
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:42',	
            timeCodeFin: '00:01:48',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "Ho... Tu sais les affaires ne sont pas tres florrissante en ce moment",	
          },	
          {	
            id:	11
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:50',	
            timeCodeFin: '00:01:55',	
            acteur: 'Jhonny',	
            zindex: 1,	
            texte: "Ha ca... Elles ne le sont pas pour un grand nombre de gens honettes",	
          },	
          {	
            id:	12
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:59',	
            timeCodeFin: '00:02:04',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "humm... Pourtant tu as l'air de bien t'en sortir toi?",	
          },	
          {	
            id:	13
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:06',	
            timeCodeFin: '00:02:08',	
            acteur: 'Jhonny',	
	        zindex: 1,
            texte: "C'est bien ce que je viens de dire",	
          },	
          {	
            id:	14
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:10',	
            timeCodeFin: '00:02:13',	
            acteur: 'Boby',	
	        zindex: 1,
            texte: 'Toujours dans les magouille... Jhonny',	
          },	
          {	
            id:	15
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:16',	
            timeCodeFin: '00:02:19',	
            acteur: 'Jhonny',	
	        zindex: 1,
            texte: "On se debrouille comme on peut",	
          },	
          {	
            id:	16
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:36',	
            timeCodeFin: '00:01:39',	
            acteur: 'Jhonny',	
            zindex: 1,	
            texte: "Hey Comment tu vas l'ami?",	
          },	
          {	
            id:	17
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:42',	
            timeCodeFin: '00:01:48',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "Ho... Tu sais les affaires ne sont pas tres florrissante en ce moment",	
          },	
          {	
            id:	18
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:50',	
            timeCodeFin: '00:01:55',	
            acteur: 'Jhonny',	
            zindex: 1,	
            texte: "Ha ca... Elles ne le sont pas pour un grand nombre de gens honettes",	
          },	
          {	
            id:	19
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:59',	
            timeCodeFin: '00:02:04',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "humm... Pourtant tu as l'air de bien t'en sortir toi?",	
          },	
          {	
            id:	20
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:06',	
            timeCodeFin: '00:02:08',	
            acteur: 'Jhonny',	
	        zindex: 1,
            texte: "C'est bien ce que je viens de dire",	
          },	
          {	
            id:	21
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:10',	
            timeCodeFin: '00:02:13',	
            acteur: 'Boby',	
	        zindex: 1,
            texte: 'Toujours dans les magouille... Jhonny',	
          },	
          {	
            id:	22
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:16',	
            timeCodeFin: '00:02:19',	
            acteur: 'Jhonny',	
	        zindex: 1,
            texte: "On se debrouille comme on peut",	
          },	
          {	
            id:	23
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:36',	
            timeCodeFin: '00:01:39',	
            acteur: 'Jhonny',	
            zindex: 1,	
            texte: "Hey Comment tu vas l'ami?",	
          },	
          {	
            id:	24
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:42',	
            timeCodeFin: '00:01:48',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "Ho... Tu sais les affaires ne sont pas tres florrissante en ce moment",	
          },	
          {	
            id:	25
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:50',	
            timeCodeFin: '00:01:55',	
            acteur: 'Jhonny',	
            zindex: 1,	
            texte: "Ha ca... Elles ne le sont pas pour un grand nombre de gens honettes",	
          },	
          {	
            id:	26
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:59',	
            timeCodeFin: '00:02:04',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "humm... Pourtant tu as l'air de bien t'en sortir toi?",	
          },	
          {	
            id:	27
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:06',	
            timeCodeFin: '00:02:08',	
            acteur: 'Jhonny',	
	        zindex: 1,
            texte: "C'est bien ce que je viens de dire",	
          },	
          {	
            id:	28
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:10',	
            timeCodeFin: '00:02:13',	
            acteur: 'Boby',	
	        zindex: 1,
            texte: 'Toujours dans les magouille... Jhonny',	
          },	
          {	
            id:	29
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:16',	
            timeCodeFin: '00:02:19',	
            acteur: 'Jhonny',	
	        zindex: 1,
            texte: "On se debrouille comme on peut",	
          },	
          {	
            id:	30
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:36',	
            timeCodeFin: '00:01:39',	
            acteur: 'Jhonny',	
            zindex: 1,	
            texte: "Hey Comment tu vas l'ami?",	
          },	
          {	
            id:	31
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:42',	
            timeCodeFin: '00:01:48',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "Ho... Tu sais les affaires ne sont pas tres florrissante en ce moment",	
          },	
          {	
            id:	32
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:50',	
            timeCodeFin: '00:01:55',	
            acteur: 'Jhonny',	
            zindex: 1,	
            texte: "Ha ca... Elles ne le sont pas pour un grand nombre de gens honettes",	
          },	
          {	
            id:	33
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:01:59',	
            timeCodeFin: '00:02:04',	
            acteur: 'Boby',	
            zindex: 1,	
            texte: "humm... Pourtant tu as l'air de bien t'en sortir toi?",	
          },	
          {	
            id:	34
            ,langue: 'Francais',	
            version:"FR001",	
            timeCodeDebut: '00:02:06',	
            timeCodeFin: '00:02:08',	
            acteur: 'Jhonny',	
	        zindex: 1,
            texte: "C'est bien ce que je viens de dire",	
          },
        ],		  
      tableHeight: 450, // Hauteur maximale du tableau en pixels  
        }
    },
    methods:{
      ouvrirNouvelleFenetre(page) {
        this.$router.push({
          path: '/modification-lva',
          query: {
            prop1: page,
          },
        });
        
      },
        changerVersion(){
            switch(this.langueSelectionne){
                case "Francais":
                    this.versionSelectionne =""
                    this.versions=["FR001","FR002","FR003"]
                    break
                case "Anglais":
                    this.versionSelectionne =""
                    this.versions=["EN001"]
                    break
                case "Japonais":
                    this.versionSelectionne =""
                    this.versions=["JP001","JP010"]
            }
        },
        async remplirChamps(item){
            this.langueSelectionne=await item.langue
            this.versionSelectionne=await item.version
            this.acteurSelectionne=item.acteur
            this.idSousTitre=item.id
            this.timecodeDebutSousTitre=item.timeCodeDebut
            this.timecodeFinSousTitre=item.timeCodeFin
            this.texteSousTitre=item.texte
            this.zIndexSousTitre=item.zindex
        },
        async viderChamps(){
            this.langueSelectionne=""
            this.versionSelectionne=""
            this.acteurSelectionne=""
            this.idSousTitre=""
            this.timecodeDebutSousTitre=""
            this.timecodeDebutSousTitre=""
            this.timecodeFinSousTitre=""
            this.texteSousTitre=""
            this.zIndexSousTitre=""
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
        cliqueLignes(item,event) {
          //Ternaire qui ajoute ou enleve l'element selectionner de la liste
          const i=this.ligneSelectionnee.indexOf(event.item.id)
          !this.ligneSelectionnee.includes(event.item.id)?this.ligneSelectionnee.push(event.item.id):this.ligneSelectionnee.splice(i,1)
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
          this.ligneSelectionnee.length===1?await this.remplirChamps(this.items.find(x=>x.id==this.ligneSelectionnee[0])):await this.viderChamps()

          if(this.ligneSelectionnee.length>=1){
            this.mode="Modification"
            this.texteDuMode="Modifier"
          }
          else{
            this.mode="Creation"
            this.texteDuMode="Créer"
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
    },  
    async mounted(){

        document.querySelector(".v-data-table-footer").innerHTML=""

        this.itemParPage=this.items.length
        this.cheminDeLaVideo="video.mp4"
        this.messageInformatif=""
        this.mode="Creation"
        this.texteDuMode="Créer"
        this.langues=["Francais","Anglais","Japonais"]
        this.acteurs=["Boby","Jhonny","Mimi"]
        let i=1

        document.querySelectorAll(".lignesNumero").forEach(row=>{
            console.log(row)
            row.textContent=i
            i++
        })
    },
    watch:{
        langueSelectionne(){
            this.changerVersion()
        },
        mode(){
            this.activationBouton()
        }
        ,
        ligneSelectionnee(){
            this.cliqueCheckBox()
        }
    },
    computed: {
    },
}
</script>

<style lang="scss" scoped>
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
            grid-template-columns: repeat(7, 1fr); /* 6 colonnes égales */
            gap: 10px; /* Espacement entre les éléments */
            grid-template-areas:
                "zone1 zone1 . . . . ."
                "zone2 zone2 . . . zone3 zone3"
                "zone4 zone4 . . . zone5 zone5"
                "zone6 zone7 zone8 zone9 zone10 tzone11 tzone11"
                "zone12 zone12 zone12 zone12 zone12 zone12 zone12"
                "zone12 zone12 zone12 zone12 zone12 zone12 zone12"
                "zone13 zone14 . . . . zone15"
                "zone16 zone16 . . . . .";
                .gridArea:nth-child(1){grid-area: zone1;}
                .gridArea:nth-child(2){grid-area: zone2;}
                .gridArea:nth-child(3){grid-area: zone3;}
                .gridArea:nth-child(4){grid-area: zone4;}
                .gridArea:nth-child(5){grid-area: zone5;}
                .gridArea:nth-child(6){grid-area: zone6;}
                .gridArea:nth-child(7){grid-area: zone7;}
                .gridArea:nth-child(8){grid-area: zone8;}
                .gridArea:nth-child(9){grid-area: zone9;}
                .gridArea:nth-child(10){grid-area: zone10;}
                .gridArea:nth-child(11){grid-area: tzone11;}
                .gridArea:nth-child(12){grid-area: zone12;}
                .gridArea:nth-child(13){grid-area: zone13;}
                .gridArea:nth-child(14){grid-area: zone14;}
                .gridArea:nth-child(15){grid-area: zone15;}
                .gridArea:nth-child(16){grid-area: zone16;}
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