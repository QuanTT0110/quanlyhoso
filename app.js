import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import AppDataSource, { connection } from "./src/config/ConfigConnection.js";
import router from "./src/route/Router.js"
connection();

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
app.use(router);
app.get("/", async (req, res, next) => {
  const posts = await AppDataSource.getRepository("Post").find();
  console.log(req);
  return res.status(200).json(posts);
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});