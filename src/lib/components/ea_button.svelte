<script lang="ts">
	import { decrypt_ea } from '$lib/decrypt_ea';

	/** Whether the button is mini version. */
	export let mini = false;

	let is_ea_link_in_progress = false;
</script>

<button
	class="a"
	class:mini
	class:progress={is_ea_link_in_progress}
	on:click={() => {
		if (!is_ea_link_in_progress) {
			is_ea_link_in_progress = true;
			decrypt_ea(1031);
			setTimeout(() => {
				is_ea_link_in_progress = false;
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

		@include sp() {
			&.mini span {
				&:before,
				&:after {
					font-size: 10px;
				}
			}
		}

		&.progress {
			color: black;
			text-decoration: none;
			opacity: 0.5;
			cursor: progress;
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
	}
</style>
