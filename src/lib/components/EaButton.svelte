<script lang="ts">
	import { CONTACT_EMAIL_ADDRESS } from '$lib/scripts/variables';

	/** Whether the button is mini version. */
	export let mini = false;
</script>

<a href="mailto:{CONTACT_EMAIL_ADDRESS}" class:mini>{CONTACT_EMAIL_ADDRESS}</a>

<style lang="scss">
	@use '$lib/stylesheets/variables/mixin' as *;

	.mini {
		@include sp {
			font-size: 10px;
		}
	}
</style>
