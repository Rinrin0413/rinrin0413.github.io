<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<details>
	<summary class="a">{$_('skills.summary')}</summary>

	<ul>
		<li>
			Rust
			<ul>
				<li>{$_('skills.rust.0')}</li>
				<li>{$_('skills.rust.1')}</li>
			</ul>
		</li>
		<li>
			Git
			<ul><li>{$_('skills.git')}</li></ul>
		</li>
		<li>
			GLSL / WGSL / HLSL
			<ul><li>{$_('skills.glslWgslHlsl')}</li></ul>
		</li>
		<li>
			{$_('w.webDev')}
			<ul>
				<li>{$_('skills.webDev.0')}</li>
				<li>
					Svelte
					<ul>
						<li>{$_('skills.webDev.svelte.0')}</li>
						<li>{$_('skills.webDev.svelte.1')}</li>
					</ul>
				</li>
				<li>
					HTML / CSS / JavaScript
					<ul>
						<li>{$_('skills.webDev.htmlCssJs')}</li>
						<li>{$_('skills.webDev.htmlCssJs')}</li>
					</ul>
				</li>
				<li>
					SASS
					<ul>
						<li>{$_('skills.webDev.sass.0')}</li>
						<li>{$_('skills.webDev.sass.1')}</li>
						<li>{$_('skills.webDev.sass.2')}</li>
					</ul>
				</li>
			</ul>
		</li>
		<li>
			Python
			<ul>
				<li>{$_('skills.python.0')}</li>
				<li>{$_('skills.python.1')}</li>
			</ul>
		</li>
		<li>
			{$_('w.minecraft')}
			<ul>
				<li>{$_('skills.minecraft.0')}</li>
				<li>{$_('skills.minecraft.1')}</li>
				<li>{$_('skills.minecraft.2')}</li>
			</ul>
		</li>
		<li>
			Linux
			<ul>
				<li>{$_('skills.linux.0')}</li>
				<li>{$_('skills.linux.1')}</li>
			</ul>
		</li>
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
