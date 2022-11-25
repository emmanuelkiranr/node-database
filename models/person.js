import db from "./db_handler.js";

function createOne(data) {
  // let sql = `insert into person values(1, "ekr", 22, "ekr@mail", "IN")`;
  // db(sql);
  let sql = `insert into person (p_id, p_name, p_age, p_email, p_country) values (?,?,?,?,?)`;
  let values = [data.num, data.name, data.age, data.email, data.country];
  db(sql, values);
}
// createOne();
export default createOne;
