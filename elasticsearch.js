const config = require('./elastic_config.json');
const {Client} = require('@elastic/elasticsearch');


var client = new Client({
  node: config.node,
  auth: {
    username: config.auth.username,
    password: config.auth.password
  },
  requestTimeout: 60000
});

module.exports = {client: client};