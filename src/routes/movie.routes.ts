import { Router } from "express";
import { MovieController } from "../modules/movies/MovieController";


const moviesRoutes = Router();

const movieController = new MovieController();

moviesRoutes.post("/", (request, response) => {
    return movieController.createMovie(request,response);
  });

export { moviesRoutes };