import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import LottieVuePlayer from 'lottie-web-vue';
import * as Router from 'vue-router';
import './styles/index.scss';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

createApp(App)
	.use(Router.createRouter({
		history: Router.createWebHistory(),
		routes: [
			{
				path: '/',
				name: 'home',
				component: () => import('./App.vue'),
			},
		],
	}))
	.use(LottieVuePlayer)
	.use(vuetify)
	.mount('#app');
