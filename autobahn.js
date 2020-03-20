const autobahn = require('autobahn');
const autobahn_config = require('./autobahn_config.json');


var connection = new autobahn.Connection({
 	url: autobahn_config.ws_url,
 	 realm: autobahn_config.realm
});

module.exports = {connection: connection};


