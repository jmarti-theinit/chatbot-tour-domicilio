const { asList } = require('../lib/strings');
const db = require('./data/db');

exports.listRestaurantes = (agent) => {
  agent.add(`Estos son los restaurantes que tengo de tipo ${agent.parameters.tipoComida}: `);
  agent.add(asList(db.findRestaurantesByType(agent.parameters.tipoComida)));
};
