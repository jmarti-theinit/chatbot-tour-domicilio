const { FOODS_BY_RESTAURANT, RESTAURANTS_BY_TYPE_FOOD } = require('./db-data.js');

const baseChars = str => str.toLowerCase().replace(/[áäàÀÁÂÃÄÅ]/g, 'a')
  .replace(/[èéèÈÉÊË]/g, 'e')
  .replace(/[íìIÎ]/g, 'i')
  .replace(/[óòÓÔ]/g, 'o')
  .replace(/[úùüÙ]/g, 'u')
  .replace(/[çÇ]/g, 'c')
  .replace(/[ñÑ]/g, 'n')
  .replace(/[-\\?]/g, '');

const findRestaurantesByType = (food) => RESTAURANTS_BY_TYPE_FOOD[baseChars(food)];
const findMenuByRestaurante = (rest) => FOODS_BY_RESTAURANT[baseChars(rest)];
const existsRestaurante = (rest) => FOODS_BY_RESTAURANT[baseChars(rest)];
const existsFood = (food, lugar) => FOODS_BY_RESTAURANT[baseChars(lugar)]
  .find(f => baseChars(food) === baseChars(f));

module.exports = { findRestaurantesByType, findMenuByRestaurante, existsRestaurante, existsFood };
