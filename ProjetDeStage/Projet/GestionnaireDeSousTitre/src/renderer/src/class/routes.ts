import EcranChoixRepertoire from '../components/EcranChoixRepertoire.vue';
import EcranModificationLVA from '../components/EcranModificationLVA.vue';
import EcranGestionSousTitre from '../components/EcranGestionSousTitre.vue';

const routes = [
  { path: '/', component: EcranChoixRepertoire, name:"Choix Du Repertoire" },
  { path: '/modification-lva', component: EcranModificationLVA, name:"Gestion Des Sous Titres" },
  { path: '/gestion-sous-titre', component: EcranGestionSousTitre, name:"Gestionnaire Langues Versions Personnages" },
  // Ajoutez d'autres routes au besoin
];

export default routes;
