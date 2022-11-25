import http from "http";
import db from "./models/person.js";
import url from "url";
import qs from "querystring";

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
    case "/api/create":
      console.log("postman req");
      let formData = "";
      req.on("data", (data) => {
        console.log(data.toString());
        formData += data.toString();
      });
      req.on("end", () => {
        let query = qs.parse(formData); // this is the query appended after the ? in the req url
        console.log(query);
        // query will be an object with key value pairs with keys representing the column name and values represeing their values
        // this query with key, value pairs are requested from postman using post method
        db.createOne(query, (err, result) => {
          if (!err) {
            response.end(JSON.stringify({ status: "OK" }));
          } else {
            response.end(JSON.stringify({ status: "FAILED" }));
            console.log(err);
          }
        });
      });
      break;
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000");
});
