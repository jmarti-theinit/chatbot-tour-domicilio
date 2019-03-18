const { existsRestaurante } = require('../../data/db');

const isRestaurant = (restaurant) => existsRestaurante(restaurant);

module.exports = isRestaurant;
