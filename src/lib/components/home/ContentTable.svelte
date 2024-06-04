<script lang="ts">
	import FadeInUpAnim from '$lib/components/FadeInUpAnim.svelte';

	const ITEMS = [
		{
			id: 'activities',
			name: 'Major Activities'
		},
		{
			id: 'chronicle',
			name: 'Chronicle'
		},
		{
			id: 'blog',
			name: 'Blog Articles'
		},
		{
			id: 'contact',
			name: 'Contact / Social'
		}
	];
</script>

<FadeInUpAnim>
	<ul>
		{#each ITEMS as { id, name } (id)}
			<li><a href="#{id}"><div>{name}</div></a></li>
		{/each}
	</ul>
</FadeInUpAnim>

<style lang="scss">
	@use '/static/stylesheets/variables/mixin' as *;

	ul {
		list-style: none;
		max-width: 326px;
		padding: 0;
		margin: 24px auto;
		@include glassmorphism($blur: 10px, $border-radius: 8px);
	}

	li {
		transition: 0.13s;

		&:last-child {
			div {
				border: none;
			}
		}

		&:hover {
			background-color: #ffffff5a;
			$saturate: saturate(2);
			backdrop-filter: $saturate;
			-webkit-backdrop-filter: $saturate;
		}
	}

	a {
		color: inherit;
	}

	div {
		width: 93%;
		padding: 16px 0;
		margin: 0 auto;
		font-size: 20px;
		$border: 1px solid #ffffffa0;
		border-bottom: $border;
	}
</style>
