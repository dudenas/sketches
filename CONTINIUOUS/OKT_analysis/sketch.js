// "title": "keltininkas",

const clrs = [250, 5]
let data, font
const analysis = {
	directors: {},
	staging: {},
	artDirectors: {},
	directorAssistants: {},
	scenographers: {},
	choreographers: {},
	costumeDesigners: {},
	painters: {},
	actors: {},
	videoDesigners: {},
	videoArtists: {},
	videoProjections: {},
	videoInstallations: {},
	videoLights: {},
	videoSound: {},
	music: {},
	musicPerformers: {},
	sound: {},
	djs: {},
	light: {},
	movementConsultants: {},
	makeup: {},
	photographers: {},
	sculptors: {},
	translators: {},
	literature: {},
	technicians: {},
	other: {},
}

function preload() {
	data = loadJSON('assets/data.json', () => console.log('data loaded'), JSON)
}

function setup() {
	noCanvas()

	for (let i = 0; i < Object.keys(data).length; i++) {
		const director = data[i]['Rezisierius']
		const staging = data[i]['Inscenizacijos autorius']
		const staging2 = data[i]['Trilogijos inscenizacijos autorius']
		const artDirector = data[i]['Meno vadovas']
		const artDirector2 = data[i]['Trupės vadovė']
		const directorAssistant = data[i]['Režisieriaus asistentas']
		const directorAssistant2 = data[i]['Rež. padėjėja']
		const scenographer = data[i]['Scenografija']
		const actor = data[i]['Vaidina']
		const actor2 = data[i]['Taip pat vaidino']
		const actor3 = data[i]['Pantomimos aktoriai']
		const actor4 = data[i]['Spektaklyje nevaidina']
		const choreographer = data[i]['Choreografė']
		const choreographer2 = data[i]['Choreografai']
		const choreographer3 = data[i]['Choreografas']
		const choreographer4 = data[i]['Choreografė-asistentė']
		const costumeDesigner = data[i]['Kostiumų dailininkas']
		const painter = data[i]['Dailininkas']
		const painter2 = data[i]['Pastatiminės dalies vedėjas']
		const painter3 = data[i]['Kaukių dailininkas']
		const painter4 = data[i]['Dailininkė']
		const painter5 = data[i]['Dailininkė-asistentė']
		const videoDesigner = data[i]['Video dizaineriai']
		const videoArtist = data[i]['Video menininkas']
		const videoArtist2 = data[i]['Videomenininkas']
		const videoProjection = data[i]['Video projekcijos']
		const videoProjection2 = data[i]['Videoprojekcijų autorė']
		const videoInstallation = data[i]['Vaizdo instaliacijos']
		const videoLight = data[i]['Šviesos ir video']
		const videoLight2 = data[i]['Šviesų ir video operatorius']
		const videoSound = data[i]['Garso ir vaizdo dizaineris']
		const music = data[i]['Muzika']
		const music2 = data[i]['Garsinių konstrukcijų architektas']
		const dj = data[i]['Didžėjus']
		const musicPerformer = data[i]['Perkusininkas']
		const musicPerformer2 = data[i]['Muziką atlieka']
		const musicPerformer3 = data[i]['Dirigentas']
		const musicPerformer4 = data[i]['Dainuoja']
		const musicPerformer5 = data[i]['Šv. Kristoforo kamerinis orkestras']
		const musicPerformer6 = data[i]['Muzikuoja']
		const sound = data[i]['Garso režisierius']
		const sound2 = data[i]['Garso operatorius']
		const sound3 = data[i]['Garso dizaineris']
		const light = data[i]['Šviesų dailininkas']
		const light2 = data[i]['Šviesų operatoriai']
		const light3 = data[i]['Šviesų dizaineris']
		const light4 = data[i]['Šviesos dailininkas']
		const light5 = data[i]['Šviesų operatorius']
		const movementConsultant = data[i]['Judesio konsultantė']
		const movementConsultant2 = data[i]['Šokėjų repetitorė']
		const makeup = data[i]['Grimo meistrės']
		const photographer = data[i]['Fotografas']
		const sculptor = data[i]['Skulptorius']
		const translator = data[i]['Vertėjas']
		const translator2 = data[i]['Vertėjos']
		const literature = data[i]['Lit. dalis']
		const technician = data[i]['Technikai']
		const technician2 = data[i]['Tech. direktorius']

		const other = data[i]['Rekvizitininkė']
		const other2 = data[i]['Rekvizitininkė-kostiumininkė']

		addToAnalysis(analysis['directors'], director)
		addToAnalysis(analysis['staging'], staging)
		addToAnalysis(analysis['staging'], staging2)
		addToAnalysis(analysis['artDirectors'], artDirector)
		addToAnalysis(analysis['artDirectors'], artDirector2)
		addToAnalysis(analysis['directorAssistants'], directorAssistant)
		addToAnalysis(analysis['directorAssistants'], directorAssistant2)
		addToAnalysis(analysis['actors'], actor)
		addToAnalysis(analysis['actors'], actor2)
		addToAnalysis(analysis['actors'], actor3)
		addToAnalysis(analysis['actors'], actor4)
		addToAnalysis(analysis['choreographers'], choreographer)
		addToAnalysis(analysis['choreographers'], choreographer2)
		addToAnalysis(analysis['choreographers'], choreographer3)
		addToAnalysis(analysis['choreographers'], choreographer4)
		addToAnalysis(analysis['scenographers'], scenographer)
		addToAnalysis(analysis['costumeDesigners'], costumeDesigner)
		addToAnalysis(analysis['painters'], painter)
		addToAnalysis(analysis['painters'], painter2)
		addToAnalysis(analysis['painters'], painter3)
		addToAnalysis(analysis['painters'], painter4)
		addToAnalysis(analysis['painters'], painter5)
		addToAnalysis(analysis['videoDesigners'], videoDesigner)
		addToAnalysis(analysis['videoArtists'], videoArtist)
		addToAnalysis(analysis['videoArtists'], videoArtist2)
		addToAnalysis(analysis['videoProjections'], videoProjection)
		addToAnalysis(analysis['videoProjections'], videoProjection2)
		addToAnalysis(analysis['videoInstallations'], videoInstallation)
		addToAnalysis(analysis['videoSound'], videoSound)
		addToAnalysis(analysis['music'], music)
		addToAnalysis(analysis['music'], music2)
		addToAnalysis(analysis['musicPerformers'], musicPerformer)
		addToAnalysis(analysis['musicPerformers'], musicPerformer2)
		addToAnalysis(analysis['musicPerformers'], musicPerformer3)
		addToAnalysis(analysis['musicPerformers'], musicPerformer4)
		addToAnalysis(analysis['musicPerformers'], musicPerformer5)
		addToAnalysis(analysis['musicPerformers'], musicPerformer6)
		addToAnalysis(analysis['djs'], dj)
		addToAnalysis(analysis['sound'], sound)
		addToAnalysis(analysis['sound'], sound2)
		addToAnalysis(analysis['sound'], sound3)
		addToAnalysis(analysis['light'], light)
		addToAnalysis(analysis['light'], light2)
		addToAnalysis(analysis['light'], light3)
		addToAnalysis(analysis['light'], light4)
		addToAnalysis(analysis['light'], light5)
		addToAnalysis(analysis['videoLights'], videoLight)
		addToAnalysis(analysis['videoLights'], videoLight2)
		addToAnalysis(analysis['movementConsultants'], movementConsultant)
		addToAnalysis(analysis['movementConsultants'], movementConsultant2)
		addToAnalysis(analysis['makeup'], makeup)
		addToAnalysis(analysis['photographers'], photographer)
		addToAnalysis(analysis['sculptors'], sculptor)
		addToAnalysis(analysis['translators'], translator)
		addToAnalysis(analysis['translators'], translator2)
		addToAnalysis(analysis['literature'], literature)
		addToAnalysis(analysis['technicians'], technician)
		addToAnalysis(analysis['technicians'], technician2)
		addToAnalysis(analysis['other'], other)
		addToAnalysis(analysis['other'], other2)
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

function addToAnalysis(title, elm) {
	if (elm != undefined) {
		if (elm.length > 1 && title != analysis['directors']) {
			for (let j = 0; j < elm.length; j++) {
				if (title[elm[j]]) title[elm[j]]++
				else title[elm[j]] = 1
			}
		} else {
			if (title[elm]) title[elm]++
			else title[elm] = 1
		}
	}
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