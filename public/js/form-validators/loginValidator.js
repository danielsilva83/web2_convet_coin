
function LoginValidator()
{
//alerta simples  para exibir quaisquer erros//
	this.loginErrors = $('.modal-alert');
	
	this.showLoginError = function(t, m)
	{
		$('.modal-alert .modal-header h4').text(t);
		$('.modal-alert .modal-body').html(m);
		this.loginErrors.modal('show');
	}
}

LoginValidator.prototype.validateForm = function()
{
	if ($('#user-tf').val() == ''){
		this.showLoginError('Ops!', 'Por favor insira um nome de usuário válido');
		return false;
	}	else if ($('#pass-tf').val() == ''){
		this.showLoginError('Ops!', 'por favor coloque uma senha válida');
		return false;
	}	else{
		return true;
	}
}