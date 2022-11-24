import mysql from "mysql2";

const connectionDetails = {
  host: "localhost",
  user: "root",
  password: "ekr@hp2022",
  database: "Person",
};

function getConnection() {
  return mysql.createConnection(connectionDetails);
}

function executeQuery() {
  let connection = getConnection();
  connection.connect((err) => {
    if (!err) {
      console.log("db connection succeded");
    } else {
      console.log("db connection failed" + JSON.stringify(err, undefined, 2));
    }
  });
  connection.end();
}
executeQuery();
