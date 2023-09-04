<script lang="ts">
	import { decryptEa } from '$lib/decrypt_ea';

	/** Whether the button is mini version. */
	export let mini = false;

	let isInProgress = false;
</script>

<button
	class="a"
	class:mini
	class:progress={isInProgress}
	on:click={() => {
		if (!isInProgress) {
			isInProgress = true;
			decryptEa(1031);
			setTimeout(() => {
				isInProgress = false;
			}, 5000);
		}
	}}><span /><span /></button
>

<style lang="scss">
	@use '/assets/stylesheets/variables/mixin' as *;

	button {
		padding: 0;
		font-family: inherit;
		font-size: inherit;
		background: none;
		border: none;
		transition: 0.26s;
	}

	span {
		&:first-child {
			&:before {
				content: 'rinrin0413';
			}

			&:after {
				content: '.';
			}
		}

		&:last-child {
			&:before {
				content: 'valley';
			}

			&:after {
				content: '@gmail.com';
			}
		}
	}

	@include sp() {
		.mini span {
			&:before,
			&:after {
				font-size: 10px;
			}
		}
	}
	.progress {
		color: black;
		text-decoration: none;
		opacity: 0.5;
		cursor: progress;
	}
</style>
