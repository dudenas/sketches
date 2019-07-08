const ctx = document.getElementById('myChart').getContext('2d');
let dt = [0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6]

function setup() {
	createCanvas(540, 540).parent('myChart')
}

function draw() {
	background(5);
	ellipse(width / 2, height / 2, 100, 100)
}

const myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		datasets: [{
			data: dt,
		}]
	},
	options: {
		elements: {
			line: {
				backgroundColor: 'rgba(5, 5, 5, 0)',
				borderColor: 'rgba(5, 5, 5, 1)',
				borderWidth: 2
			},
			point: {
				backgroundColor: "rgba(0,0,0,1)",
				borderColor: "rgba(0,0,0,0)",
				borderWidth: 0,
				hitRadius: 20,
				hoverBorderWidth: 0,
				pointStyle: "circle",
				radius: [3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3]
			}
		},
		legend: false,
		scales: {
			// Y AXES
			yAxes: [{
				// afterTickToLabelConversion: function (elm) {
				// 	// console.log(elm)
				// },
				gridLines: {
					drawBorder: false,
					drawOnChartArea: false,
					tickMarkLength: 10,
					color: '#333',
					lineWidth: 1
				},
				ticks: {
					callback: function (value, index) {
						console.log(value, index)
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
					color: '#333',
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

console.log(myChart)