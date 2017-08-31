$(document).ready(() => {
	$('#popup').modal();

	$(".button-collapse").sideNav({
		menuWidth: 200
	});

	$('.slider').slider({
		indicators: false
	});	

	$('.checkoff').click(() => {
		$('.bujobody').addClass('strike');
	});

	// $().dblclick(() => {
	// 	$()
	// });
})