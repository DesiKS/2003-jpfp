const Sequelize = require("sequelize");
const db = require("./database");

const Student = db.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "/images/student.png"
  },
  gpa: {
    type: Sequelize.FLOAT,
    validate: { min: 0, max: 4}
  },
});

module.exports = Student;
