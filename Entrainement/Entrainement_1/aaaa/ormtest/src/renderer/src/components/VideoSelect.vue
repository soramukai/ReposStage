<template>
  <div>
    <div>
      <input type="file" @change="handleFileChange" accept="video/*">
      <button @click="convertVideo">Convertir</button>
      <div v-if="conversionProgress !== null" class="progress-container">
        <progress class="progress-bar" :value="conversionProgress" max="100"></progress>
        <span class="progress-label">{{ conversionProgress }}%</span>
      </div>
    </div>
    <div>
      <div id="cadre">    
        <video ref="myVideo" id="videoFile" controls width="640" height="360" @timeupdate="handleTimeUpdate"></video>
      </div>
      <!-- <div>
      <p>Timecode actuel : {{ formatTime(currentTime) }}</p>
    </div> -->
    <div>
      {{ currentSubtitle }}
    </div>
      <div id="menu">   
      
      </div>
    </div>
  </div>
</template>

<script> 
export default {
  data() {
    return {
      conversionProgress: null,
      file:"",
      videoFilePath:"src/video/",
      currentTime: 0 ,
      subtitles:[],
      currentLine:[],
      currentSubtitle:""

    };
  },
  methods: {
    async handleTimeUpdate() {
      // Mettez à jour le temps actuel de la vidéo
      this.currentTime = this.$refs.myVideo.currentTime;
      // Filtrer les sous-titres pour obtenir ceux qui sont actuellement affichés
       this.currentLine = this.subtitles.filter(subtitle =>{
          return(
            this.currentTime >= this.formatedTimecode(subtitle["timecode_debut"]) && this.currentTime <= this.formatedTimecode(subtitle["timecode_fin"])
          )
        });
        if(this.currentLine.length>0){
          this.currentSubtitle=this.currentLine[0]["texte"]
        }
        else{
          this.currentSubtitle=""
        }
    },
    formatedTimecode(_timecodeString){
      let timecodeConverted = 0
      let timecodeArrayms = _timecodeString.split(',')
      let timecodeArrays = timecodeArrayms[0].split(':')
      let seconde=parseInt(timecodeArrays[2])+parseInt(timecodeArrays[1]*60)+parseInt(timecodeArrays[0]*3600)
      let miliseconde = parseFloat(timecodeArrayms[1]/1000)
      timecodeConverted = parseFloat(seconde+miliseconde)
      return timecodeConverted
    }
    ,
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
   ,
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    convertVideo() {
      window.electron.ipcRenderer.send('electron:SendVideo', this.file.path);
    },
  },
  async mounted() {
    this.subtitles = JSON.parse(await window.electron.ipcRenderer.invoke('subtitle:LoadData'))

    document.getElementById("videoFile").src=this.videoFilePath+"converti.mp4"
    window.electron.ipcRenderer.on('electron:progressPercent', (event, progress) => {
      this.conversionProgress = progress;
    });
    window.electron.ipcRenderer.on('electron:conversionFile',(event, filePath) => {
      this.videoFilePath+=filePath
      document.getElementById("videoFile").src=this.videoFilePath
    })
  },
};
</script>

<style scoped>
#cadre{
  border: 3px solid gray;
}
.progress-container {
  text-align: center;
  margin-top: 20px;
}

.progress-bar {
  width: 100%;
}

.progress-label {
  margin-top: 10px;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
}
</style>
