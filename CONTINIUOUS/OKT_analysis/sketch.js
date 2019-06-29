const clrs = [250, 5]
let data, font
const analysis = {
	directors: {},
	scenographer: {}
}

function preload() {
	data = loadJSON('assets/data.json', () => console.log('data loaded'), JSON)
}

function setup() {
	noCanvas()

	for (let i = 0; i < Object.keys(data).length; i++) {
		const director = data[i]['Rezisierius']
		if (analysis['directors'][director]) analysis['directors'][director]++
		else analysis['directors'][director] = 1
	}


	for (var elm in analysis) {
		if (analysis.hasOwnProperty(elm)) {
			$("body").append(createDOMelm(elm, 'h1', 'title'))
			Object.entries(analysis[elm]).forEach(([key, value]) => {
				$("body").append(
					createDOMelm(key, 'div', 'key'),
					createDOMelm(value, 'div')
				)
			})
		}
	}
	noLoop()
}

function createDOMelm(attr, type, name) {
	let el = document.createElement(type)
	if (name == 'title') {
		el.classList.add("title")
	} else if (name == 'key') {
		el.classList.add("key")
	}
	el.appendChild(document.createTextNode(attr))
	return el
}