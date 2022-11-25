import http from "http";
import db from "./models/person.js";
import url from "url";
import qs from "querystring";

const server = new http.createServer((req, response) => {
  let link = url.parse(req.url, true);
  let path = link.pathname;
  let query = link.query;
  // let get = req.method;

  switch (path) {
    case "/api/users":
      db.getAll((err, res) => {
        response.end(JSON.stringify(res));
      });
      break;
    case "/api/user":
      var id = query.id;
      db.getOne(id, (err, res) => {
        response.end(JSON.stringify(res));
      });
      break;
    case "/api/create":
      console.log("postman req");
      var formData = "";
      req.on("data", (data) => {
        formData += data.toString();
        // console.log(formData);
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
    case "/api/update":
      var formData = "";
      req.on("data", (data) => {
        formData += data.toString();
      });
      req.on("end", () => {
        let query = qs.parse(formData);
        db.updateData(query, (err, result) => {
          if (!err) {
            response.end(JSON.stringify({ status: "OK" }));
          } else {
            response.end(JSON.stringify({ status: "FAILED" }));
            console.log(err);
          }
        });
      });
      break;
    case "/api/delete":
      // var id = query.id;
      // db.deleteRow(id, (err, res) => {
      //   response.end(JSON.stringify(res));
      // }); //- This would delete the row if executed from brower(cause its get request)

      // For Delete method from postman, we need to listen to events
      var formData = "";
      req.on("data", (data) => {
        formData += data.toString();
      });
      req.on("end", () => {
        let query = qs.parse(formData);
        db.deleteRow(query, (err, result) => {
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
