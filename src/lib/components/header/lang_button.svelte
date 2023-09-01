<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { _ } from 'svelte-i18n';
</script>

<button
	on:click={() => {
		if ($locale == 'ja') {
			locale.set('en');
			alert('Some parts may not be translated.');
		} else {
			locale.set('ja');
		}
	}}
>
	<!-- 
        Google Material Symbols and Icons - Language
        https://fonts.google.com/icons?selected=Material%20Symbols%20Outlined%3Alanguage%3AFILL%400%3Bwght%40400%3BGRAD%40200%3Bopsz%4048
        
        This icon is licensed under the Apache License Version 2.0: https://github.com/google/material-design-icons/blob/master/README.md
    -->
	<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"
		><path
			d="M480.297-64Q393-64 317-96.5t-132.5-89Q128-242 96-318.449q-32-76.448-32-164.02Q64-569 96-645t88.5-131.5Q241-832 316.949-864q75.948-32 163.52-32Q567-896 643-864t132.5 87.5Q832-721 864-644.862T896-482q0 87.404-32 163.702T775.5-185.5Q719-129 642.774-96.5T480.297-64ZM480-136q35-35 57.5-81.5T575-327H386q14 59 37.094 107.158T480-136Zm-90-13q-24-36-41.375-79.326Q331.25-271.651 319-327H171q36 68.806 86 108.903Q307-178 390-149Zm181-1q70-22 127-68t92-109H643.142Q630-273 612.5-229.5T571-150ZM149.035-392H307q-3-26-3.5-47.5T303-482q0-25 1-44.5t4-42.5H149.035Q142-546 139.5-527t-2.5 45q0 26 2.5 46.5t9.535 43.5Zm224.996 0H587q4-30 5-49.5t1-40.5q0-20-1-38.5t-5.031-48.5H374q-4 30-5 48.5t-1 38.5q0 21 1 40.5t5.031 49.5ZM653-392h159q6-23 8.5-43.5T823-482q0-26-2.5-45t-8.5-42H654q2 35 3 53.175 1 18.175 1 33.825 0 22-1.5 41.5T653-392Zm-10.858-242H790q-33-67-90-113t-130-65q24 36 41.5 78.5t30.642 99.5ZM386-634h190q-11-50.721-36-100.861Q515-785 480-825q-31 29-52.5 73T386-634Zm-215 0h148.816Q331-688 347.5-730t41.5-81q-73 19-129 63.5T171-634Z"
		/></svg
	>
	<span>{$_('header.language')}</span>
</button>

<style lang="scss">
	@use '/assets/stylesheets/header/button';

	@use '/assets/stylesheets/variables/dimension' as *;
	@use '/assets/stylesheets/variables/color' as *;

	button {
		display: inline-block;

		&:active {
			animation: rotate-y 0.17s;

			span {
				color: transparent;
			}

			@keyframes rotate-y {
				0% {
					transform: translateY(4px) rotateY(0deg);
				}
				50% {
					transform: translateY(4px) rotateY(50deg);
				}
				100% {
					transform: translateY(4px) rotateY(0deg);
				}
			}
		}
	}
	
	span {
		transition: 0.3s;
	}
</style>
