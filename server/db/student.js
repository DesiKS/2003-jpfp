const Sequelize = require('sequelize');
const db = require('./database');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://cdn.imgbin.com/16/10/12/imgbin-girl-study-skills-student-board-exam-s-girl-reading-book-illustration-Vug2u10kNqeDMngXET4U5nNuB.jpg'
  },
  gpa: {
    type: Sequelize.DECIMAL,
    validate: {
      max: 4.0,
      min: 0.0
    }
  }
});

module.exports = Student;
