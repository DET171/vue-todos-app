import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { EsLinter, linterPlugin } from 'vite-plugin-linter';
import { visualizer } from 'rollup-plugin-visualizer';
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig((config) => ({
	build: {
		rollupOptions: {
			manualChunks: (id) => {
				if (id.includes('vuetify')) {
					return 'vuetify';
				}
				else if (id.includes('firebase')) {
					return 'firebase';
				}
				else if (id.includes('dayjs')) {
					return 'dayjs';
				}
				else if (id.includes('vue-router')) {
					return 'vue-router';
				}
				else if (id.includes('lottie')) {
					return 'lottie';
				}
				else if (id.includes('node_modules')) {
					return 'vendor';
				}
			},
		},
	},
	plugins: [
		visualizer({
			template: 'network',
		}),
		vue(),
		vuetify({ autoImport: true }),
		linterPlugin({
			include: [
				'**/*.vue',
				'**/*.ts',
				'**/*.tsx',
				'**/*.js',
				'**/*.jsx',
			],
			linters: [
				new EsLinter({
					configEnv: config,
				}),
			],
		}),
	],
}));
