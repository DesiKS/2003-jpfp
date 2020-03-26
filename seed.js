const { green, red } = require('chalk');
const { db, Campus, Student } = require('./server/db');

const campuses = [
  {
    name: 'Vermont Campus',
    imageUrl:
      'https://www.middlebury.edu/college/sites/www.middlebury.edu.college/files/styles/832x468/public/2019-09/standardized-tests-2-feature-16x9.jpg?fv=i_CiC_Dc&itok=nQZGomco',
    address: 'Middlebury, VT',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'New York Campus',
    imageUrl:
      'https://provost.columbia.edu/sites/default/files/styles/cu_crop/public/content/Institutional%20Research/columbia_slide_cropped.jpg?itok=4cftQWFI',
    address: 'New York, NY',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'California Campus',
    imageUrl:
      'https://www.collegeconsensus.com/wp-content/uploads/2016/12/intro_about-800x532.jpg',
    address: 'Stanford, CA',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];

const students = [
  {
    firstName: 'Ann',
    lastName: 'Green',
    email: 'agreen@projectfrog.com',
    imageUrl:
      'https://www.featurepics.com/FI/Thumb300/20161209/Asian-Chinese-Little-Student-Girl-4322400.jpg',
    gpa: 3.4,
    campusId: 1
  },
  {
    firstName: 'Andrew',
    lastName: 'Klein',
    email: 'klein@gmail.com',
    imageUrl:
      'https://media.istockphoto.com/photos/young-male-student-thinking-at-his-desk-in-chinese-classroom-picture-id156288193?k=6&m=156288193&s=612x612&w=0&h=gE18IiqEHDr2Gy7NqPJb20K6_-mC21Sjkq56xgM9bHs=',
    gpa: 3.9,
    campusId: 3
  },
  {
    firstName: 'Kyle',
    lastName: 'Verrier',
    email: 'verrier@gmail.com',
    imageUrl:
      'https://www.redapplereading.com/blog/wp-content/uploads/hispanic-boy-reading.jpg',
    gpa: 3.3,
    campusId: 3
  },
  {
    firstName: 'Aneliya',
    lastName: 'Ignatova',
    email: 'aneliya@gmail.com',
    imageUrl:
      'https://www.coding-girls.com/sites/default/files/inline-images/shutterstock_1077499349.jpg',
    gpa: 3.7
  }
];
const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    await Campus.bulkCreate(campuses);
    await Student.bulkCreate(students);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
