// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.aDomicilio = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  const listRestaurantes = (agent) => {
    agent.add(`Estos son los restaurantes que tengo de tipo ${agent.parameters.tipoComida}`);
    agent.add('Restaurante Paco');
    agent.add('Bar Juan');
    agent.add('Marisquería Luis');
  };

  let intentMap = new Map();
  intentMap.set('listar-restaurantes-por-tipo-comida', listRestaurantes);
  agent.handleRequest(intentMap);
});
