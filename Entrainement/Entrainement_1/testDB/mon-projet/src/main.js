import { createApp } from 'vue';
import App from './App.vue';
import typeormConfig from '../typeorm.config'; // Mettez à jour le chemin selon votre structure
import { createConnection } from 'typeorm';

createConnection().then(() => {
    createConnection(typeormConfig).then(() => {
        createApp(App).mount('#app');
      });
}).catch(error => console.log('TypeORM connection error: ', error));


