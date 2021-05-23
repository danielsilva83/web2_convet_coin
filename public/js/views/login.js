
$(document).ready(function(){

	var lv = new LoginValidator();
	var lc = new LoginController();

// formulário de login principal //

	$('#login').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{
			//  opção 'lembrar-me' ao formData//
				formData.push({name:'remember-me', value:$('#btn_remember').find('span').hasClass('fa-check-square')});
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
			lv.showLoginError('Falha de login', 'Por favor, verifique o seu nome de usuário e / ou senha');
		}
	});

	$("input:text:visible:first").focus();
	$('#btn_remember').click(function(){
		var span = $(this).find('span');
		if (span.hasClass('fa-minus-square')){
			span.removeClass('fa-minus-square');
			span.addClass('fa-check-square');
		}	else{
			span.addClass('fa-minus-square');
			span.removeClass('fa-check-square');
		}
	});

//formulário de recuperação de login por e-mail //

	var ev = new EmailValidator();

	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("Por favor insira um endereço de e-mail válido");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			$('#cancel').html('OK');
			$('#retrieve-password-submit').hide();
			ev.showEmailSuccess("Um link para redefinir sua senha foi enviado a você.");
		},
		error : function(e){
			if (e.responseText == 'Conta não encontrada'){
				ev.showEmailAlert("Email não encontrado. Tem certeza de que digitou corretamente?");
			}	else{
				$('#cancel').html('OK');
				$('#retrieve-password-submit').hide();
				ev.showEmailAlert("Desculpe. Ocorreu um problema, tente novamente mais tarde.");
			}
		}
	});

});
