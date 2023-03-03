<script lang="ts">
	import { decrypt_ea } from '$lib/decrypt_ea';

	let is_ea_link_in_progress = false;
</script>

<table id="contact-table">
	<tr>
		<td>
			<img src="images/logos/google/gmail.png" alt="Gmail logo" />Gmail
		</td>
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
				}}><span /><span /></button
			></td
		>
	</tr>
	<tr>
		<td>
			<img src="images/logos/discord/discord-mark-blue.svg" alt="Discord logo" />Discord
		</td>
		<td
			><a
				href="https://discord.com/users/724976600873041940"
				target="_blank"
				rel="noopener noreferrer">Rinrin.rs#5671 (724976600873041940)</a
			></td
		>
	</tr>
	<tr>
		<td title="My Discord server">
			<img src="images/logos/discord/discord-mark-blue.svg" alt="Discord logo" />〃 Server
		</td>
		<td
			><a href="https://discord.gg/7QhMDfyPHR" target="_blank" rel="noopener noreferrer"
				>Rinrinの要塞</a
			></td
		>
	</tr>
	<tr>
		<td>
			<img
				src="images/logos/twitter-logo-01282021/Twitter logo/SVG/Logo blue.svg"
				alt="Twitter logo"
			/>Twitter
		</td>
		<td
			><a href="https://twitter.com/Rinrin_2nd" target="_blank" rel="noopener noreferrer"
				>@Rinrin_2nd</a
			></td
		>
	</tr>
	<tr>
		<td>
			<img src="images/logos/github-mark/github-mark.svg" alt="GitHub logo" />GitHub
		</td>
		<td>
			<a href="https://github.com/Rinrin0413" target="_blank" rel="noopener noreferrer"
				>@Rinrin0413</a
			>
		</td>
	</tr>
</table>

<style lang="scss">
	@use '/assets/stylesheets/variables/mixin' as *;

	#contact-table {
		font-size: 18px;
		background: #ffffff35;
		padding: 12px;
		padding-top: 4px;
		margin: 18px auto;
		border-radius: 4px;

		@include sp {
			font-size: 14px;
		}

		tr {
			margin: 12px 18px;

			td {
				&:first-child {
					text-align: right;
					white-space: nowrap;

					img {
						width: 26px;
						vertical-align: middle;
						transform: translateY(-4px);
						margin-right: 6px;

						@include sp {
							width: 19px;
							transform: translateY(-2px);
							margin-right: 5px;
						}
					}

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
