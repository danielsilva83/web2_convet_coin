
function LoginController()
{
// vincular ouvintes de evento a cliques de botão //
	$('#retrieve-password-submit').click(function(){ $('#get-credentials-form').submit();});
	$('#login #forgot-password').click(function(){ 
		$('#cancel').html('Cancel');
		$('#retrieve-password-submit').show();
		$('#get-credentials').modal('show');
	});
	$('#login .button-rememember-me').click(function(e) {
		var span = $(this).find('span');
		if (span.hasClass('glyphicon-unchecked')){
			span.addClass('glyphicon-ok');
			span.removeClass('glyphicon-unchecked');
		}	else{
			span.removeClass('glyphicon-ok');
			span.addClass('glyphicon-unchecked');
		}
	});

// alterna automaticamente o foco entre a janela modal de e-mail e o formulário de login //
	$('#get-credentials').on('shown.bs.modal', function(){ $('#email-tf').focus(); });
	$('#get-credentials').on('hidden.bs.modal', function(){ $('#user-tf').focus(); });
}