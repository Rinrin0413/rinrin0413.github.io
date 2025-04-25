<script lang="ts">
	import { CONTACT_EMAIL_ADDRESS } from '$lib/scripts/variables';

	const SOCIALS: {
		service: string;
		name: string;
		href: string;
		src: string;
		width: number;
		height: number;
		isExternal: boolean;
		title?: string;
	}[] = [
		{
			service: 'Gmail',
			name: CONTACT_EMAIL_ADDRESS,
			href: `mailto:${CONTACT_EMAIL_ADDRESS}`,
			src: '/images/logos/gmail.webp',
			width: 39,
			height: 39,
			isExternal: false
		},
		{
			service: 'Discord',
			name: 'rinrin0413',
			href: 'https://discord.com/users/724976600873041940',
			src: '/images/logos/discord-mark-blue.svg',
			width: 26,
			height: 20,
			isExternal: true
		},
		{
			service: 'Discord(server)',
			name: 'Rinrinの要塞',
			href: 'https://discord.gg/7QhMDfyPHR',
			src: '/images/logos/discord-mark-blue.svg',
			width: 26,
			height: 20,
			isExternal: true,
			title: 'My Discord server'
		},
		{
			service: 'Misskey.io',
			name: '@Rinrin0413',
			href: 'https://misskey.io/@Rinrin0413',
			src: '/images/logos/misskey-io_io-icon.svg',
			width: 26,
			height: 26,
			isExternal: true
		},
		{
			service: 'GitHub',
			name: '@Rinrin0413',
			href: 'https://github.com/Rinrin0413',
			src: '/images/logos/github-mark.svg',
			width: 98,
			height: 96,
			isExternal: true
		},
		{
			service: 'X',
			name: '@Rinrin_2nd',
			href: 'https://x.com/Rinrin_2nd',
			src: '/images/logos/x_logo.svg',
			width: 1200,
			height: 1227,
			isExternal: true
		}
	];
</script>

<ul>
	{#each SOCIALS as { service, name, href, src, width, height, isExternal, title }}
		<li {title}>
			<img {src} alt="" {width} {height} />{service}:
			<a
				{href}
				target={isExternal ? '_blank' : undefined}
				rel={isExternal ? 'noopener noreferrer' : undefined}
				class="no-after-icn">{name}</a
			>
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '$lib/stylesheets/social_table';
</style>
