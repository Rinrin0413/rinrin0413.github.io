<ul>
	<a href="#activities"><li>Major Activities</li></a>
	<a href="#chronicle"><li>Chronicle</li></a>
	<a href="#contact"><li>Contact / Social</li></a>
</ul>

<style lang="scss">
	ul {
		list-style: none;
		max-width: 326px;
		padding: 0;
		margin: 24px auto;
		background-color: #fff6e58c;
		border: 4px solid #b1976c8c;
		border-radius: 4px;

		a {
			color: inherit;
			transition: 0.2s;

			&:hover {
				color: #9c6113;

				li {
					background-color: #fff6e5b2;
					font-size: 24px;
				}
			}

			&:active li {
				font-size: 20px;
			}

			li {
				font-size: 20px;
				font-weight: bold;
				padding: 18px 0;
				$border: 1px solid #b1976c;
				border-top: $border;
				border-bottom: $border;
				transition: 0.24s;
			}

			&:first-child li {
				border-top: none;
			}

			&:last-child li {
				border-bottom: none;
			}
		}
	}
</style>
