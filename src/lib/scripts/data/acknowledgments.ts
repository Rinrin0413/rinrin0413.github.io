const LICENSES = {
	svelteKit: {
		license: 'MIT',
		licenseUrl: 'https://github.com/sveltejs/kit/blob/main/LICENSE'
	},
	svelteLangTools: {
		license: 'MIT',
		licenseUrl: 'https://github.com/sveltejs/language-tools/blob/master/LICENSE'
	}
};

export const ACKNOWLEDGEMENTS: {
    name: string;
    url: string;
    license?: string;
    licenseUrl?: string;
}[] = [
	{
		name: 'Svelte',
		url: 'https://svelte.dev',
		license: 'MIT',
		licenseUrl: 'https://github.com/sveltejs/svelte/blob/main/LICENSE.md'
	},
	{
		name: 'SvelteKit',
		url: 'https://kit.svelte.dev',
		...LICENSES.svelteKit
	},
	{
		name: 'Vite',
		url: 'https://vitejs.dev',
		license: 'MIT',
		licenseUrl: 'https://github.com/vitejs/vite/blob/main/LICENSE'
	},
	{
		name: 'Cloudflare Pages',
		url: 'https://pages.cloudflare.com'
	},
	{
		name: 'Sass',
		url: 'https://sass-lang.com',
		license: 'MIT',
		licenseUrl: 'https://github.com/sass/sass/blob/main/LICENSE'
	},
	{
		name: 'MDsveX',
		url: 'https://mdsvex.pngwn.io',
		license: 'MIT',
		licenseUrl: 'https://github.com/pngwn/MDsveX/blob/master/LICENSE'
	},
	{
		name: 'Shiki',
		url: 'https://shiki.style',
		license: 'MIT',
		licenseUrl: 'https://github.com/shikijs/shiki/blob/main/LICENSE'
	},
	{
		name: 'Google Fonts',
		url: 'https://fonts.google.com'
	},
	{
		name: 'Kiwi Maru',
		url: 'https://github.com/Kiwi-KawagotoKajiru/Kiwi-Maru',
		license: 'OFL-1.1',
		licenseUrl: 'https://github.com/Kiwi-KawagotoKajiru/Kiwi-Maru/blob/master/OFL.txt'
	},
	{
		name: 'Source Code Pro',
		url: 'https://github.com/adobe-fonts/source-code-pro',
		license: 'OFL-1.1',
		licenseUrl: 'https://github.com/adobe-fonts/source-code-pro/blob/release/LICENSE.md'
	},
	{
		name: 'Kaisei Decol',
		url: 'https://github.com/FontKai-Kaisei/Kaisei',
		license: 'OFL-1.1',
		licenseUrl: 'https://github.com/FontKai-Kaisei/Kaisei/blob/master/OFL.txt'
	},
	{
		name: 'svelte-i18n',
		url: 'https://github.com/kaisermann/svelte-i18n',
		license: 'MIT',
		licenseUrl: 'https://github.com/kaisermann/svelte-i18n/blob/main/LICENSE'
	},
	{
		name: 'Material Symbols/Icons',
		url: 'https://fonts.google.com/icons',
		license: 'Apache-2.0',
		licenseUrl: 'https://github.com/google/material-design-icons/blob/master/LICENSE'
	},
	{
		name: 'Bootstrap Icons',
		url: 'https://icons.getbootstrap.com',
		license: 'MIT',
		licenseUrl: 'https://github.com/twbs/icons/blob/main/LICENSE'
	},
	{
		name: 'npm',
		url: 'https://npmjs.com',
		license: 'Artistic-2.0',
		licenseUrl: 'https://github.com/npm/cli/blob/latest/LICENSE'
	},
	{
		name: 'VSCode Insiders',
		url: 'https://code.visualstudio.com/insiders',
		license: 'MIT',
		licenseUrl: 'https://github.com/microsoft/vscode/blob/main/LICENSE.txt'
	},
	{
		name: 'Git',
		url: 'https://git-scm.com',
		license: 'Other'
	},
	{
		name: 'Node.js',
		url: 'https://nodejs.org',
		license: 'Other',
		licenseUrl: 'https://github.com/nodejs/node/blob/main/LICENSE'
	},
	{
		name: 'TypeScript',
		url: 'https://typescriptlang.org',
		license: 'Apache-2.0',
		licenseUrl: 'https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt'
	},
	{
		name: 'Squoosh',
		url: 'https://squoosh.app',
		license: 'Apache-2.0',
		licenseUrl: 'https://github.com/GoogleChromeLabs/squoosh/blob/dev/LICENSE'
	},
	{
		name: 'GitHub',
		url: 'https://github.com'
	},
	{
		name: 'Svelte for VS Code',
		url: 'https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode',
		...LICENSES.svelteLangTools
	},
	{
		name: 'Prettier',
		url: 'https://prettier.io',
		license: 'MIT',
		licenseUrl: 'https://github.com/prettier/prettier/blob/main/LICENSE'
	},
	{
		name: 'ESLint',
		url: 'https://eslint.org',
		license: 'MIT',
		licenseUrl: 'https://github.com/eslint/eslint/blob/main/LICENSE'
	},
	{
		name: 'svelte-check',
		url: 'https://github.com/sveltejs/language-tools/tree/master/packages/svelte-check',
		...LICENSES.svelteLangTools
	},
	{
		name: 'typescript-eslint',
		url: 'https://typescript-eslint.io',
		license: 'Other',
		licenseUrl: 'https://github.com/typescript-eslint/typescript-eslint/blob/main/LICENSE'
	},
	{
		name: 'NProgress.js',
		url: 'https://ricostacruz.com/nprogress',
		license: 'MIT',
		licenseUrl: 'https://github.com/rstacruz/nprogress/blob/master/License.md'
	},
	{
		name: 'rehype-autolink-headings',
		url: 'https://github.com/rehypejs/rehype-autolink-headings',
		license: 'MIT',
		licenseUrl: 'https://github.com/rehypejs/rehype-autolink-headings/blob/main/license'
	},
	{
		name: 'rehype-external-links',
		url: 'https://github.com/rehypejs/rehype-external-links',
		license: 'MIT',
		licenseUrl: 'https://github.com/rehypejs/rehype-external-links/blob/main/license'
	},
	{
		name: 'rehype-slug',
		url: 'https://github.com/rehypejs/rehype-slug',
		license: 'MIT',
		licenseUrl: 'https://github.com/rehypejs/rehype-slug/blob/main/license'
	},
	{
		name: 'GIMP',
		url: 'https://gimp.org',
		license: 'GPL-3.0',
		licenseUrl: 'https://www.gimp.org/about/COPYING'
	},
	{
		name: 'Inkscape',
		url: 'https://inkscape.org',
		license: 'Other',
		licenseUrl: 'https://gitlab.com/inkscape/inkscape/-/blob/master/COPYING'
	},
	{
		name: 'Paint.NET',
		url: 'https://getpaint.net',
		license: 'Other',
		licenseUrl: 'https://www.getpaint.net/license.html'
	},
	{
		name: 'Stable Diffusion web UI',
		url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
		license: 'AGPL-3.0',
		licenseUrl: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/LICENSE.txt'
	},
	{
		name: 'uuid',
		url: 'https://github.com/uuidjs/uuid',
		license: 'MIT',
		licenseUrl: 'https://github.com/uuidjs/uuid/blob/main/LICENSE.md'
	},
	{
		name: 'GitHub Copilot',
		url: 'hhttps://github.com/features/copilot'
	},
	{
		name: 'Trailing Spaces',
		url: 'https://github.com/shardulm94/vscode-trailingspaces',
		license: 'MIT',
		licenseUrl: 'https://github.com/shardulm94/vscode-trailingspaces/blob/master/LICENSE'
	},
	{
		name: 'Spelling Checker',
		url: 'https://streetsidesoftware.com/vscode-spell-checker',
		license: 'GPL',
		licenseUrl: 'https://github.com/streetsidesoftware/vscode-spell-checker/blob/main/LICENSE'
	},
	{
		name: 'typos',
		url: 'https://github.com/crate-ci/typos',
		license: 'MIT',
		licenseUrl: 'https://github.com/crate-ci/typos/blob/master/LICENSE-MIT'
	},
	{
		name: 'adapter-cloudflare',
		url: 'https://github.com/sveltejs/kit/tree/main/packages/adapter-cloudflare',
		...LICENSES.svelteKit
	},
	{
		name: 'vite-plugin-svelte',
		url: 'https://github.com/sveltejs/vite-plugin-svelte',
		license: 'MIT',
		licenseUrl: 'https://github.com/sveltejs/vite-plugin-svelte/blob/main/LICENSE'
	},
	{
		name: 'tslib',
		url: 'https://github.com/microsoft/tslib',
		license: '0BSD',
		licenseUrl: 'https://github.com/microsoft/tslib/blob/main/LICENSE.txt'
	},
	{
		name: 'eslint-plugin-svelte',
		url: 'https://sveltejs.github.io/eslint-plugin-svelte',
		license: 'MIT',
		licenseUrl: 'https://github.com/sveltejs/eslint-plugin-svelte/blob/main/LICENSE'
	},
	{
		name: 'eslint-config-prettier',
		url: 'https://github.com/prettier/eslint-config-prettier',
		license: 'MIT',
		licenseUrl: 'https://github.com/prettier/eslint-config-prettier/blob/main/LICENSE'
	},
	{
		name: 'prettier-plugin-svelte',
		url: 'https://github.com/sveltejs/prettier-plugin-svelte',
		license: 'MIT',
		licenseUrl: 'https://github.com/sveltejs/prettier-plugin-svelte/blob/master/LICENSE'
	},
	{
		name: 'Misskey assets',
		url: 'https://github.com/misskey-dev/assets',
		license: 'CC-BY-SA-4.0',
		licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/'
	}
];
