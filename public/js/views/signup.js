
$(document).ready(function(){
	
	var av = new AccountValidator();
	var sc = new SignupController();
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
				av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
				av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();
	
// formulário de inscrição da conta //
	
	$('#account-form h2').text('Inscrever-se');
	$('#account-form #sub').text('Por favor conte-nos um pouco sobre você');
	$('#account-form-btn1').html('Cancelar');
	$('#account-form-btn2').html('Enviar');
	$('#account-form-btn2').addClass('btn-primary');
	
//  alerta que é exibido quando uma conta é criada com sucesso //

	$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h4').text('Conta Criada!');
	$('.modal-alert .modal-body p').html('Sua conta foi criada. </br> Clique em OK para retornar à página de login.');

});