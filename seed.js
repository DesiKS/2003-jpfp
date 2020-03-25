const { green, red } = require("chalk");
const { db, Campus, Student } = require("./server/db");

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    await Campus.bulkCreate([
      { name: "Mars Academy", address: "123 Planet Drive" },
      { name: "Earth School", address: "456 Planet Lane" },
      { name: "Venus Conservatory", address: "789 Planet Blvd" }
    ]);

    await Student.bulkCreate([
      {
        firstName: "Mae",
        lastName: "Jemison",
        email: "mae.jemison@nasa.gov"
      },
      {
        firstName: "Sally",
        lastName: "Ride",
        email: "sally.ride@nasa.gov"
      },
      {
        firstName: "Mary",
        lastName: "Shelley",
        email: "mary.shelly@itsfrankentime.tumblr.com"
      },
      {
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@analyticalengine.com"
      }
    ]);
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
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
