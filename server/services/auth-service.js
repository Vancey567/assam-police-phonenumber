import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}

export async function verifyPassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
