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

### Note

```
person.js
  contains all the function that'll execute an sql query when we call it with some args
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

## Sending Person data as response to requests

### View all table data

`person.js`

```
Also update the executeQuery fn exported from db_handler to accept a callback as parameter

function getAll(callback) {
  let sql = `select * from person`;
  db(sql, [], callback);
}
```

`routing.js`

```
case "/api/users":
  db.getAll((err, res) => {
    response.end(JSON.stringify(res));
  });
  break;
```

Here the callback returns the response
Working:

- We call the getAll fn definition, which is in person.js and pass this callback as argument.
- Which inturn will pass this callback (along with sql query and the values, empty array in this case) to the executeQuery fn defined in the db_handler.
- The query method in the executeQuery fn will execute the sql query and call the callback fn which returns the response.

### View data filtered by pk using query

`person.js`

```
function getOne(p_id, callback) {
  var sql = "select * from person where P_id=?";
  db(sql, p_id, callback);
}
```

`routing.js`

```
case "/api/user":
  let id = query.id;
  db.getOne(id, (err, res) => {
    response.end(JSON.stringify(res));
  });
  break;
```

## Creating new entries by sending requests using post method from Postman

```
case "/api/create":
  console.log("postman req");
  let formData = "";
  req.on("data", (data) => {
    console.log(data.toString());
    formData += data.toString();
  });
  req.on("end", () => {
    let query = qs.parse(formData);
    console.log(query);
    db.createOne(query, (err, result) => {
      if (!err) {
        response.end(JSON.stringify({ status: "OK" }));
      } else {
        response.end(JSON.stringify({ status: "FAILED" }));
        console.log(err);
      }
    });
  });
  break;
```

- Firstly we need to get the query from the request(send by postman)
- so we initialize an empty string formData
- we listen to the request for data event (ie the query in url)
- we append this to formData

```
let formData = "";
req.on("data", (data) => {
console.log(data.toString());
formData += data.toString();
});
```

- Once we get the query, and the request end event is emitted, we parse the formData
- query will be an object with key value pairs with keys representing the column name and values represeing their values, this query with key, value pairs are requested from postman using post method.

We do it using the core module querystring since it directly gives us the object [also we are passing the object as params].

```
OUTPUT after parsing the query
[Object: null prototype] {
  p_id: '6',
  p_name: 'adf',
  p_age: '23',
  p_email: 'adf',
  p_country: 'UK'
}
```

```
req.on("end", () => {
    let query = qs.parse(formData); // this is the query appended after the ? in the req url
    console.log(query);
  ...
  });
```

- After that we call the createOne fn imported using the db and pass this query of object as the parameter along with a callback fn to send the status as response

```
req.on("end", () => {
  ...
    db.createOne(query, (err, result) => {
      if (!err) {
        response.end(JSON.stringify({ status: "OK" }));
      } else {
        response.end(JSON.stringify({ status: "FAILED" }));
        console.log(err);
      }
    });
  });
```

NOTE: In postman create a new request with POST method and in the body category select x-www-form-urlencoded, there create and pass in the key value pairs.

## Updating an db entry using the post method from postman

This is similar to above, in postman we only pass the id and name

## Deleting an entry from db using post from postman & get method

### Using GET method via the browser request

`person.js`

```
function deleteRow(p_id, callback) {
  let sql = `delete from person where p_id=?;`;
  db(sql, p_id, callback);
}
```

`routing.js`

```
var id = query.id;
  db.deleteRow(id, (err, res) => {
    response.end(JSON.stringify(res));
});
```

### Using POST method via postman

`person.js`

```
function deleteRow(data, callback) {
  let sql = `delete from person where p_id=?;`;
  let values = [data.p_id];
  db(sql, values, callback);
}
```

`routing.js` - same as above
