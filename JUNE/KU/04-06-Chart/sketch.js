const ctx = document.getElementById('myChart').getContext('2d');
let dt = [0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
const graphClrs = ['rgba(255,255,255,1)', 'rgba(0,0,0,1)']

const myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		datasets: [{
			data: dt,
		}]
	},
	options: {
		// TOOLTIP
		tooltips: {
			// mode: 'single',
			bodyFontStyle: 'normal',
			bodyFontSize: 12,
			bodyFontColor: graphClrs[1],
			backgroundColor: graphClrs[0],
			yPadding: 12,
			xPadding: 10,
			displayColors: false,
			callbacks: {
				title: function (tooltipItem, d) {
					return null;
				},
				label: (data, d) => {
					let index = data.index
					let hour = d.labels[index]
					let value = d.datasets[0].data[index]

					return `${hour} h ${value} m`
				}
			}
		},
		legend: false,
		// ELEMENTS
		elements: {
			// LINE
			line: {
				backgroundColor: 'rgba(0, 0, 0, 0)',
				borderColor: graphClrs[1],
				borderWidth: 2
			},
			// POINT
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
			// Y AXES
			yAxes: [{
				gridLines: {
					drawBorder: false,
					drawOnChartArea: false,
					tickMarkLength: 10,
					color: graphClrs[1],
					lineWidth: 1
				},
				ticks: {
					callback: function (value, index) {
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
					padding: 10,
				},
			}],

			// X AXES
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
					callback: function (value, index) {
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
					padding: 10,
				},
			}]
		}
	}
});

// console.log(myChart)