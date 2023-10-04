export function elasticBackOut(t: number) {
	return Math.sin(-2.3*(t +1.)*Math.PI)*Math.pow(2., -10.*t) +1.;
}
