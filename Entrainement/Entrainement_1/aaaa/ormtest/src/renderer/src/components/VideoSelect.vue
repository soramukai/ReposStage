<template>
  <div>
    <div>
      <div id="cadre">    
        <video id="videoFile" controls width="640" height="360"></video>
      </div>
      <div id="menu">   
      
      </div>
    </div>
    <div>
      <input type="file" @change="handleFileChange" accept="video/*">
      <button @click="convertVideo">Convertir</button>
      <div v-if="conversionProgress !== null" class="progress-container">
        <progress class="progress-bar" :value="conversionProgress" max="100"></progress>
        <span class="progress-label">{{ conversionProgress }}%</span>
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
      videoFilePath:"src/video/"
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    convertVideo() {
      window.electron.ipcRenderer.send('electron:SendVideo', this.file.path);
    },
  },
  mounted() {
    window.electron.ipcRenderer.on('electron:progressPercent', (event, progress) => {
      this.conversionProgress = progress;
    });
    window.electron.ipcRenderer.on('electron:conversionFile',(event, filePath) => {
      this.videoFilePath+=filePath
      document.getElementById("videoFile").src=this.videoFilePath
      console.log(this.videoFilePath)
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
