import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import LottieVuePlayer from 'lottie-web-vue';
import * as Router from 'vue-router';
import './styles/index.scss';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

const app = createApp(App);

app.use(Router.createRouter({
	history: Router.createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('./App.vue'),
		},
	],
}))
	.use(LottieVuePlayer)
	.use(vuetify)
	.mount('#app');
