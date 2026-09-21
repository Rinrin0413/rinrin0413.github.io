import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import license from 'rollup-plugin-license';

const ALLOWED_LICENSES = ['0BSD', 'BSD-3-Clause', 'MIT'];

export default defineConfig({
	plugins: [
		sveltekit(),
		license({
			thirdParty: {
				allow: {
					test: ({ license }) => {
						if (license === undefined || license === null) return false;
						return ALLOWED_LICENSES.some(
							(allowed) => license === allowed || license === `(${allowed})`
						);
					},
					failOnUnlicensed: true,
					failOnViolation: true
				}
			}
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				// Sass modules loaded through @use keep their own explicit dependencies.
				additionalData: (source, filename) =>
					typeof filename === 'string' && filename.includes('.svelte')
						? `@use '$lib/stylesheets/variables' as *;\n${source}`
						: source
			}
		}
	},
	server: { fs: { allow: ['articles', 'artworks', 'projects'] } }
});
