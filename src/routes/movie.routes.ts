import { Router } from "express";
import { MovieController } from "../modules/movies/MovieController";


const moviesRoutes = Router();

const movieController = new MovieController();

moviesRoutes.post("/", (request, response) => {
    return movieController.createMovie(request,response);
  });

  moviesRoutes.get("/", (request, response) => {
    return movieController.listMovie(request,response);
  });

  moviesRoutes.put("/:id", (request, response) => {
    return movieController.updateMovie(request,response);
  });

  moviesRoutes.delete("/:id", (request, response) => {
    return movieController.deleteMovie(request,response);
  });

  moviesRoutes.post("/:id/score", (request, response)=>{
    return movieController.scoreMovie(request,response);
  });

  moviesRoutes.get("/:id", (request, response)=>{
    return movieController.findById(request,response);
  });

export { moviesRoutes };