const { listString } = require('./lib/strings');
const { FOODS, RESTAURANTS } = require('./data/db');
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.aDomicilio = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  const listRestaurantes = (agent) => {
    agent.add(`Estos son los restaurantes que tengo de tipo ${agent.parameters.tipoComida}: `);
    agent.add(listString(RESTAURANTS[agent.parameters.tipoComida]));
  };

  const listMenu = (agent) => {
    agent.setContext({ name: 'comprar', lifespan: 3, parameters: { lugar: agent.parameters.lugar }});
    agent.add(`Esto es lo que puedes comprar en el lugar ${agent.parameters.lugar}: `);
    agent.add(listString(FOODS[agent.parameters.lugar]));

  };

  const escogerComida = (agent) => {
    agent.add(`Perfecto. Vamos a comprar ${agent.parameters.comida} del lugar ${agent.parameters.lugar}`)
    agent.add('¡Gracias!');
  };

  let intentMap = new Map();
  intentMap.set('listar-restaurantes-por-tipo-comida', listRestaurantes);
  intentMap.set('listar-menu', listMenu);
  intentMap.set('escoger-comida', escogerComida);
  agent.handleRequest(intentMap);
});
