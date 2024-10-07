<script lang="ts">
	import EaButton from '$lib/components/EaButton.svelte';
</script>

<table class="social-table">
	<tr>
		<td>
			<img src="/images/logos/gmail.webp" alt="Gmail logo" width="39" height="39" />Gmail
		</td>
		<td><EaButton mini /></td>
	</tr>
	<tr>
		<td>
			<img
				src="/images/logos/discord-mark-blue.svg"
				alt="Discord logo"
				width="26"
				height="20"
			/>Discord
		</td>
		<td
			><a
				href="https://discord.com/users/724976600873041940"
				target="_blank"
				rel="noopener noreferrer">rinrin0413</a
			></td
		>
	</tr>
	<tr>
		<td title="My Discord server">
			<img
				src="/images/logos/discord-mark-blue.svg"
				alt="Discord logo"
				width="26"
				height="20"
			/>Discord(server)
		</td>
		<td
			><a href="https://discord.gg/7QhMDfyPHR" target="_blank" rel="noopener noreferrer"
				>Rinrinの要塞</a
			></td
		>
	</tr>
	<tr>
		<td>
			<img src="/images/logos/misskey-io_io-icon.svg" alt="Misskey.io logo" width="26" height="26" />Misskey.io
		</td>
		<td
			><a href="https://misskey.io/@Rinrin0413" target="_blank" rel="noopener noreferrer"
				>@Rinrin0413</a
			></td
		>
	</tr>
	<tr>
		<td>
			<img src="/images/logos/github-mark.svg" alt="GitHub logo" width="98" height="96" />GitHub
		</td>
		<td>
			<a href="https://github.com/Rinrin0413" target="_blank" rel="noopener noreferrer"
				>@Rinrin0413</a
			>
		</td>
	</tr>
	<tr>
		<td>
			<img src="/images/logos/x_logo.svg" alt="X logo" width="1200" height="1227" />X
		</td>
		<td
			><a href="https://x.com/Rinrin_2nd" target="_blank" rel="noopener noreferrer">@Rinrin_2nd</a
			></td
		>
	</tr>
</table>

<style lang="scss">
	@use '$lib/stylesheets/social_table';
</style>
