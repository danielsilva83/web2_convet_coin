
function SignupController()
{
// redirecionar para a página inicial quando o botão Cancelar for clicado//
	$('#account-form-btn1').click(function(){ window.location.href = '/';});

// redirecionar para a página inicial na criação de uma nova conta, adicionar um pequeno atraso para que o usuário possa ler a janela de alerta //
	$('.modal-alert #ok').click(function(){ setTimeout(function(){window.location.href = '/';}, 300)});
}