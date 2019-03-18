const { asList } = require('./lib/strings');
const isRestaurant = require('./lib/validator/restaurant');
const isFood = require('./lib/validator/food');
const db = require('./data/db');
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.aDomicilio = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  const listRestaurantes = (agent) => {
    agent.add(`Estos son los restaurantes que tengo de tipo ${agent.parameters.tipoComida}: `);
    agent.add(asList(db.findRestaurantesByType(agent.parameters.tipoComida)));
  };

  const listMenu = (agent) => {
    if (isRestaurant(agent.parameters.lugar)) {
      agent.setContext({ name: 'comprar', lifespan: 3, parameters: { lugar: agent.parameters.lugar }});
      agent.add(`Esto es lo que puedes comprar en el lugar ${agent.parameters.lugar}: `);
      agent.add(asList(db.findMenuByRestaurante(agent.parameters.lugar)));
    } else {
      agent.add(`No he localizado el lugar ${agent.parameters.lugar}.`);
      agent.add('Pide algo por tipo de comida si quieres saber qué restaurantes hay');
    }
  };

  const escogerComida = (agent) => {
    const comprarContext = agent.getContext('comprar');
    if (isFood(agent.parameters.comida, comprarContext.parameters.lugar)) {
      agent.add(`Perfecto. Vamos a comprar ${agent.parameters.comida} del lugar ${comprarContext.parameters.lugar}`);
      agent.add('¡Gracias!');
    } else {
      agent.add(`En ${comprarContext.parameters.lugar} no tienen la comida ${agent.parameters.comida}. Solo tienen: `);
      agent.add(asList(db.findMenuByRestaurante(comprarContext.parameters.lugar)));
    }
  };

  console.log('go!');
  let intentMap = new Map();
  intentMap.set('listar-restaurantes-por-tipo-comida', listRestaurantes);
  intentMap.set('listar-menu', listMenu);
  intentMap.set('escoger-comida', escogerComida);
  agent.handleRequest(intentMap);
});
