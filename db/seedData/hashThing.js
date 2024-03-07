const bcrypt = require("bcrypt");

const hashThing = async (thing) => {
  const saltRounds = 10;
  const hashedThing = await bcrypt.hash(thing, saltRounds);
  return hashedThing;
}

module.exports = hashThing;
