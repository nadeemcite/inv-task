import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: 'movie.component.html',
  styleUrls: ['movie.component.scss'],
  providers: [MovieService],
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  currentPage = 0;
  maximumRecords = 100;
  constructor(private movieService: MovieService) {}

  ngOnInit() {
      this.fetchMovies();
  }

  fetchMovies() {
    this.movieService
      .getMovies(this.currentPage, this.maximumRecords)
      .subscribe((movies) => {
        this.movies = movies;
      });
  }
}
