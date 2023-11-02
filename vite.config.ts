import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
	],
	test: {
		globals: true,
		includeSource: ['src/**/*.{ts,svelte}'],
		environment: 'jsdom',
		alias: [
			{
				find: /^svelte$/,
				replacement: 'svelte/internal' 
			},
		],
	},
});
