<script>
	let title = 'Home';
	let desc = 'Rinrin.rs のホームページです(・。・)o彡ﾟ';
</script>

<svelte:head>
	<title>Rinrin.rs | {title}</title>
	<meta name="title" content="Rinrin.rs | {title}" />
	<meta name="description" content={desc} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={desc} />
	<meta property="og:url" content="https://rinrin.pages.dev" />
	<meta property="og:type" content="website" />
</svelte:head>

<div id="container">
	<p>
		Hi there, I'm a 16year-old
		<a
			href="https://nnn.ed.jp/high_school_feature/s_high_school"
			target="_blank"
			rel="noreferrer noopener">S high school</a
		>
		student from Japan; am a low spec fool ('ω' )
	</p>
</div>

<style lang="scss">
	@import './assets/stylesheets/root.scss';
</style>
