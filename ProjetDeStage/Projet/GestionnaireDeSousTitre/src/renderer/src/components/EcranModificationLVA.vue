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
                        :items=ElementPrincipalListe
                        :item-title=TitreElementPrincipal
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
                        :items=ElementFacultatifListe
                        :item-title=TitreElementFacultatif
                        :item-value=ValeurElementFacultatif>
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
                    :disabled="(texteCreation.length==0 || ElementFacultatifAffichageActif) && (texteCreation.length==0 || ElementFacultatifSelectionne==undefined) || doublon"           
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
                        :items=ElementPrincipalListe
                        :item-title=TitreElementPrincipal
                        :item-value=ValeurElementPrincipal
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
                        :disabled="(!ElementPrincipalSelectionne || texteCreation.length==0) && !modificationOK || doublon"
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
import { LocationQueryValue } from 'vue-router'
import { JsonIPC, JsonLangue, JsonPersonnage, JsonVersion } from '../Interface/Interface'
export default {
    data(){
        // Variable de la page necessaire a la generation/gestion dynamique des elements
        return{
            NomDeLaPage : "" as string,
            texteCreation: "" as string,

            //Variable en rapport à la liste d'element principale
            ElementPrincipalListe : [] as JsonLangue[]|JsonPersonnage[]|JsonVersion[],
            ElementPrincipalSelectionne:undefined as number|undefined,
            TitreElementPrincipal:"" as string,
            ValeurElementPrincipal: "" as string,

            //Variable en rapport à la liste d'element facultative
            LabelElementFacultatif: "" as string,
            ElementFacultatifListe:[] as JsonLangue[],
            ElementFacultatifAffichageActif:false as boolean,
            ElementFacultatifSelectionne:undefined as number|undefined,
            TitreElementFacultatif:"" as string,
            ValeurElementFacultatif:"" as string,
            modificationOK:false as boolean,

            //Variable props
            video:"" as string,
            database:"" as string,
            autre:"" as string,

            doublon:false as boolean,
            messageSuppression:"" as string,
        }
    },
    methods:{
        // Fonction qui permet de configurer la page et de charger les donnée
        // !Voir pour optimiser! Ce switch case permet de configurer la page en fonction du props recu
        async recuperationDonneesLVA(): Promise<void>{
            switch(this.NomDeLaPage){
                case "Langue":
                    this.TitreElementPrincipal="langue_nom"
                    this.ValeurElementPrincipal="langue_id"
                    this.messageSuppression="Êtes-vous sûr de vouloir supprimer cet élément ?\nCeci est une action irreverssible!\n(Supprimer une Langue entrainera une supression en cascade qui detruira toute Version et Ligne ayant une reference vers elle)"
                    break
                case "Version":
                    this.LabelElementFacultatif ="Langue"
                    this.TitreElementPrincipal="version_nom"
                    this.ValeurElementPrincipal="version_id"
                    this.TitreElementFacultatif="langue_nom"
                    this.ValeurElementFacultatif="langue_id"
                    this.ElementFacultatifAffichageActif=true
                    this.modificationOK=false
                    this.ElementFacultatifListe = await this.chargementLangue("Langue")
                    this.autre="langue_id"
                    this.messageSuppression="Êtes-vous sûr de vouloir supprimer cet élément ?\nCeci est une action irreverssible!\n(Supprimer une Version entrainera une supression en cascade qui detruira toute Ligne ayant une reference vers elle)"
                    break
                case "Personnage":
                    this.TitreElementPrincipal="personnage_nom"
                    this.ValeurElementPrincipal="personnage_id"
                    this.messageSuppression="Êtes-vous sûr de vouloir supprimer cet élément ?\nCeci est une action irreverssible!\n(Supprimer un Personnage entrainera le dereferencement de toutes lignes ayant une reference vers lui)"
                    break
                default:
                    console.error("Page non Chargé")
            }
            this.ElementPrincipalListe = await this.chargementLVA(this.NomDeLaPage)
        },
        // Fonction qui permet de formater un JSON a envoyer dans une commande IPC afin d'effectuer une requette à la base de donnée
        creationJsonVersion(): JsonIPC{
            return{
                "id": -1,
                "nom": this.texteCreation,
                "langue_id": this.ElementFacultatifSelectionne
            }
        },
        // Fonction qui permet de faire une requette de creation à la base de donnée via une commande IPC
        creationLVA(): void{
            // @ts-ignore (define in dts)
            window.electron.ipcRenderer.send('electron:creer'+this.NomDeLaPage, this.creationJsonVersion())
            location.reload();
        },
        // Fonction qui permet de faire une requette de chargement à la base de donnée via une commande IPC
        async chargementLVA(_nomDeLEntitee): Promise<JsonLangue[]|JsonPersonnage[]|JsonVersion[]>{
            // @ts-ignore (define in dts)
            return await window.electron.ipcRenderer.invoke('electron:charger'+_nomDeLEntitee)
        },
        async chargementLangue(_nomDeLEntitee): Promise<JsonLangue[]>{
            // @ts-ignore (define in dts)
            return await window.electron.ipcRenderer.invoke('electron:charger'+_nomDeLEntitee)
        },
        // Fonction qui permet de faire une requette de modification à la base de donnée via une commande IPC
        modificationLVA(): void{     
            // @ts-ignore (define in dts)
            window.electron.ipcRenderer.send('electron:modifier'+this.NomDeLaPage,this.ElementPrincipalSelectionne, this.creationJsonVersion())
            location.reload();
        },
        // Fonction qui permet de faire une requette de suppression à la base de donnée via une commande IPC
        suppressionLVA(): void{
            if (confirm(this.messageSuppression)){
                // @ts-ignore (define in dts)
                window.electron.ipcRenderer.send('electron:supprimer'+this.NomDeLaPage,this.ElementPrincipalSelectionne)
            }
            location.reload();
        },
        verifierDoublon(): void{
            this.doublon=false
            this.ElementPrincipalListe.forEach(ep=>{
                if(ep[this.TitreElementPrincipal]==this.texteCreation){
                    this.doublon=true;
                }
            })
        },
        transitVideo(): void{
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
        ElementPrincipalSelectionne(): void{
            //Permet de recuperer et pres-selectionner l'element facultatif en relation avec l'element principale selectionnée
            if(this.ElementFacultatifAffichageActif && this.ElementPrincipalSelectionne)
            {
                let entiteeNom: string = this.LabelElementFacultatif.toLowerCase()
                const elementPrincipal: JsonLangue|JsonPersonnage|JsonVersion|undefined = this.ElementPrincipalListe.find(ep=>ep[this.ValeurElementPrincipal]==this.ElementPrincipalSelectionne)
                let elementFacultatif: JsonLangue|undefined = undefined;
                if(elementPrincipal!=undefined){
                    elementFacultatif = this.ElementFacultatifListe.find(ef=>ef[this.ValeurElementFacultatif]==elementPrincipal[entiteeNom][this.ValeurElementFacultatif])
                    if(elementFacultatif){
                        this.ElementFacultatifSelectionne=elementFacultatif[this.ValeurElementFacultatif]
                    }
                }
            }
        },
        // Detection de changement de valeur de la selection de la liste des elements facultatifs
        ElementFacultatifSelectionne(): void{
            //Permet de conditionner la possibilité d'appuyer sur le bouton modifier
            if(this.ElementFacultatifAffichageActif)
            {
                let valeurEP: number|undefined=undefined;
                if(this.ElementPrincipalSelectionne){
                    const elementPrincipal: JsonLangue|JsonPersonnage|JsonVersion|undefined= this.ElementPrincipalListe.find(ep=>ep[this.ValeurElementPrincipal]==this.ElementPrincipalSelectionne)
                    if(elementPrincipal){
                        valeurEP = elementPrincipal[this.LabelElementFacultatif.toLowerCase()][this.ValeurElementFacultatif]
                        console.log(valeurEP)
                    }
                    else{
                        valeurEP=this.ElementFacultatifSelectionne
                    }
                }
                else{
                    valeurEP=this.ElementFacultatifSelectionne
                }
                if(this.ElementFacultatifSelectionne!=valeurEP){
                    this.modificationOK=true
                }
                else{
                    this.modificationOK=false
                }
            }
            else{
                this.modificationOK=false
            }
        },
        texteCreation(): void{
            this.verifierDoublon()
        }
    },
    created() {
        // Recuperation de la prop et assignation de celle ci a la variable 'NomDeLaPage'
        const prop1: LocationQueryValue | LocationQueryValue[] = this.$route.query.prop1;
        const propVideo: LocationQueryValue | LocationQueryValue[] = this.$route.query.propVideo;
        const propDatabase: LocationQueryValue | LocationQueryValue[] = this.$route.query.propDatabase;
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