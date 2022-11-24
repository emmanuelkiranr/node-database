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

## To execute a query once we establish the connection

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

## Functions to execute SQL queries

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

## Get query from user

Till now we implicitly specify the values of queries, now we want to make the user input the same.
To do it we create a file that takes input from user via the cmd line and pass it to the createOne fn which we created in the person.js file.
(similar to this we can create different sql query fns in that file so that we just need to call that fn with the user input from cmd (for create/update etc) and querystrings (while viewing/ show by pk etc))

But firstly we need to make the fns inside person.js accept input from user.

`index.js`

```
import rl from "readline-Sync";
import db from "./models/person.js";

let num = rl.question("Enter the num: ");
let name = rl.question("Enter the name: ");
let age = rl.question("Enter the age: ");
let email = rl.question("Enter the email: ");
let country = rl.question("Enter the country: ");
db({ num, name, age, email, country });

// let data = {num, name, age, email, country};
// db(data);
```

This input values are put into an object and that object is passed as parameter to the createOne fn so that each value can be accessed from the object while executing the query.

`person.js`

```
import db from "./db_handler.js";

// we are passing in an object into the variable data
function createOne(data) {
  let sql = `insert into person (p_id, p_name, p_age, p_email, p_country) values (?,?,?,?,?)`;
  let values = [data.num, data.name, data.age, data.email, data.country];

  db(sql, values);
}

export default createOne;
```

Here we take the values from the object and put it into an array, which is then passed as the argument to executeQuery()

Finally in `db_handler` Update the function in order to accept the values array as an parameter
