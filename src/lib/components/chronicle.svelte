<ul>
	<li>
		<h1>Apr. 2006</h1>
		<div>この世界に湧く</div>
	</li>
	<li>
		<h1>May 2020</h1>
		<div>Discord bot を作りたくて間違って Python を始める</div>
	</li>
	<li>
		<h1>Mar. 2022</h1>
		<div>デスクトップPC に乗り換えて初日に Windows を消し飛ばして Arch Linux を入れようとする。 だが UEFI に逆らわれ&emsp;敗北...</div>
	</li>
	<li>
		<h1 class="no-pin">Apr. 2022</h1>
		<div>S高等学校に名前を書き&emsp;入学...</div>
	</li>
	<li>
		<h1 class="no-pin">Jun. 2022</h1>
		<div>吹っ切れてまた Windows を消し飛ばして openSUSE に乗り換える</div>
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

			h1 {
				font-weight: 200;
				width: 86px;
				position: relative;
				bottom: 32px;
				padding-right: 32px;
				margin: 0;
				border-right: 1px solid $line-primary;
				white-space: nowrap;
				font-size: 18px;

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
				$separator-color: rgba($line-primary, 0.7);

				position: relative;
				bottom: 32px;
				left: 24px;
				width: 512px;
				font-size: 16px;
				font-weight: bold;
				border-bottom: 2.5px solid $separator-color;
				padding: 0 6px 3px 12px;
				margin-bottom: 48px;

				&:before {
					content: '';
					display: inline-block;
					width: 1px;
					height: 100%;
					background-color: $separator-color;
					position: absolute;
					left: 3px;
				}
			}
		}
	}
</style>
