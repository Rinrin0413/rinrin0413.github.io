<script lang="ts">
	import { decrypt_ea } from '$lib/decrypt_ea';

	let is_ea_link_in_progress = false;
</script>

<table id="contact-table">
	<tr>
		<td>Email</td>
		<td
			><button
				class="a"
				class:progress={is_ea_link_in_progress}
				on:click={() => {
					if (!is_ea_link_in_progress) {
						is_ea_link_in_progress = true;
						decrypt_ea(1031);
						setTimeout(() => {
							is_ea_link_in_progress = false;
						}, 5000);
					}
				}}><span /><span></span></button
			></td
		>
	</tr>
	<tr>
		<td>Discord</td>
		<td
			><a href="https://discord.com/users/724976600873041940">Rinrin.rs#5671 (724976600873041940)</a
			></td
		>
	</tr>
	<tr>
		<td>Discord Server</td>
		<td><a href="https://discord.gg/7QhMDfyPHR">Rinrinの要塞</a></td>
	</tr>
	<tr>
		<td>Twitter</td>
		<td><a href="https://twitter.com/Rinrin_2nd">@Rinrin_2nd</a></td>
	</tr>
</table>

<style lang="scss">
	@use '/assets/stylesheets/variables/mixin' as *;

	#contact-table {
		font-size: 18px;
		margin: 18px auto;

		@include sp {
			font-size: 16px;
		}

		tr {
			margin: 12px 18px;

			td {
				&:first-child {
					text-align: right;

					&:after {
						content: ':';
					}
				}

				&:last-child {
					text-align: left;

					button {
						padding: 0;
						font-family: inherit;
						font-size: inherit;
						background: none;
						border: none;
						transition: 0.26s;

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
				}
			}
		}
	}
</style>
