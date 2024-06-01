<script lang="ts">
	import { _ } from 'svelte-i18n';

	const L10N_PATHS = {
		s: 'skills.',
		rs: 'skills.rust.',
		wevDev: 'skills.webDev.',
		svelte: 'skills.webDev.svelte.',
		sass: 'skills.webDev.sass.',
		py: 'skills.python.',
		mc: 'skills.minecraft.',
		linux: 'skills.linux.'
	};
	const skills: {
		key: string;
		values: (
			| string
			| {
					key: string;
					value: string[];
			  }
		)[];
	}[] = [
		{
			key: 'Rust',
			values: [$_(L10N_PATHS.rs + '0'), $_(L10N_PATHS.rs + '1')]
		},
		{
			key: 'Git',
			values: [$_(L10N_PATHS.s + 'git')]
		},
		{
			key: 'GLSL / WGSL / HLSL',
			values: [$_(L10N_PATHS.s + 'glslWgslHlsl')]
		},
		{
			key: $_('w.webDev'),
			values: [
				$_(L10N_PATHS.wevDev + '0'),
				{
					key: 'Svelte',
					value: [$_(L10N_PATHS.svelte + '0'), $_(L10N_PATHS.svelte + '1')]
				},
				{
					key: 'HTML / CSS / JavaScript',
					value: [$_(L10N_PATHS.wevDev + 'htmlCssJs'), $_(L10N_PATHS.wevDev + 'htmlCssJs')]
				},
				{
					key: 'Sass',
					value: [$_(L10N_PATHS.sass + '0'), $_(L10N_PATHS.sass + '1'), $_(L10N_PATHS.sass + '2')]
				}
			]
		},
		{
			key: 'Python',
			values: [$_(L10N_PATHS.py + '0'), $_(L10N_PATHS.py + '1')]
		},
		{
			key: $_('w.minecraft'),
			values: [$_(L10N_PATHS.mc + '0'), $_(L10N_PATHS.mc + '1'), $_(L10N_PATHS.mc + '2')]
		},
		{
			key: 'Linux',
			values: [$_(L10N_PATHS.linux + '0'), $_(L10N_PATHS.linux + '1')]
		}
	];
</script>

<details>
	<summary class="a">{$_('skills.summary')}</summary>

	<ul>
		{#each skills as s0 (s0.key)}
			<li>
				<span>{s0.key}</span>
				<ul>
					{#each s0.values as s1}
						{#if typeof s1 === 'string'}
							<li>{s1}</li>
						{:else}
							<li>
								<span>{s1.key}</span>
								<ul>
									{#each s1.value as s2}
										<li>{s2}</li>
									{/each}
								</ul>
							</li>
						{/if}
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</details>

<style lang="scss">
	@use '/assets/stylesheets/variables/mixin' as *;
	@use '/assets/stylesheets/variables/color' as *;

	details {
		display: inline-block;
		padding: 0 16px;
		margin: 20px auto;
	}

	summary {
		font-size: 16px;
		text-decoration: none;
		transition: 0.2s;

		&:hover {
			cursor: pointer;
			transform: scale(1.04) translateY(-1px);
		}
	}

	ul {
		max-width: 482px;
		padding: 0 5px 0 36px;
		margin: 8px auto;

		ul {
			padding-left: 28px;
			margin: 0;
		}
	}

	li {
		text-align: left;
		font-size: 16px;
		list-style: disc;
		margin-bottom: 3px;

		@include sp {
			font-size: 15px;
		}
	}
</style>
