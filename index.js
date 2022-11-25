// accept user input from cmd line and pass it to person.js which inturn passes it to the connection.query method to execute the query with these values

import rl from "readline-Sync";
import db from "./models/person.js";

let p_id = rl.question("Enter the num: ");
let p_name = rl.question("Enter the name: ");
let p_age = rl.question("Enter the age: ");
let p_email = rl.question("Enter the email: ");
let p_country = rl.question("Enter the country: ");
db.createOne({ p_id, p_name, p_age, p_email, p_country });

// let data = {num, name, age, email, country};
// db(data);
