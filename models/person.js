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

function createOne(data, callback) {
  // let sql = `insert into person values(1, "ekr", 22, "ekr@mail", "IN")`;
  // db(sql);
  let sql = `insert into person (p_id, p_name, p_age, p_email, p_country) values (?,?,?,?,?)`;
  let values = [
    data.p_id,
    data.p_name,
    data.p_age,
    data.p_email,
    data.p_country,
  ];
  db(sql, values, callback);
  // db(sql, [num, ...])
}
// createOne();

function updateData(data, callback) {
  let sql = `update person set p_name=? where p_id=?`;
  let values = [data.p_name, data.p_id]; // data in order of sql query
  db(sql, values, callback);
}

// function deleteRow(p_id, callback) {
//   let sql = `delete from person where p_id=?;`;
//   db(sql, p_id, callback);
// } - works only if response send from browser using GET method

function deleteRow(data, callback) {
  let sql = `delete from person where p_id=?;`;
  let values = [data.p_id];
  db(sql, values, callback);
}
export default { getAll, getOne, createOne, updateData, deleteRow };
