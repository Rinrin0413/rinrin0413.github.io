<ul>
	<li>
		<h1>Apr. 2006</h1>
		<div>この世界に湧く</div>
	</li>
	<li>
		<h1>Mar. 2022</h1>
		<div>TETR.IO を始める</div>
	</li>
	<li>
		<h1 class="no-pin">Apr. 2022</h1>
		<div>S高等学校に入学</div> 
	</li>
	<li>
		<h1 class="no-pin">Jun. 2022</h1>
		<div>吹っ切れて Windows を消し飛ばして openSUSE Leap に乗り換える</div>
	</li>
	<li>
		<h1>Apr. 2036</h1>
		<div>30年後の自分は何歳かな..と 誕生直後から... 考えていました。</div>
	</li>
</ul>

<style lang="scss">
	@use '/assets/stylesheets/variables/color' as *;

	ul {
		padding: 0;
		margin: 64px auto;
		$border: 2px dotted $line-primary;
		border-left: $border;
		border-right: $border;
		max-width: 640px;

		li {
			display: flex;
			justify-content: center;
			text-align: left;
			margin: 0 32px;
			font-size: 18px;

			h1 {
				font-weight: 200;
				width: 86px;
				position: relative;
				bottom: 32px;
				padding: 0 32px 48px 0;
				margin: 0;
				border-right: 1px solid $line-primary;
				white-space: nowrap;
				font-size: inherit;

				&:not(.no-pin):after {
					content: '';
					$size: 18px;
					width: $size;
					height: $size;
					background-color: #5f4730;
					transform: rotate(45deg);
					position: absolute;
					left: 109.99px;
				}
			}

			div {
				position: relative;
				bottom: 32px;
				left: 24px;
				width: 512px;
				font-size: inherit;
			}
		}
	}
</style>
