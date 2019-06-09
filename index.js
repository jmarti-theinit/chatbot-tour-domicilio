const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const { listRestaurantes, listMenu, escogerComida } = require('./intents');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.aDomicilio = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  let intentMap = new Map();
  intentMap.set('listar-restaurantes-por-tipo-comida', listRestaurantes);
  intentMap.set('listar-menu', listMenu);
  intentMap.set('escoger-comida', escogerComida);
  agent.handleRequest(intentMap);
});
