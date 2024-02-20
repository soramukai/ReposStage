import EcranChoixRepertoire from '../views/EcranChoixRepertoire.vue';
import EcranModificationLVA from '../views/EcranModificationLVA.vue';
import EcranGestionSousTitre from '../views/EcranGestionSousTitre.vue';

const routes = [
  { path: '/', component: EcranChoixRepertoire, name:"Choix Du Repertoire" },
  { path: '/modification-lva', component: EcranModificationLVA, name:"Gestion Des Sous Titres" },
  { path: '/gestion-sous-titre', component: EcranGestionSousTitre, name:"Gestionnaire Langues Versions Personnages" },
  // Ajoutez d'autres routes au besoin
];

export default routes;
