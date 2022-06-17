import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './styles/index.scss';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

createApp(App)
	.use(vuetify)
	.mount('#app');
