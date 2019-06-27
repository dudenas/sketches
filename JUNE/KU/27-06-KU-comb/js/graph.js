const ctx = document.getElementById('myChart').getContext('2d');
let data_graph = new Array(25)
const graphClrs = ['rgba(0,0,0,1)', 'rgba(255,255,255,1)']

//—————————————————————————————————————————————————————— config chart
const config = {
	type: 'line',
	data: {
		labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		datasets: [{
			data: data_graph,
		}]
	},
	options: {
		//—————————————————————————————————————————————————————— TOOLTIP
		tooltips: {
			bodyFontStyle: 'normal',
			bodyFontSize: 12,
			bodyFontColor: graphClrs[0],
			backgroundColor: graphClrs[1],
			yPadding: 12,
			xPadding: 10,
			displayColors: false,
			callbacks: {
				title: () => {
					return null;
				},
				label: (elm, data) => {
					let index = elm.index
					let hour = data.labels[index]
					let value = data.datasets[0].data[index]

					return `${hour} h ${value} m`
				}
			}
		},
		legend: false,
		//—————————————————————————————————————————————————————— ELEMENTS
		elements: {
			//—————————————————————————————————————————————————————— LINE
			line: {
				backgroundColor: 'rgba(0, 0, 0, 0)',
				borderColor: graphClrs[1],
				borderWidth: 1,
			},
			//—————————————————————————————————————————————————————— POINT
			point: {
				backgroundColor: graphClrs[1],
				borderColor: "rgba(0,0,0,0)",
				borderWidth: 0,
				hitRadius: 20,
				hoverBorderWidth: 0,
				pointStyle: "circle",
				radius: [3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3]
			}
		},

		scales: {
			//—————————————————————————————————————————————————————— Y AXES
			yAxes: [{
				gridLines: {
					drawBorder: false,
					drawOnChartArea: false,
					color: graphClrs[1],
					lineWidth: 1
				},
				ticks: {
					callback: (value, index) => {
						if (value === 0) {
							return;
						} else if (index % 2 === 0) {
							return value;
						} else {
							return '';
						}
					},
					max: 3,
					min: 0,
					padding: 20,
					fontColor: graphClrs[1]
				},
			}],

			//—————————————————————————————————————————————————————— X AXES
			xAxes: [{
				height: 10,
				gridLines: {
					drawBorder: false,
					drawOnChartArea: false,
					tickMarkLength: 10,
					color: graphClrs[1],
					lineWidth: 1
				},
				ticks: {
					callback: (value, index) => {
						if (index === 0) {
							return '';
						} else if (index % 6 === 0) {
							return value;
						} else {
							return '';
						}
					},
					stepSize: 1,
					maxRotation: 0,
					padding: 20,
					fontColor: graphClrs[1]
				},
			}]
		}
	}
}

//—————————————————————————————————————————————————————— init chart
let chart = new Chart(ctx, config);