// Inspired by brand.uber.com
$(document).ready(function () {
	console.log('ready')
	setTimeout(function () {
		$("h3").addClass("slide-in")
	}, 500);
	setInterval(function () {
		$("h3").toggleClass("slide-in");
	}, 1000)
});