const Sequelize = require('sequelize');
const db = require('./database');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/planet.png'
  }
})

module.exports = Campus
