$(document).ready(() => {
	$('#popup').modal();

	$('select').material_select();

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