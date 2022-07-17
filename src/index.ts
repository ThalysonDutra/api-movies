import { AppDataSource } from "./data-source"

import cors from "cors";
import express = require("express");
import { usersRotas } from "./routes/user.routes";
import { categoriesRoutes } from "./routes/category.routes";
import { moviesRoutes } from "./routes/movie.routes";

const app = express();

AppDataSource.initialize().then(async () => {
  app.listen(3131);

  app.use(express.json());
  app.use(cors());
  app.use("/user", usersRotas);
  app.use("/category", categoriesRoutes);
  app.use("/movie", moviesRoutes);

 
  app.get("/", (request, response) => {
    return response.send("Ola, ");
  });


}).catch(error => console.log(error))

