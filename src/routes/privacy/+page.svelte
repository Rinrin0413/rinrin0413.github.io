<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';

	import { _, date as dateI18n } from 'svelte-i18n';

	const establishedData = new Date('2024-06-23T09:00:00Z');
	const revisedDates = [new Date('2025-03-17T09:00:00Z')];
</script>

<HeadMetadata
	title="Privacy Policy"
	desc="このプライバシーポリシーは、当サイトにおけるアクセス解析について示したものです。"
/>

<section>
	<Title text="Privacy Policy" atPageTop />
	<p>{$_(`privacy.desc`)}</p>

	<div>
		<p>
			{$_(`privacy.analytics.0`)}<a
				href="https://cloudflare.com/web-analytics"
				target="_blank"
				rel="noopener noreferrer">Cloudflare Web Analytics</a
			>{$_(`privacy.analytics.1`)}
		</p>
		<p>
			{$_(`privacy.analytics.2`)}
			<a href="https://noteflight.com" target="_blank" rel="noopener noreferrer">Noteflight</a>{$_(
				`privacy.analytics.3`
			)}<a href="https://noteflight.com/company/about" target="_blank" rel="noopener noreferrer"
				>Noteflight LLC.</a
			>{$_(`privacy.analytics.4`)}
			<a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer">SoundCloud</a>{$_(
				`privacy.analytics.5`
			)}<a href="https://soundcloud.com/imprint" target="_blank" rel="noopener noreferrer"
				>SoundCloud Global Limited & Co. KG</a
			>{$_(`privacy.analytics.6`)}<a href="https://noteflight.com/legal/privacy">Privacy Policy</a
			>{$_(`privacy.analytics.7`)}<a
				href="https://soundcloud.com/pages/privacy"
				target="_blank"
				rel="noopener noreferrer">Privacy Policy</a
			>{$_(`privacy.analytics.8`)}
		</p>
	</div>

	<p class="timeline">
		<time datetime={establishedData.toISOString()}
			>{$_('w.establishedOn', {
				values: { date: $dateI18n(establishedData, { format: 'long' }) }
			})}</time
		>

		{#each revisedDates as date}
			<br />

			<time datetime={date.toISOString()}
				>{$_('w.revisedOn', { values: { date: $dateI18n(date, { format: 'long' }) } })}</time
			>
		{/each}
	</p>
</section>

<style lang="scss">
	div {
		display: inline-block;
		padding: 2px 0;
		background-color: #f9f9f991;
		text-align: justify;
	}

	.timeline {
		margin-top: 26px;
		text-align: center;
	}
</style>
