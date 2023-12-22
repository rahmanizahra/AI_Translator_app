const db = require('../../core/database.js').db;

const createUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    // Assuming 'db' is the SQLite database connection
    const query = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');

    query.run(username, password, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }

      // Don't forget to finalize the statement after running
      query.finalize();
    });
  });
};

const deleteUser = async (username) => {
  return new Promise((resolve, reject) => {
    // Assuming 'db' is the SQLite database connection
    const query = db.prepare('DELETE FROM users WHERE username = ?');

    query.run(username, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
      query.finalize();
    });
  });
};

const getUser = async (username) => {
  return new Promise((resolve, reject) => {
    // Assuming 'db' is the SQLite database connection
    const query = db.prepare('SELECT * FROM users WHERE username = ?');

    query.get(username, function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }

      // Don't forget to finalize the statement after running
      query.finalize();
    });
  });
};

//const updatePassword = async (username, password) => {
//    const query = db.prepare('UPDATE users SET password = ? WHERE username = ?');
//    const result = await query.run(password, username);
//    return result;
//};
const updatePassword = async (username, password) => {
  return new Promise((resolve, reject) => {
    // Assuming 'db' is the SQLite database connection
    const query = db.prepare('UPDATE users SET password = ? WHERE username = ?');

    query.run(password, username, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }

      query.finalize();
    });
  });
};

module.exports = {
    createUser,
    deleteUser,
    getUser,
    updatePassword
};