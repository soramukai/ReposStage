<template>
    <div id="GestionModificationLVA">

        <div>
            <v-card class="titre" readonly><h1>{{ titre }}</h1></v-card>

            <v-row id="recapitulatif" v-if="elementPresent.length > 0">
            <v-col v-for="(element, index) in elementPresent" :key="index" cols="4">
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title>{{ element }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-col>
            </v-row>
        </div>

        <div>
            <div id="elementCreation">
                <div class="creationModificationSuppression">
                    <v-list-subheader class="descriptif">Saisir le nom d'un(e) {{ titre }}</v-list-subheader>
                    <v-text-field></v-text-field>
                </div>

                <div class="creationModificationSuppression">
                    <v-btn class="bouton">Créer</v-btn>

                </div>
            </div>

            <div id="elementModification">
                <div class="creationModificationSuppression">
                    <v-list-subheader class="descriptif">Sellectionner un(e) {{ titre }}</v-list-subheader>
                    <v-select class="vla"
                    v-model="elementSelectionnee"
                    :items="elementPresent"
                    label="Sélectionnez un fichier vidéo"
                    ></v-select>
                    <v-btn class="bouton retour">Retour</v-btn>
                </div>
                
                <div class="creationModificationSuppression">
                    <v-btn class="bouton">Modifier</v-btn>
                    <v-btn class="bouton supprimer">Supprimer</v-btn>
                </div>
            </div>
        </div>
        
        <div>

        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            titre : "Titre",
            elementPresent : [],
            elementSelectionnee:""
        }
    },
    methods:{
        recuperationDonneesLVA(){
            this.elementPresent=["Francais","Anglais","Japonais","Espagnole","Allemand","Italien"]
        },
        creationLVA(){

        },
        modificationLVA(){

        },
        suppressionLVA(){

        },
        retourSelectionRepertoire(){

        }
    },
    mounted(){
        this.titre="Langue"
        this.recuperationDonneesLVA();
    }
}
</script>

<style lang="scss" scoped>
#GestionModificationLVA {
  margin: auto auto;
  max-width: 860px;
  text-align: center;
} 
.titre{
    margin: 10px auto 10px auto;
    width: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    color: lightgray;

}

.container .titre{
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

#recapitulatif{
  margin: 5px;
  background-color: #f8f8f8;
}
#elementCreation{
    display: flex;
}

#elementModification{
    display: flex;
}
.creationModificationSuppression:nth-child(1){
    display: flex;
    flex-direction: column;
    width: 75%;
    margin: 10px 10px 0 0;
}
.creationModificationSuppression:nth-child(2){
    display: flex;
    flex-direction: column;
    margin: 3em 0 0 3em;
    width: 25%;
}
.bouton{
    height: 4em !important;
    margin: 0 0 10px 0;
}
.retour{
    width: 30%;
}
.supprimer{
    margin-top: 1em;
    background-color: lightcoral;
}   
.container:hover {
  border-color: #3498db; /* Couleur de la bordure lorsqu'on survole */
}


/* Style pour le bouton Charger */
.GestionModificationLVA button {
  background-color: #3498db; /* Couleur de fond du bouton */
  color: #ffffff; /* Couleur du texte du bouton */
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Transition de la couleur de fond */
}

.GestionModificationLVA button:disabled {
  background-color: #bdc3c7; /* Couleur de fond du bouton désactivé */
  cursor: not-allowed;
}

.GestionModificationLVA button:hover:enabled {
  background-color: #2980b9; /* Couleur de fond du bouton lorsqu'on survole */
}

</style>