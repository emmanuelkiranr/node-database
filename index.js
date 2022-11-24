// accept user input from cmd line and pass it to person.js which inturn passes it to the connection.query method to execute the query with these values

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
