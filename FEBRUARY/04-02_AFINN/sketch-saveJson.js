let table;
let afinn = {};

function preload() {
	table = loadTable('data/AFINN-111.txt', 'tsv');
}

function setup() {
	noCanvas();
	for (let i = 0; i < table.getRowCount(); i++) {
		let row = table.getRow(i);
		let word = row.get(0);
		let score = row.get(1);
		afinn[word] = score;
	}
	// save(afinn, 'afinb111.json');
}