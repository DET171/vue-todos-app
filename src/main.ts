import { createApp } from 'vue';
import Todos from './components/Todos.vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import LottieVuePlayer from 'lottie-web-vue';
import * as Router from 'vue-router';
import './styles/index.scss';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

const app = createApp(App);
const router = Router.createRouter({
	history: Router.createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Todos',
			component: Todos,
		},
	],
});

app.use(router);

app.use(LottieVuePlayer);
app.use(vuetify);
app.mount('#app');
