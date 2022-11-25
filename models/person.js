import db from "./db_handler.js";

// also update the executeQuery fn exported from db_handler to accept a callback as parameter
function getAll(callback) {
  let sql = `select * from person`;
  db(sql, [], callback);
}

function getOne(p_id, callback) {
  var sql = "select * from person where P_id=?";
  db(sql, p_id, callback);
}

function createOne(data) {
  // let sql = `insert into person values(1, "ekr", 22, "ekr@mail", "IN")`;
  // db(sql);
  let sql = `insert into person (p_id, p_name, p_age, p_email, p_country) values (?,?,?,?,?)`;
  let values = [data.num, data.name, data.age, data.email, data.country];
  db(sql, values);
  // db(sql, [num, ...])
}
// createOne();
export default { getAll, getOne, createOne };
