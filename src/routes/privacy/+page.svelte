<script lang="ts">
	import HeadMetadata from '$lib/components/HeadMetadata.svelte';
	import Title from '$lib/components/Title.svelte';

	import { _, date } from 'svelte-i18n';
</script>

<HeadMetadata
	title="Privacy Policy"
	desc="このプライバシーポリシーは、当サイトにおけるアクセス解析について示したものです。"
/>

<section>
	<Title text="Privacy Policy" atPageTop />
	<p class="desc">{$_(`privacy.desc`)}</p>

	<p>
		{$_(`privacy.analytics.0`)}<a
			href="https://cloudflare.com/web-analytics"
			target="_blank"
			rel="noopener noreferrer">Cloudflare Web Analytics</a
		>{$_(`privacy.analytics.1`)}
	</p>

	<p>{$_(`w.effectiveDate`)}: {$date(new Date(2024, 6 - 1, 23), { format: 'long' })}</p>
</section>

<style lang="scss">
	p:not(.desc) {
		padding: 14px 17px;
		background-color: #f9f9f991;
		text-align: justify;
	}
</style>
