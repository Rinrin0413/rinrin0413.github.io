<script lang="ts">
	let is_opened = false;
</script>

<button>
	<!-- 
        Google Material Symbols and Icons - Menu
        https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Amenu%3AFILL%400%3Bwght%40400%3BGRAD%400%3Bopsz%4048
        
        This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
    -->
	<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"
		><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" /></svg
	>
	{#key is_opened}<span>{is_opened ? 'Close' : 'Menu'}</span>{/key}
</button>

<style lang="scss">
	@use '/assets/stylesheets/header/button';

	@use '/assets/stylesheets/variables/mixin' as *;

	button {
		display: none;
		margin-right: 8px;
		font-weight: 900;

		@include hm {
			display: block;
		}

		&:active {
			transform: translateY(5px) scale(0.95);
		}
	}
</style>
