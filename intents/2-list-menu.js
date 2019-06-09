const isRestaurant = require('../lib/validator/restaurant');
const { asList } = require('../lib/strings');
const db = require('../data/db');

exports.listMenu = (agent) => {
  if (isRestaurant(agent.parameters.lugar)) {
    agent.setContext({ name: 'comprar', lifespan: 3, parameters: { lugar: agent.parameters.lugar }});
    agent.add(`Esto es lo que puedes comprar en el lugar ${agent.parameters.lugar}: `);
    agent.add(asList(db.findMenuByRestaurante(agent.parameters.lugar)));
  } else {
    agent.add(`No he localizado el lugar ${agent.parameters.lugar}.`);
    agent.add('Pide algo por tipo de comida si quieres saber qué restaurantes hay');
  }
};
