import mysql from "mysql2";

const connectionDetails = {
  host: "localhost",
  user: "root",
  password: "My$ql@wb",
  database: "person",
};

function getConnection() {
  return mysql.createConnection(connectionDetails);
}

// make the function accept parameters as arg
function executeQuery(query, parameters, callback) {
  let connection = getConnection();
  connection.connect((err) => {
    if (!err) {
      console.log("db connection succeded");
    } else {
      console.log("db connection failed" + JSON.stringify(err, undefined, 2));
    }
  });

  // let query = `create  table if not exists person(p_id int primary key auto_increment, p_name varchar(255) not null, p_age int not null default 18, p_email varchar(255) not null, p_country varchar(255) not null default "IN")`;

  connection.query(query, parameters, callback, (err, results, fields) => {
    if (err) {
      console.log(err);
    }
  });
  connection.commit();
  connection.end();
}
// executeQuery();
export default executeQuery;

// let sql = `insert into person values(1, "Emmanuel", 22, "ekr@mail.com", "IN")`;
// executeQuery(sql);
