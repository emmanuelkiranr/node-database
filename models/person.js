import db from "./db_handler.js";

// we are passing in an object into the variable data
function createOne(data) {
  //   let sql = `insert into person values(4, "Dummy", 18, "dummy@mail.com", "UK")`;
  //   db(sql);

  let sql = `insert into person (p_id, p_name, p_age, p_email, p_country) values (?,?,?,?,?)`;
  let values = [data.num, data.name, data.age, data.email, data.country];
  // console.log(data.name);
  // console.log(data);

  db(sql, values);
}
// createOne();
export default createOne;
