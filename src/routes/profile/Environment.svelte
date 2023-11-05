<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<h2>{$_('w.hardware')}</h2>

<div>
	<h3>{$_('w.model')}</h3>
	<p>MouseComputer Z7-Z690</p>

	<h3>CPU</h3>
	<p>Intel® Core™ i7-12700 Processor</p>

	<h3>{$_('w.memory')}</h3>
	<p>16GB✕2</p>

	<h3>{$_('w.gpu')}</h3>
	<p>NVIDIA GeForce RTX 3060 / 12GB</p>
</div>

<h2>{$_('w.software')}</h2>

<div>
	<h3>OS</h3>
	<p>openSUSE Leap 15.5 x86_64</p>

	<h3>{$_('w.shell')}</h3>
	<p>bash 4.4.23</p>

	<h3>{$_('w.desktopEnv')}</h3>
	<p>GNOME 41.9</p>

	<h3>{$_('w.webBrowser')}</h3>
	<p>Mozilla Firefox</p>
	<span>
		<b>{$_('w.transition')}</b><br />
		[IE9 -> Chrome -> Edge -> Brave -> Firefox]
	</span>

	<h3>{$_('w.codeEditor')}</h3>
	<p>Visual Studio Code Insiders</p>
	<span>
		<b>{$_('w.transition')}</b><br />
		[{$_('w.sakuraEditor')} -> Notepad++ -> VSCode -> VSCode Insiders]
	</span>
</div>

<p>
	{$_('env.notes.0')}<a href="https://geartics.com/rinrin" target="_blank" rel="noopener noreferrer"
		>Geartics</a
	>{$_('env.notes.1')}
</p>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;
	@use '/assets/stylesheets/variables/mixin' as *;

	h2 {
		display: inline-block;
		text-align: center;
		font-size: 28px;
		font-weight: bold;
		border-bottom: 6px solid rgba($text-primary, 0.5);
		padding: 0 10px;

		@include sp {
			font-size: 24px;
		}
	}

	h3,
	div p {
		max-width: 365px;
		padding: 4px 14px;

		@include sp {
			max-width: 291px;
		}
	}

	$glassmorphism-border-light: 2px solid #e7dfd57a;
	$glassmorphism-border-dark: 2px solid rgba($text-primary, 0.1);

	h3 {
		margin: 0 auto;
		font-size: 20px;
		padding: 0 14px;
		border-bottom: 2px solid rgba($text-primary, 0.75);
		background-color: rgba($text-primary, 0.16);
		$blur: blur(4px);
		backdrop-filter: $blur;
		-webkit-backdrop-filter: $blur;
		border-right: $glassmorphism-border-dark;
		border-left: $glassmorphism-border-light;
		border-top: $glassmorphism-border-light;

		@include sp {
			font-size: 18px;
		}
	}

	div p {
		padding-bottom: 8px;
		margin-top: 0;
		margin-bottom: 14px;
		background-color: rgba($text-primary, 0.08);
		$blur: blur(24px);
		backdrop-filter: $blur;
		-webkit-backdrop-filter: $blur;
		$border-rad: 4px;
		border-bottom-left-radius: $border-rad;
		border-bottom-right-radius: $border-rad;
		border-right: $glassmorphism-border-dark;
		border-bottom: $glassmorphism-border-dark;
		border-left: $glassmorphism-border-light;
	}

	span {
		font-size: 16px;
		margin-top: 0px;
		position: relative;
		top: -19px;

		@include sp {
			font-size: 14px;
		}
	}

	b {
		font-size: 18px;

		&:before {
			content: '┗ ';
		}
		&:after {
			content: ':';
		}
	}
</style>
