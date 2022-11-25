/**Database connection pooling is a way to reduce the cost of opening and closing connections by maintaining a “pool”
 * of open connections that can be passed from database operation to database operation as needed. This way, we are spared
 * the expense of having to open and close a brand new connection for each operation the database is asked to perform. */

import { escape, createPool } from "mysql2";
import { writeFileSync } from "fs";
import { question } from "readline-Sync";
const connDetails = {
  host: "localhost",
  user: "root",
  password: "My$ql@wb",
  database: "person",
};
let p_id = question("Enter the person Id :");
p_id = escape(p_id);
let p_name = question("Enter the person name :");
p_name = escape(p_name);
let p_age = question("Enter the age :");
p_age = escape(p_age);
let p_email = question("Enter the email :");
p_email = escape(p_email);
let p_country = question("Enter the country :");
p_country = escape(p_country);
const pool = createPool(connDetails);
// const q1 = `SELECT * FROM person where p_name=${number}`;
//    pool.query(`SELECT * FROM person where p_name=${number}`, (err, data) => {
pool.query(
  `insert into person(p_id,p_name,p_age,p_email,p_country) values(${p_id},${p_name},${p_age},${p_email},${p_country})`,
  (err, data) => {
    if (err) throw err;
    console.table(data);
    // console.log(q1);
    const jsonString = JSON.stringify(data);
    console.log(jsonString);
    writeFileSync(`data.json`, jsonString);
  }
);
// pool.query(query,['UN6789'],(err,data)=>{
//     console.table(data);
// });
