const moment 		= require('moment');

let coin = undefined;
module.exports.init = function(db){
	coin = db.collection('coin');
// campos de índice 'usuário' e 'e-mail' para uma validação de conta mais rápida //
	coin.createIndex({name_coin: 1});
}

/*
	métodos de inserção, atualização e exclusão de registro
*/

module.exports.addNewCoin = function(newData, callback)
{
	coin.findOne({coin:newData.coin}, function(e, o) {
		if (o){
			callback('coinname-taken');
		}	else{
			coin.findOne({name_coin:newData.name_coin}, function(e, o) {
				if (o){
					callback('name_coin-taken');
				}	else{
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
					// acrescentar carimbo de data quando o registro foi criado//
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						coin.insertOne(newData, callback);
					});
				}
			});
		}
	});
}

module.exports.updateCoin = function(newData, callback)
{
	let findOneAndUpdate = function(data){
		var o = {
			name_coin : data.name_coin,
			country : data.country,
            price : data.price,
            date_price : data.date_price
		}
		if (data.pass) o.pass = data.pass;
		coin.findOneAndUpdate({_id:getObjectId(data.id)}, {$set:o}, {returnOriginal : false}, callback);
	}
	if (newData.pass == ''){
		findOneAndUpdate(newData);
	}	else {
		saltAndHash(newData.pass, function(hash){
			newData.pass = hash;
			findOneAndUpdate(newData);
		});
	}
}

module.exports.updateCoin = function(name_coin, newCoin, callback)
{
	saltAndHash(newCoin, function(hash){
		newCoin = hash;
		coin.findOneAndUpdate({name_coin:name_coin}, {$set:{name_coin:newCoin}, $unset:{name_coin:''}}, {returnOriginal : false}, callback);
	});
}

/*
métodos de pesquisa de Moeda
*/

module.exports.getAllRecords = function(callback)
{
	coin.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

module.exports.deleteCoin = function(id, callback)
{
	coin.deleteOne({_id: getObjectId(id)}, callback);
}

module.exports.deleteAllcoin = function(callback)
{
	coin.deleteMany({}, () => { if (callback) callback(); });
}



var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}


