$(document).ready(() => {
	$('select').material_select();

	$(".button-collapse").sideNav({
		menuWidth: 200
	});
	
	$('#btn').on('click', () => {
		if(document.registerform.password.value.length < 8) {
			alert("Password should at least contain 8 characters!");
			document.registerform.password.focus();
			return false;
		}
		else if(document.registerform.confirmpassword.value !== document.registerform.password.value) {
			alert("Please put in matching passwords!");
			document.registerform.confirmpassword.focus();
			return false;
		}
	});
})