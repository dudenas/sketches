let rg;

function setup() {
	noCanvas();
	rg = new RiGrammar();
	rg.addRule("<start>", "the <N> <V>", 1);
	rg.addRule("<N>", "cat | dog | unicorn");
	rg.addRule("<V>", "meows | barks | twilllips");
	for (let i = 0; i < 100; i++) {
		let result = rg.expand();
		createP(result).style("margin", "0px");
	}
}