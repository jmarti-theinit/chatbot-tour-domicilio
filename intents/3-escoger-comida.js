const isFood = require('../lib/validator/food');
const { asList } = require('../lib/strings');
const db = require('../data/db');

exports.escogerComida = (agent) => {
  const comprarContext = agent.getContext('comprar');
  if (isFood(agent.parameters.comida, comprarContext.parameters.lugar)) {
    agent.add(`Perfecto. Vamos a comprar ${agent.parameters.comida} del lugar ${comprarContext.parameters.lugar}`);
    agent.add('¡Gracias!');
  } else {
    agent.add(`En ${comprarContext.parameters.lugar} no tienen la comida ${agent.parameters.comida}. Solo tienen: `);
    agent.add(asList(db.findMenuByRestaurante(comprarContext.parameters.lugar)));
  }
};
