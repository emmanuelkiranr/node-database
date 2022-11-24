# MySQL Database

Creating a connection to the sql workbench using node

```
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

// or let connection = sql.createConnection(connectionDetails)

let connection = getConnection();
connection.connect((err) => {
  if (!err) {
    console.log("db connection succeded");
  } else {
    console.log("db connection failed" + JSON.stringify(err, undefined, 2));
  }
});

connection.end();

or enclose it in a fn and call it

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

```

- import sql2 to establish the connection
- specify the db details in connectionDetails
- once we create a instance to connect we call the connect method which takes a callback with err as param
- Finally we end the connection
