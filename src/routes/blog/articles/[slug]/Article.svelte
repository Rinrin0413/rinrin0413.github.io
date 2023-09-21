<script lang="ts">
	import type { SvelteComponentTyped } from 'svelte';

	export let body: typeof SvelteComponentTyped;
</script>

<article><div><svelte:component this={body} /></div></article>

<style lang="scss" global>
	@use '/assets/stylesheets/variables/mixin' as *;
	@use '/assets/stylesheets/variables/color' as *;

	article {
		max-width: 768px;
		margin: 0 auto;
		padding: 0 13px;

		> div {
			text-align: left;
			font-size: 18px;
			font-weight: lighter;
			letter-spacing: 1.2px;
			padding: 0 18px;
			line-height: 1.5;
			@include glassmorphism;

			@include sp {
				font-size: 16px;
				padding: 0 10px;
			}

			p {
				margin: 1.25em 0;
			}

			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				font-weight: bold;
				margin: 1.25em 0 0.4em 0;
				//text-wrap: balance;

				> a {
					text-decoration: none;

					&:hover .icon-link::before {
						opacity: 1;
					}
				}

				.icon-link::before {
					content: '#';
					font-family: 'Source Code Pro', monospace;
					color: $text-dark;
					opacity: 0.3;
				}

				&:hover .icon-link::before {
					opacity: 0.6;
				}
			}

			h1 {
				font-size: 40px;

				@include sp {
					font-size: 32px;
				}
			}

			h2 {
				font-size: 32px;

				@include sp {
					font-size: 26px;
				}
			}

			h3 {
				font-size: 26px;

				@include sp {
					font-size: 22px;
				}
			}

			h4 {
				font-size: 22px;

				@include sp {
					font-size: 18px;
				}
			}

			h5 {
				font-size: 18px;

				@include sp {
					font-size: 16px;
				}
			}

			h6 {
				font-size: 15px;

				@include sp {
					font-size: 14px;
				}
			}

			ul,
			ol {
				padding-left: 2em;
			}

			hr {
				border: none;
				border-bottom: 1px solid $text-dark;
				margin: 1.25em 0;
				opacity: 0.6;
			}

			img {
				max-width: 100%;
			}

			strong {
				font-weight: bold;
			}

			blockquote {
				margin: 0.8em 0;
				border-left: 5px solid $text-dark;
				padding: 1px 18px;
			}

			code {
				font-family: 'Source Code Pro', monospace;
				background-color: #1e1e1e;
				color: #d4d4d4;
				padding: 2px 6px;
				border-radius: 6px;
				word-break: break-all;

				&,
				* {
					&::selection {
						background-color: #1e569888;
						color: inherit;
					}
				}
			}

			pre code {
				display: block;
				padding: 16px 20px;
				scrollbar-color: white transparent;
				overflow: scroll;
				word-break: break-all;
			}

			table {
				font-size: 16px;
				margin: 12px auto;
				border-collapse: collapse;
				overflow: hidden;
				border-radius: 2px;
				$blur: blur(16px);
				backdrop-filter: $blur;
				-webkit-backdrop-filter: $blur;
				word-break: break-all;

				@include sp {
					font-size: 14px;
				}

				th,
				td {
					max-width: 383px;
					padding: 8px 12px;
					border: 1px solid rgba($text-primary, 0.1);
				}

				th {
					background-color: rgba($text-primary, 0.2);
					border-bottom: 2px solid $text-primary;
				}

				td {
					background-color: rgba($text-primary, 0.1);
				}
			}
		}
	}
</style>
