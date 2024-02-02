// routes.js
import EcranChoixRepertoire from './components/EcranChoixRepertoire.vue';
import EcranModificationLVA from './components/EcranModificationLVA.vue';
import EcranGestionSousTitre from './components/EcranGestionSousTitre.vue';
import Test from './components/Test.vue';

const routes = [
  { path: '/', component: EcranChoixRepertoire },
  { path: '/modification-lva', component: EcranModificationLVA },
  { path: '/gestion-sous-titre', component: EcranGestionSousTitre },
  { path: '/test', component: Test },
  // Ajoutez d'autres routes au besoin
];

export default routes;
