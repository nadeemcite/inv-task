import { Movie } from "src/entities/movie";
import { getConnection } from "typeorm";

export class MovieUtils{
    async getMovies(limit:number, offset:number){
        return await getConnection().getRepository(
            Movie
        ).find({
            order:{
                id:'DESC'
            },
            take: limit,
            skip: offset
        })
    }   
}