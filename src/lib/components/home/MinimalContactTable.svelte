<script lang="ts">
	import EaButton from '$lib/components/EaButton.svelte';
</script>

<table class="social-table">
	<tr>
		<td>
			<img src="/images/logos/gmail.webp" alt="Gmail logo" />Gmail
		</td>
		<td><EaButton mini /></td>
	</tr>
	<tr>
		<td>
			<img src="/images/logos/discord-mark-blue.svg" alt="Discord logo" />Discord
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
			<img src="/images/logos/discord-mark-blue.svg" alt="Discord logo" />Discord(server)
		</td>
		<td
			><a href="https://discord.gg/7QhMDfyPHR" target="_blank" rel="noopener noreferrer"
				>Rinrinの要塞</a
			></td
		>
	</tr>
	<tr>
		<td>Misskey.io</td>
		<td
			><a href="https://misskey.io/@Rinrin0413" target="_blank" rel="noopener noreferrer"
				>@Rinrin0413</a
			></td
		>
	</tr>
	<tr>
		<td>
			<img src="/images/logos/github-mark.svg" alt="GitHub logo" />GitHub
		</td>
		<td>
			<a href="https://github.com/Rinrin0413" target="_blank" rel="noopener noreferrer"
				>@Rinrin0413</a
			>
		</td>
	</tr>
	<tr>
		<td>
			<img src="/images/logos/x_logo.svg" alt="X logo" />X
		</td>
		<td
			><a href="https://x.com/Rinrin_2nd" target="_blank" rel="noopener noreferrer">@Rinrin_2nd</a
			></td
		>
	</tr>
</table>

<style lang="scss">
	@use '/static/stylesheets/social_table';
</style>
