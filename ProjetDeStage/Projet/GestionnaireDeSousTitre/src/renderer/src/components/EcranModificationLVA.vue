<template>
    <div id="pageModificationLVA">
        <div>
            <!-- Titre de la page definit dynamiquement via une props envoyé depuis la page "EcranGestionSousTitre" -->
            <v-card 
                class="NomDeLaPage" 
                readonly>
                <h1>
                    {{ NomDeLaPage }}
                </h1>
            </v-card>
            <!-- Panneau récapitulatif contenant les elements de la Table de base de donnée associer à la Page-->
            <v-row>
                <v-col>
                    <v-list
                        class="listeRecapitulative"
                        :items="ElementPrincipalListe"
                        :item-title="TitreElementPrincipal"
                        dense>
                    </v-list>
                </v-col>
            </v-row>
        </div>
        <!-- Gestion des  elements suivant: Champs de champsDeSaisie, bouton créer et la liste d'élements en relation avec la table de base de donnée principale de la page-->
        <div 
            id="sectionCreation">
            <div 
                id="SousSectionCreation">
                <div 
                    id="champsDeSaisie">
                    <!-- Label du champs de saisie -->
                    <v-list-subheader 
                        class="labelDesInput">
                            Saisir le nom d'un(e) {{ NomDeLaPage }}
                    </v-list-subheader>
                    <!-- Champs de saisie pour l'utilisateur -->
                    <v-text-field 
                        class="input"
                        v-model="texteCreation">
                    </v-text-field>
                </div>
                <!-- Liste des elements en relation avec la table principale de la page ex: La relation de elementFacultatif d'une version -->
                <div id="elementFacultatif">
                    <!-- Label de la liste d'elements facultative 
                        Si la table de donnée principale ne contient pas de relation vers une autre table, alors cette section ne sera pas visible 
                    -->
                    <v-list-subheader 
                        v-if="ElementFacultatifAffichageActif"
                        class="labelDesInput">
                            Sellectionner une {{LabelElementFacultatif}}
                    </v-list-subheader>
                    <!-- Liste des elements en relation avec la table de donnée principale -->
                    <v-select 
                        v-if="ElementFacultatifAffichageActif"
                        class="input"
                        v-model="ElementFacultatifSelectionne"
                        :items="ElementFacultatifListe"
                        :item-title="TitreElementFacultatif"
                        :item-value="ValeurElementFacultatif">
                    </v-select>
                </div>
            </div>
            <!-- Bouton créer qui permet d'ajouter un element a la table charger dans la page
                Le bouton s'active s'il y a du texte dans le champs de saisie et que la table charger dans la page ne possede pas de relation avec une autre table
                sinon il faut a la fois qu'il y ai du texte dans le champ de saisie et qu'un element present dans la liste facultative soit selectionée
            -->
            <div class="boutonInteractionBaseDeDonnee">
                <v-btn 
                    @click="creationLVA"
                    :disabled="(texteCreation.length==0 || ElementFacultatifAffichageActif) && (texteCreation.length==0 || ElementFacultatifSelectionne=='')"           
                    variant="tonal"     
                    class="bouton">Créer
                </v-btn>
            </div>
        </div>
        <!-- Section de Modification -->
        <div>
            <div id="elementModification">
                <div class="boutonInteractionBaseDeDonnee">
                    <!-- Label de la liste -->
                    <v-list-subheader class="labelDesInput">Sellectionner un(e) {{ NomDeLaPage }}</v-list-subheader>
                    <!-- Liste des elements de la table de donnée principale de la page --> 
                    <v-select 
                        class="input"
                        v-model="ElementPrincipalSelectionne"
                        :items="ElementPrincipalListe"
                        :item-title="TitreElementPrincipal"
                        :item-value="ValeurElementPrincipal"
                    ></v-select>
                    <!-- Router permetant de revenir sur la page de gestion des sous-titres bindé sur le bouton "Retour" -->
                    <router-link class="route" @click="transitVideo" to="/gestion-sous-Titre">
                        <v-btn class="bouton optionProjet retour" variant="tonal">Retour</v-btn>
                    </router-link>
                </div>
                <!-- Bouton Modifier et Supprimer -->
                <div class="boutonInteractionBaseDeDonnee">
                    <!-- Bouton Modifier 
                        Le bouton s'active a minima s'il y a du texte dans le champs de saisie et qu'un element de la liste principale est selectionné
                        sinon il faut à la fois qu'il y ai un element present dans la liste principale qui soit selectionée et qu'un element de la liste facultative qui n'est pas deja en relation avec l'element principal soit sélectionnée
                    -->
                    <v-btn 
                        variant="tonal"
                        :disabled="(!ElementPrincipalSelectionne || texteCreation.length==0) && !modificationOK"
                        class="bouton"
                        @click="modificationLVA">
                            Modifier
                    </v-btn>
                    <!-- Bouton Supprimer -->
                    <v-btn 
                        variant="tonal" 
                        :disabled="!ElementPrincipalSelectionne" 
                        class="bouton supprimer"
                        @click="suppressionLVA">
                            Supprimer
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data(){
        // Variable de la page necessaire a la generation/gestion dynamique des elements
        return{
            NomDeLaPage : "",
            texteCreation:"",

            //Variable en rapport à la liste d'element principale
            ElementPrincipalListe : [],
            ElementPrincipalSelectionne:""||undefined,
            TitreElementPrincipal:"",
            ValeurElementPrincipal:"",

            //Variable en rapport à la liste d'element facultative
            LabelElementFacultatif:"",
            ElementFacultatifListe:[],
            ElementFacultatifAffichageActif:false,
            ElementFacultatifSelectionne:""||undefined,
            TitreElementFacultatif:"",
            ValeurElementFacultatif:"",
            modificationOK:false,
            
            //Commande IPC
            ipcCharger:"electron:charger",
            ipcCreer:"electron:creer",
            ipcModifier:"electron:modifier",
            ipcSupprimer:"electron:supprimer",

            video:"",
            database:"",
            autre:"",
        }
    },
    methods:{
        // Fonction qui permet de configurer la page et de charger les donnée
        // !Voir pour optimiser! Ce switch case permet de configurer la page en fonction du props recu
        async recuperationDonneesLVA(){
            switch(this.NomDeLaPage){
                case "Langue":
                    this.TitreElementPrincipal="langue_nom"
                    this.ValeurElementPrincipal="langue_id"
                    break
                case "Version":
                    this.LabelElementFacultatif ="Langue"
                    this.TitreElementPrincipal="version_nom"
                    this.ValeurElementPrincipal="version_id"
                    this.TitreElementFacultatif="langue_nom"
                    this.ValeurElementFacultatif="langue_id"
                    this.ElementFacultatifAffichageActif=true
                    this.modificationOK=false
                    this.ElementFacultatifListe = await this.chargementLVA("Langue")
                    this.autre="langue_id"
                    break
                case "Personnage":
                    this.TitreElementPrincipal="personnage_nom"
                    this.ValeurElementPrincipal="personnage_id"
                    break
                default:
                    console.error("Page non Chargé")
            }
            this.ElementPrincipalListe =await this.chargementLVA(this.NomDeLaPage)
        },
        // Fonction qui permet de formater un JSON a envoyer dans une commande IPC afin d'effectuer une requette à la base de donnée
        async creationJsonVersion(){
            return{
                "id":-1,
                "nom":this.texteCreation,
                "langue_id":this.ElementFacultatifSelectionne
            }
        },
        // Fonction qui permet de faire une requette de creation à la base de donnée via une commande IPC
        async creationLVA(){
            await window.electron.ipcRenderer.send('electron:creer'+this.NomDeLaPage,await this.creationJsonVersion())
            location.reload();
        },
        // Fonction qui permet de faire une requette de chargement à la base de donnée via une commande IPC
        async chargementLVA(_nomDeLEntitee){
            return await window.electron.ipcRenderer.invoke('electron:charger'+_nomDeLEntitee)
        },
        // Fonction qui permet de faire une requette de modification à la base de donnée via une commande IPC
        async modificationLVA(){     
            await window.electron.ipcRenderer.send('electron:modifier'+this.NomDeLaPage,this.ElementPrincipalSelectionne,await this.creationJsonVersion())
            location.reload();
        },
        // Fonction qui permet de faire une requette de suppression à la base de donnée via une commande IPC
        async suppressionLVA(){
            await window.electron.ipcRenderer.send('electron:supprimer'+this.NomDeLaPage,this.ElementPrincipalSelectionne)
            location.reload();
        },
        transitVideo(){
            this.$router.push({
            path: '/gestion-sous-titre',
            query: {
            propVideo: this.video,
            propDatabase: this.database,
        },
      });
        }
    },
    watch:{
        // Detection de changement de valeur de la selection de la liste des elements principaux
        async ElementPrincipalSelectionne(){
            //Permet de recuperer et pres-selectionner l'element facultatif en relation avec l'element principale selectionnée
            if(this.ElementFacultatifAffichageActif && this.ElementPrincipalSelectionne!="")
            {
                let entiteeNom = this.LabelElementFacultatif.toLowerCase()
                const elementPrincipal = await this.ElementPrincipalListe.find(ep=>ep[this.ValeurElementPrincipal]==this.ElementPrincipalSelectionne)
                let elementFacultatif=""||undefined;
                if(elementPrincipal!=undefined){
                    elementFacultatif = await this.ElementFacultatifListe.find(ef=>ef[this.ValeurElementFacultatif]==elementPrincipal[entiteeNom][this.ValeurElementFacultatif])
                }
                if(elementFacultatif!=undefined){
                    this.ElementFacultatifSelectionne=elementFacultatif[this.ValeurElementFacultatif]
                }
            }
        },
        // Detection de changement de valeur de la selection de la liste des elements facultatifs
        async ElementFacultatifSelectionne(){
            //Permet de conditionner la possibilité d'appuyer sur le bouton modifier
            if(this.ElementFacultatifAffichageActif)
            {
                const valeurEF=this.ElementFacultatifSelectionne
                let valeurEP=""||undefined;
                
                if(this.ElementPrincipalSelectionne!=""){
                    const liste= await this.ElementPrincipalListe.find(ep=>ep[this.ValeurElementPrincipal]==this.ElementPrincipalSelectionne)||undefined
                    if(liste!=undefined){
                        valeurEP = liste[this.LabelElementFacultatif.toLowerCase()][this.ValeurElementFacultatif]
                    }
                    else{
                        valeurEP=valeurEF
                    }
                }
                else{
                    valeurEP=valeurEF
                }
                if(valeurEF!=valeurEP){
                    this.modificationOK=true
                }
                else{
                    this.modificationOK=false
                }
            }
            else{
                this.modificationOK=false
            }
        }
    },
    created() {
        // Recuperation de la prop et assignation de celle ci a la variable 'NomDeLaPage'
        const prop1 = this.$route.query.prop1;
        const propVideo = this.$route.query.propVideo;
        const propDatabase = this.$route.query.propDatabase;
        if (typeof prop1 === 'string') {
            this.NomDeLaPage=prop1
            this.recuperationDonneesLVA()
        } else {
            console.error('Prop Chemin repertoire est undefined.');
        }
        if (typeof propVideo === 'string') {
            this.video=propVideo
        } else {
            console.error('Prop Video est undefined.');
        }
        if (typeof propDatabase === 'string') {
            this.database=propDatabase
        } else {
            console.error('Prop Database est undefined.');
        }
    },
}
</script>

<style lang="scss" scoped>
#pageModificationLVA {
    margin: auto auto;
    max-width: 860px;
    text-align: center;
    .NomDeLaPage{
        margin: 10px auto 10px auto;
        width: 50%;
        background-color: rgba(0, 0, 0, 0.1);
        color: lightgray;
    }    
    .listeRecapitulative{
    display: flex;
    flex-wrap: wrap
    }
    #sectionCreation{
        display: flex;
        flex-direction: row;
        #SousSectionCreation{
            width: 70%;
            display: flex;
            #champsDeSaisie{
                width: 60%;
                margin: 0.5em 1em 0 0;
            }
            #elementFacultatif{
                width: 40%;
                margin: 0.5em 0 0 0;
            }
        }
        #btnCreer{
                width: 30%;
        }
    }
    #elementModification{
        display: flex;  
    }
} 
.boutonInteractionBaseDeDonnee:nth-child(1){
    display: flex;
    flex-direction: column;
    width: 75%;
    margin: 10px 10px 0 0;
    .route{
        color: #86a5b1;
        text-align: start;
        .retour{
            width: 35%;
        }
    }
}
.boutonInteractionBaseDeDonnee:nth-child(2){
    display: flex;
    flex-direction: column;
    margin: 3em 0 0 3em;
    width: 25%;
}
.labelDesInput{
    color: lightgray;
}
.input{
    height: 4.5em;
}
#elementCreation{
    display: flex;;
}
.bouton{
    height: 3em !important;
    margin: 0 0 10px 0;
}
.supprimer{
    margin-top: 1em;
    background-color: lightcoral;
}   
.supprimer:hover{
    margin-top: 1em;
    background-color: coral;
}   
</style>