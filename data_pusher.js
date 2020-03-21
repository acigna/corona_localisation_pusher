function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


const {client} = require('./elasticsearch');
const {connection} = require('./autobahn');
const elasticsearch_config = require('./elastic_config.json');
const moment = require('moment');

var launchCreateIndexPromise = new Promise(function ( resolve, reject ) {
  console.log('Create or Get Elastic Search Index.');
  client.indices.create({
    index: elasticsearch_config.index,
    body: {
      mappings: elasticsearch_config.mappings
    }
  }).then(function () {
  	resolve();
  }, function () {
  	resolve();
  });
});


launchCreateIndexPromise.then(function (){
	connection.open();

	connection.onopen = function ( session ) {
		session.subscribe("new_position", function ( data ) {
      //Show it as ann error to be visible in the console
			console.error( data[0] );
			var position_data = data[0];
			client.create({id: uuidv4(), index: elasticsearch_config.index, body: { position: {lat: position_data.latitude, lon: position_data.longitude}, infected: false, time: moment().format(), identity: position_data.identity}})
			.then(function ( ){  console.log('success');}, function ( e ) {
				console.error( JSON.stringify(e) );
			});
		});
	}

});


