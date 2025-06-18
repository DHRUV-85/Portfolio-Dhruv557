const bcrypt = require("bcryptjs");

const hashed = "$2b$10$BgYfhrFK56DWHFjLe7AjFuFN2kZTNMzKcvgksJnKQ0KmYX.Ngjw7i";

bcrypt.compare("Dhruv557$$##", hashed, (err, result) => {
  if (result) {
    console.log("Password is correct!");
  } else {
    console.log("Incorrect password.");
  }
});