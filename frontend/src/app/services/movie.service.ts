import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(page: number, perPage: number): Observable<Movie[]> {
    const limit = perPage;
    const offset = perPage * page;
    return this.http.get<Movie[]>(
      `${environment.api_prefix}movie/movies/${limit}/${offset}`
    );
  }

  addMovie(movie:Movie): Observable<Movie>{
    return this.http.post<Movie>(
      `${environment.api_prefix}movie/movie`,movie
    );
  }

  updateMovie(movie:Movie): Observable<Movie>{
    return this.http.patch<Movie>(
      `${environment.api_prefix}movie/movie`,movie
    );
  }

  deleteMovie(movieId: number): Observable<any> {
    return this.http.delete<Movie[]>(
      `${environment.api_prefix}movie/movie/${movieId}`
    );
  }
}
