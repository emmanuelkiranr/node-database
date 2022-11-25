import http from "http";
import db from "./models/person.js";
import url from "url";

const server = new http.createServer((req, response) => {
  let link = url.parse(req.url, true);
  let path = link.pathname;
  let query = link.query;

  switch (path) {
    case "/api/users":
      db.getAll((err, res) => {
        response.end(JSON.stringify(res));
      });
      break;
    case "/api/user":
      let id = query.id;
      db.getOne(id, (err, res) => {
        response.end(JSON.stringify(res));
      });
      break;
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000");
});
