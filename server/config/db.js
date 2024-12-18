const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "srikanth",
//   password: "Srikanth@2004",
//   database: "employeeforms",
// });

const pool = mysql.createPool({
  host: "db",
  user: "root",
  password: "mysql123",
  database: "employeesform",
});

const promisePool = pool.promise();

module.exports = promisePool;
