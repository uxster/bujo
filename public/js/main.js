$(document).ready(() => {
	$('select').material_select();

	$(".button-collapse").sideNav({
		menuWidth: 200
	});

	// $('.checkoff').click(() => {
	// 	$('.bujobody').addClass('strike');
	// });

	$('#btn').on('click', () => {
		if(document.loginform.email.value == "") {
			alert( "Please provide your email!");
			document.loginform.email.focus() ;
			return false;
		} 
		else if(document.loginform.password.value == "") {
			alert( "Please provide your password!");
			document.loginform.password.focus() ;
			return false;
		}
		else if(document.registerform.firstname.value == "") {
			alert("Please provide your firstname!");
			document.registerform.firstname.focus();
			return false;
		} 
		else if(document.registerform.lastname.value == "") {
			alert("Please provide your lastname!");
			document.registerform.lastname.focus();
			return false;
		}
		else if(document.registerform.email.value == "") {
			alert("Please provide your email!");
			document.registerform.email.focus();
			return false;
		}
		else if(document.registerform.username.value == "") {
			alert("Please provide your username!");
			document.registerform.email.focus();
			return false;
		}
		else if(document.registerform.password.value == "") {
			alert("Please provide your password!");
			document.registerform.password.focus();
			return false;
		}
		else if(document.registerform.password.value.length < 8) {
			alert("Password should at least contain 8 characters!");
			document.registerform.password.focus();
			return false;
		}
		else if(document.registerform.confirmpassword.value !== document.registerform.password.value) {
			alert("Please put in matching passwords!");
			document.registerform.password.focus();
			return false;
		}
	});
})