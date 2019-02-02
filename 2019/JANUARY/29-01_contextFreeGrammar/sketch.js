// rules
var rules = {
	"S": [
		["NP", "VP"],
		["Interj", "NP", "VP"]
	],
	"NP": [
		["Det", "N"],
		["Det", "N", "that", "VP"],
		["Det", "Adj", "N"]
	],
	"VP": [
		["Vtrans", "NP"],
		["Vintr"]
	],
	"Interj": [
		["oh"],
		["my"],
		["wow"],
		["darn"]
	],
	"Det": [
		["this"],
		["that"],
		["the"]
	],
	"N": [
		["amoeba"],
		["dichotomy"],
		["seagull"],
		["trombone"],
		["overstaffed"],
		["corsage"]
	],
	"Adj": [
		["bald"],
		["smug"],
		["important"],
		["tame"],
		["overstaffed"],
		["corsage"]
	],
	"Vtrans": [
		["computes"],
		["examines"],
		["foregrounds"],
	],
	"Vintr": [
		["coughs"],
		["daydreams"],
		["whines"],
	]
};

let txt;

function setup() {
	noCanvas();
	let button = createButton('generate');
	txt = createSpan('');
	button.mousePressed(cfg)
}

function cfg() {
	// remove the last txt
	txt.remove();
	txt = createSpan('');
	// create ten examples
	for (let i = 0; i < 10; i++) {
		let start = "S";
		let expansion = [];
		let result = expand(start, expansion);
		// create and style
		createP(result).style('font-size', '18px').style('margin', '50px').parent(txt);
	}
}

function expand(start, expansion) {
	// if rule exist pick random and recursively go further
	if (rules[start]) {
		let pick = random(rules[start]);
		pick.forEach(elm => expand(elm, expansion));
	}
	// else add start as the first rule
	else {
		expansion.push(start);
	}
	// return result joined
	return expansion.join(' ');
}