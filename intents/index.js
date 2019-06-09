const { listMenu } = require('./intents/2-list-menu');
const { listRestaurantes } = require('./intents/1-list-restaurantes-por-tipo-comida');
const { escogerComida } = require('./intents/3-escoger-comida');

module.exports = {
  listMenu,
  listRestaurantes,
  escogerComida
};
