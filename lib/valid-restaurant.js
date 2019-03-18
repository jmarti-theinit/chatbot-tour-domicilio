const { FOODS } = require('../data/db');
const { baseChars } = require('./strings');

const validRestaurant = (restaurant) =>
  FOODS[baseChars(restaurant)] ? true : false;

module.exports = validRestaurant;
