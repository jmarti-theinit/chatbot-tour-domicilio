const { existsFood } = require('../../data/db');

const isFood = (food, restaurante) => existsFood(food, restaurante);

module.exports = isFood;
