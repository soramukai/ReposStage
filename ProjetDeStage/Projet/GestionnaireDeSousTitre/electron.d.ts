// electron.d.ts
interface Window {
  electron: {
    ipcRenderer: Electron.IpcRenderer;
  };
}
declare module 'electron' {
  // Contenu des déclarations pour Electron
}