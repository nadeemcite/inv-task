import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-form-dialog',
  templateUrl: 'movie-form-dialog.component.html',
  providers: [MovieService],
})
export class MovieFormDialogComponent implements OnInit {
  movieForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MovieFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    if (this.data.movie) {
      this.movieForm = this.fb.group({
        original_title: [this.data.movie.title, Validators.required],
        meta_data: this.fb.group({
          budget: [this.data.movie.budget, Validators.required],
          vote_average: [this.data.movie.vote_average, Validators.required],
        }),
      });
    } else {
      this.movieForm = this.fb.group({
        original_title: ['', Validators.required],
        meta_data: this.fb.group({
          budget: [null, Validators.required],
          vote_average: [null, Validators.required],
        }),
      });
    }
  }

  closeDialog() {
    this.dialogRef.close('cancel');
  }
  submitMovieForm() {
    if (this.data.movie?.id) {
      this.movieService
        .updateMovie({
          id: this.data.movie.id,
          ...this.movieForm.value,
        })
        .subscribe(
          () => {
            this.dialogRef.close('insert');
          },
          () => {
            alert('Something went wrong!');
          }
        );
    } else {
      this.movieService.addMovie(this.movieForm.value).subscribe(
        () => {
          this.dialogRef.close('insert');
        },
        () => {
          alert('Something went wrong!');
        }
      );
    }
  }
  deleteMovie() {
    if (confirm('Are you sure?')) {
      this.movieService.deleteMovie(this.data.movie.id).subscribe(
        () => {
          this.dialogRef.close('delete');
        },
        () => {
          alert('Something went wrong!');
        }
      );
    }
  }
}
