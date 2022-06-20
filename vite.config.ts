import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { EsLinter, linterPlugin } from 'vite-plugin-linter';
import { visualizer } from 'rollup-plugin-visualizer';
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig((config) => ({
	plugins: [
		splitVendorChunkPlugin(),
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
