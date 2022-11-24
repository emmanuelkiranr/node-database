import db from "./db_handler.js";

function createOne() {
  let sql = `insert into person values(4, "Dummy", 18, "dummy@mail.com", "UK")`;
  db(sql);
}
createOne();
