import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import LottieVuePlayer from 'lottie-web-vue';
import './styles/index.scss';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

createApp(App)
	.use(LottieVuePlayer)
	.use(vuetify)
	.mount('#app');
