function CoinController()
{
// vincular ouvintes de evento a cliques de botão //
	var that = this;

// lidar com o logout do usuário //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// confirmação d deleção Coin //
	$('#coin-form-btn1').click(function(){$('.modal-confirm').modal('show')});

// lidar com exclusão de Coin //
	$('.modal-confirm .submit').click(function(){ that.deleteCoin(); });

	this.deleteCoin = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete',
			type: 'POST',
			success: function(data){
	 			that.showLockedAlert('A moeda foi excluída. <br> Redirecionando você de volta para a página inicial');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}



	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h4').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);
	}
}

HomeController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('Success!');
	$('.modal-alert .modal-body p').html('A Moeda foi atualizada.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
