const bcrypt = require('bcrypt');

// Hash and salt a password before storing it in the database
module.exports.hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Verify a password during login
module.exports.verifyPassword = async (inputPassword, hashedPassword) => {
  try {
    const passwordMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return passwordMatch;
  } catch (error) {
    throw error;
  }
};


