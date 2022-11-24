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

### To execute a query once we establish the connection

Use the query cmd to execute queries, then commit it

```
let query = `create  table if not exists person(p_id int primary key auto_increment, p_name varchar(255) not null, p_age int not null default 18, p_email varchar(255) not null, p_country varchar(255) not null default "IN")`;

connection.query(query, (err, results, fields) => {
  if (err) {
    console.log(err);
  }
});

// This cmd will create a new table in the database

connection.commit();
```

### Functions to execute SQL queries

The above method will result in a lot of queries, so we create a new file with separate fns for different operations
So first we need to export the `executeQuery();`

In person.js

```
import db from "./db_handler.js";

function createOne() {
  let sql = `insert into person values(4, "Dummy", 18, "dummy@mail.com", "UK")`;
  db(sql);
}
createOne();
```
