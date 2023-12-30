const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}
async function checkPassword(password, hashedPassword) {
  try {
    const matching = await bcrypt.compare(password, hashedPassword);
    console.log('matchihg' + matching);
    return matching;
  } catch (error) {
    throw error;
  }
}

// Export the functions as a module
module.exports = { hashPassword, checkPassword };
