const Sequelize = require('sequelize');
const db = require('./database');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.middlebury.edu/college/sites/www.middlebury.edu.college/files/styles/832x468/public/2019-08/visit-feature-16x9_0.jpg?fv=GXVbXZKU&itok=7Zp_N3pP'
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Campus;
