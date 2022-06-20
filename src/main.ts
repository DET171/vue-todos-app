import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import LottieVuePlayer from 'lottie-web-vue';
// import * as Router from 'vue-router';
import './styles/index.scss';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

const app = createApp(/* {}*/ App);
/* const router = Router.createRouter({
	history: Router.createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'App',
			component: App,
		},
	],
});

app.use(router); */

app.use(LottieVuePlayer);
app.use(vuetify);
app.mount('#app');
