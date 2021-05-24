
const MongoClient = require('mongodb').MongoClient;

module.exports = function(app) {
									
	MongoClient.connect(app.get('mongodb+srv://master:30195dgsDGS@cluster0.b4kn6.mongodb.net/test?authSource=admin&replicaSet=atlas-k4hqhq-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'),
	 {useNewUrlParser: true, useUnifiedTopology: true}, function(e, client) {
		if (e){
			console.log(e);
		}	else{
			const db = client.db(app.get('coin'));
		//  coleções de banco de dados //
			require('./accounts').init(db);
			log('mongo :: connected to database :: "'+app.get('coin')+'"');
			require('./coin').init(db);
			log('mongo :: connected to database :: "'+app.get('coin')+'"');
		}
	});
}