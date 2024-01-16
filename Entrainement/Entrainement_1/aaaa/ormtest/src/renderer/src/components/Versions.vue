<script lang="ts">
export default {
  data() {
    return {
      videoPath :"",
      fileRacine : "src/work/",
      file : "",
      urlList : [""]
    };
  },
  methods: {
    async selectRepos() {
      try {
        const folder = await window.electron.ipcRenderer.invoke('electron:selectRepos');
        console.log('Selected folder: ' + folder);
        this.videoPath=folder;
        // Appeler une autre fonction pour obtenir le contenu du dossier
        await this.getFolderContents(folder);
      } catch (error) {
        console.error('Error selecting folder:', error);
      }
    },
    async getFolderContents(folder) {
      try {
        // Utiliser ipcRenderer pour demander au processus principal de lister le contenu du dossier
        const contents = await window.electron.ipcRenderer.invoke('electron:getFolderContents', folder);
        // Afficher le contenu dans la console
        console.log('Folder contents:', contents);
        let regexDB = /\.(db|sqlite3|sqlite)$/;
        let regexVideo = /\.(mp4|avi|wmv)$/;
        let dbPresente = false;
        let videoPresente = false;
        let countDb = 0;
        let countVideo = 0;
        contents.forEach(file => {
          if (regexDB.test(file)) {
            dbPresente = true;
            countDb++
          }
          if (regexVideo.test(file)) {
            videoPresente = true;
            countVideo++
            // Stocker le chemin de la première vidéo trouvée
            let arrayURL = this.videoPath.split("\\")
            this.file=this.fileRacine+arrayURL[arrayURL.length-1]+"/"+file
            let option = document.createElement('option')
            option.value = this.file
            option.textContent = file
            document.getElementById('urlListe')?.appendChild(option)
            this.urlList.push(this.file)
          }
        });
        document.getElementById('urlListe').value=this.urlList[this.urlList.length-1]
        if(countDb==0){
          //Créer une database
        }
        else if(countDb>1){
          //Choisir une database a supprimer
        }
        if(countVideo==0){
          //Selectionner une video a importer ou importer manuellement
        }
        else if(countVideo>1){
          let p = document.createElement('p')
          p.textContent="ATTENTION: plusieurs video dans le dossier, veuillez selectionnez la bonne video dans la liste"
          document.getElementById('Avertissement').appendChild(p)

        }
        console.log("Y a t'il une DB dans le dossier? : ", dbPresente);
        console.log("Y a t'il une vidéo dans le dossier? : ", videoPresente);

        // Faire quelque chose d'autre avec le contenu du dossier si nécessaire
      } catch (error) {
        console.error('Error getting folder contents:', error);
      }
    },
    async click() {
      document.getElementById("urlListe").innerHTML="";
      document.getElementById("Avertissement").innerHTML=""
      await this.selectRepos();
    },
    selectVideo(){
      this.file=document.getElementById("urlListe")?.value;
    }
  },
  async mounted() {
    this.urlList.splice(0,1)
    // Vous pouvez effectuer des opérations lors du montage ici si nécessaire
  },
};
</script>

<template>
  <div>
    <button @click="click">Choisir un dossier</button>
    <!-- Afficher la vidéo si une vidéo est trouvée -->
    <div id="Avertissement"></div>
    <div id="cadre">    
        <video ref="myVideo" :src="file" id="videoFile" controls width="640" height="360"></video>
        <select @change="selectVideo" name="urlListe" id="urlListe">
        </select>
      </div>
  </div>
</template>
