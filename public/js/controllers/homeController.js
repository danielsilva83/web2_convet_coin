
function HomeController()
{
// vincular ouvintes de evento a cliques de botão //
	var that = this;

// lidar com o logout do usuário // btn-Config
	$('#btn-logout').click(function(){ that.attemptLogout(); });
// lidar com a configuração do usuário // 
	$('#btn-config').click(function(){ that.config(); });

	this.config = function()
	{
		var that = this;
		$.ajax({
			url: '/painel',
			type: 'POST',
			success: function(data){
	 			that.showLockedAlert('Entrou em config');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: '/logout',
			type: 'POST',
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('Você está desconectado. <br> Redirecionando você de volta para a página inicial.');
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
