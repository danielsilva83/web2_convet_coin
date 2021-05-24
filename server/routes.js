
const accounts = require('./model/accounts');
const coin = require('./model/coin');
const emailjs = require('./utils/emailjs');
const countries = require('./json/countries');

module.exports = function(app) {

/*
	login & logout
*/

	app.get('/', function(req, res){
	//verifique se o usuário possui uma chave de login automático salva em um cookie//
		if (req.cookies.login == undefined){
			res.render('login', { title: 'Olá - Faça login na sua conta ' });
		}	else{
	// tentativa de login automático //
			accounts.validateLoginKey(req.cookies.login, req.ip, function(e, o){
				if (o){
					accounts.autoLogin(o.user, o.pass, function(o){
						req.session.user = o;
						res.redirect('/home');
					});
				}	else{
					res.render('login', { title: 'Olá - Faça login na sua conta' });
				}
			});
		}
	});

	app.post('/', function(req, res){
		accounts.manualLogin(req.body['user'], req.body['pass'], function(e, o){
			if (!o){
				res.status(400).send(e);
			}	else{
				req.session.user = o;
				if (req.body['remember-me'] == 'false'){
					res.status(200).send(o);
				}	else{
					accounts.generateLoginKey(o.user, req.ip, function(key){
						res.cookie('login', key, { maxAge: 900000 });
						res.status(200).send(o);
					});
				}
			}
		});
	});

	app.post('/logout', function(req, res){
		res.clearCookie('login');
		req.session.destroy(function(e){ res.status(200).send('ok'); });
	})

/*
	Painel de controle
*/

	app.get('/painel', function(req, res) {
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			res.render('painel', {
				title : 'Painel de controle',
				countries : countries,
				udata : req.session.user
			});
		}
	});

	app.post('/painel', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			accounts.updateAccount({
				id		: req.session.user._id,
				name	: req.body['name'],
				email	: req.body['email'],
				pass	: req.body['pass'],
				country	: req.body['country']
			}, function(e, o){
				if (e){
					res.status(400).send('error-updating-account');
				}	else{
					req.session.user = o.value;
					res.status(200).send('ok');
				}
			});
		}
	});

/*
	nova conta
*/

	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Signup', countries : countries });
	});

	app.post('/signup', function(req, res){
		accounts.addNewAccount({
			name 	: req.body['name'],
			email 	: req.body['email'],
			user 	: req.body['user'],
			pass	: req.body['pass'],
			country : req.body['country']
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
	});

/*
	reset senha
*/

	app.post('/lost-password', function(req, res){
		let email = req.body['email'];
		accounts.generatePasswordKey(email, req.ip, function(e, account){
			if (e){
				res.status(404).send(e);
			}	else{
				emailjs.dispatchResetPasswordLink(account, function(e){
			// TODO este retorno de chamada leva um momento para retornar, adicione um carregador para fornecer feedback ao usuário //
					if (!e){
						res.status(200).send('ok');
					}	else{
						log(e);
						res.status(500).send('não foi possível redefinir a senha');
					}
				});
			}
		});
	});

	app.get('/reset-password', function(req, res) {
		accounts.validatePasswordKey(req.query['key'], req.ip, function(e, o){
			if (e || o == null){
				res.redirect('/');
			} else{
				req.session.passKey = req.query['key'];
				res.render('reset', { title : 'Reset senha' });
			}
		})
	});

	app.post('/reset-password', function(req, res) {
		let newPass = req.body['pass'];
		let passKey = req.session.passKey;
	//destruir a sessão imediatamente após recuperar a senha armazenada //
		req.session.destroy();
		accounts.updatePassword(passKey, newPass, function(e, o){
			if (o){
				res.status(200).send('ok');
			}	else{
				res.status(400).send('não foi possível atualizar a senha');
			}
		})
	});

/*
	deletar e resetar contas
*/

	app.get('/print', function(req, res) {
		accounts.getAllRecords( function(e, accounts){
			res.render('print', { title : 'Lista de contas', accts : accounts });
		})
	});

	app.post('/delete', function(req, res){
		accounts.deleteAccount(req.session.user._id, function(e, obj){
			if (!e){
				res.clearCookie('login');
				req.session.destroy(function(e){ res.status(200).send('ok'); });
			}	else{
				res.status(400).send('registro não encontrado');
			}
		});
	});

	app.get('/reset', function(req, res) {
		accounts.deleteAllAccounts(function(){
			res.redirect('/print');
		});
	});

	app.get('*', function(req, res) { res.render('404', { title: 'Página não encontrada'}); });

	/*
	nova moeda
*/

app.get('/coin', function(req, res) {
	coin.getAllRecords( function(e, name_coin){
		res.render('coin', { title : 'Nova Moeda', name_coin : name_coin });
	})
});

app.post('/coin', function(req, res){
	coin.addNewAccount({
		name_coin 	: req.body['name_coin'],
		price 		: req.body['price'],
		date_price 	: req.body['date_price'],
		country 	: req.body['country']
	}, function(e){
		if (e){
			res.status(400).send(e);
		}	else{
			res.status(200).send('ok');
		}
	});
});
};


