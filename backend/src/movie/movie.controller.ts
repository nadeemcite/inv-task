import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from "@nestjs/common";
import { GetMoviesParams, MovieIdParam, MovieObject } from "./movie.dto";
import { MovieUtils } from "./movie.utils";

@Controller("/movie")
export class MovieController{
    logger:Logger = new Logger("MOVIE");

    movieUtils:MovieUtils;

    constructor(){
        this.movieUtils = new MovieUtils();
    }

    @Get("/movies/:limit/:offset")
    async getMovies(@Param() getMoviesParams:GetMoviesParams){
        return this.movieUtils.getMovies(
            Number(getMoviesParams.limit), Number(getMoviesParams.offset)
        );
    }

    @Post("/movie")
    async createMovie(@Body() movie:MovieObject){
        return this.movieUtils.addMovie(movie);
    }

    @Delete("/movie/:id")
    async deleteMovie(@Param() movieIdParam:MovieIdParam){
        return this.movieUtils.deleteMovie(movieIdParam.id);
    }

    @Patch("/movie")
    async updateMovie(@Body() movie:MovieObject){
        return this.movieUtils.updateMovie(movie);
    }
}