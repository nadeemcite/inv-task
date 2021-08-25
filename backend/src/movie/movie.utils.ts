import { Movie } from 'src/entities/movie';
import { getConnection } from 'typeorm';
import { MovieObject } from './movie.dto';

export class MovieUtils {
  async getMovies(limit: number, offset: number) {
    return await getConnection()
      .getRepository(Movie)
      .find({
        order: {
          id: 'DESC',
        },
        take: limit,
        skip: offset,
      });
  }

  async addMovie(movie: MovieObject) {
    return await getConnection().getRepository(Movie).save(movie);
  }

  async deleteMovie(movieId: number) {
    return await getConnection().getRepository(Movie).delete({
      id: movieId,
    });
  }

  async updateMovie(movie: MovieObject){
      return await getConnection().getRepository(Movie).save(movie);
  }
}
