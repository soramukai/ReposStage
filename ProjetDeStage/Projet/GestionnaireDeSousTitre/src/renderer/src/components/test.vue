<template>
  <v-data-table
  :items="tabPersonne"
  >

  </v-data-table>

  <v-data-table
  :items="tabLignes"
  :headers="tabLigneHeaders"
  >

  </v-data-table>

  <v-data-table
  :items="tabVersion"
  :headers="tabVersionHeaders"
  >

  </v-data-table>

  <v-data-table
  :items="tabLangue"
  >

  </v-data-table>
</template>

<script>
export default {
    data(){
        return{
            tabPersonne:[],
            tabLignes:[],
            tabVersion:[],
            tabLangue:[],
            tabVersionHeaders:[
                { title: 'ID de Version', value: 'version_id' },
                { title: 'Code de Version', value: 'version_code' },
                { title: 'Code de Version', value: 'langue.langue_nom' },
            ],
            tabLigneHeaders:[
            {title:'ID',value:'ligne_id',sortable:true},
            {title:'Version',value:'version.version_code',sortable:true},
            {title:'Langue',value:'version.langue.langue_diminutif',sortable:true},
            {title:'Debut',value:'ligne_timecode_Debut',sortable:true},
            {title:'Fin',value:'ligne_timecode_Fin',sortable:true},
            {title:'z-index',value:'ligne_z_index',sortable:true},
            {title:'Texte',value:'ligne_texte',sortable:true},
            ]
        }
    },
    methods:{
        async send(method,_json){

            _json.forEach(async x=>{
                await window.electron.ipcRenderer.send("electron:creer"+method,x)
            })
            let test = await window.electron.ipcRenderer.invoke("electron:charger"+method) 
            console.log(test)
            return test;
            
        }
    },
    async mounted(){

        let langue =[
            {
                "id":1,
                "nom":"Francais",
                "diminutif":"FR"
            },
            {
                "id":2,
                "nom":"Anglais",
                "diminutif":"EN"
            },
            {
                "id":3,
                "nom":"Japonais",
                "diminutif":"JP"
            }
        ]
        this.tabLangue=await this.send("Langue",langue)

        let perso = [
            {
                "id":1,
                "nom":"Johnny"
            },
            {
                "id":2,
                "nom":"Marc"
            }
        ]
        this.tabPersonne=await this.send("Personnage",perso)

        let ver = [
            {
                "id":1,
                "code":"FR001",
                "langueId":1
            },
            {
                "id":2,
                "code":"FR002",
                "langueId":1
            },
            {
                "id":3,
                "code":"EN001",
                "langueId":2
            },
            {
                "id":4,
                "code":"JP001",
                "langueId":3
            },
            {
                "id":5,
                "code":"FR003",
                "langueId":1
            },
            {
                "id":6,
                "code":"JP002",
                "langueId":3
            }
            
        ]
        this.tabVersion=await this.send("Version",ver)

        let ligne = [
            {
                "id":1,
                "timecodeDebut":"00:00:01",
                "timecodeFin":"00:00:02",
                "zIndex":1,
                "texte":"Hello",
                "versionId":3,
                "personnageId":1
            },
            {
                "id":2,
                "timecodeDebut":"00:00:01",
                "timecodeFin":"00:00:02",
                "zIndex":1,
                "texte":"Bonjour",
                "versionId":1,
                "personnageId":2
            },
            {
                "id":3,
                "timecodeDebut":"00:00:01",
                "timecodeFin":"00:00:03",
                "zIndex":1,
                "texte":"Konnichiha",
                "versionId":4,
                "personnageId":1
            },
            {
                "id":2,
                "timecodeDebut":"00:00:01",
                "timecodeFin":"00:00:02",
                "zIndex":1,
                "texte":"Yo",
                "versionId":2,
                "personnageId":2
            },
            {
                "id":5,
                "timecodeDebut":"00:00:03",
                "timecodeFin":"00:00:05",
                "zIndex":1,
                "texte":"Comment vas-tu ?",
                "versionId":1,
                "personnageId":1
            },
            {
                "id":6,
                "timecodeDebut":"00:00:03",
                "timecodeFin":"00:00:05",
                "zIndex":1,
                "texte":"How are you",
                "versionId":3,
                "personnageId":2
            },
            {
                "id":7,
                "timecodeDebut":"00:00:03",
                "timecodeFin":"00:00:05",
                "zIndex":1,
                "texte":"O genki desu ka",
                "versionId":4,
                "personnageId":1
            },
            {
                "id":5,
                "timecodeDebut":"00:00:03",
                "timecodeFin":"00:00:04",
                "zIndex":1,
                "texte":"Ca vas ?",
                "versionId":2,
                "personnageId":1
            },
            {
                "id":5,
                "timecodeDebut":"00:00:03",
                "timecodeFin":"00:00:04",
                "zIndex":1,
                "texte":"Ca gaz ?",
                "versionId":2,
                "personnageId":1
            },

            
        ]
        this.tabLignes=await this.send("Ligne",ligne)

    }
}
</script>

<style>

</style>