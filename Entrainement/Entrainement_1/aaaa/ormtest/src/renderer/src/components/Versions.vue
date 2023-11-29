<script setup lang="ts">
  import { reactive } from 'vue'
  // Vérifie si window.electron.process est défini, sinon utilise un objet vide
  const versions = reactive({ ...(window.electron.process?.versions ?? {}) })
</script>

<template>
  <ul class="versions"> 
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
    <li class="v8-version">V8 v{{ versions.v8 }}</li>
  </ul>
</template>