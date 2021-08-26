import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { MOVIE_PERSONALIZATION } from '../models/constants';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { MovieFormDialogComponent } from './movie-form-dialog/movie-form-dialog.component';

interface CustomMovie {
  id?: number;
  title: string;
  vote_average: string;
  budget: number;
}

@Component({
  selector: 'app-movie',
  templateUrl: 'movie.component.html',
  styleUrls: ['movie.component.scss'],
  providers: [MovieService],
})
export class MovieComponent implements OnInit {
  id = 'hot-table';
  movies: CustomMovie[] = [];
  currentPage = 0;
  maximumRecords = 20;
  columnSettings: any[] = [];
  private hotRegisterer = new HotTableRegisterer();

  hotSettings: Handsontable.GridSettings = {
    rowHeaders: true,
    colHeaders: true,
    height: 'auto',
    manualColumnResize: true,
    licenseKey: 'non-commercial-and-evaluation',
    afterOnCellMouseDown: (event, coords) => {
      if(coords.row>=0){
        const dialogRef = this.dialog.open(MovieFormDialogComponent, {
          data: {
            movie: this.movies[coords.row],
          },
        });
        this.setUpDailogClose(dialogRef);
      }
      
    },
    afterColumnResize: () => {
      this.setPersonalizations();
    },
    afterColumnMove: () => {
      this.setPersonalizations();
    },
    dragToScroll: true,
    manualColumnMove: true,
    dropdownMenu: ['alignment'],
  };

  constructor(private movieService: MovieService, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieService
      .getMovies(this.currentPage, this.maximumRecords)
      .subscribe((movies) => {
        this.movies = movies.map((movie) => {
          return {
            id: movie.id,
            title: movie.original_title,
            budget: movie.meta_data.budget,
            vote_average: movie.meta_data.vote_average,
          };
        });
        setTimeout(() => {
          const personalization: any = this.getPersonalizationObj();
          if (personalization.indexSequence) {
            this.hotRegisterer
              .getInstance(this.id)
              .columnIndexMapper.setIndexesSequence(
                personalization.indexSequence
              );
            this.hotRegisterer;
            this.hotRegisterer.getInstance(this.id).updateSettings({
              colWidths: personalization.widths,
            });
            this.hotRegisterer.getInstance(this.id).render();
          }
        });
      });
  }
  addNewMovie() {
    const dialogRef = this.dialog.open(MovieFormDialogComponent, {
      data: {},
    });
    this.setUpDailogClose(dialogRef);
  }
  resizeColumn(event: any) {
    console.log(event);
  }

  setPersonalizationObj(personalization: any) {
    localStorage.setItem(
      MOVIE_PERSONALIZATION,
      JSON.stringify(personalization)
    );
  }
  getPersonalizationObj() {
    try {
      const personalization = localStorage.getItem(MOVIE_PERSONALIZATION);
      if (personalization) {
        return JSON.parse(personalization);
      } else {
        return {};
      }
    } catch {
      return {};
    }
  }

  getColumnWidths() {
    const noOfColumns = this.hotRegisterer.getInstance(this.id).countCols();
    const widths = [];
    for (let i = 0; i < noOfColumns; i++) {
      widths.push(this.hotRegisterer.getInstance(this.id).getColWidth(i));
    }
    return widths;
  }

  setPersonalizations() {
    const personalization: any = this.getPersonalizationObj();
    personalization.indexSequence = this.hotRegisterer
      .getInstance(this.id)
      .columnIndexMapper.getIndexesSequence();
    personalization.widths = this.getColumnWidths();
    this.setPersonalizationObj(personalization);
  }

  setUpDailogClose(formDialog: MatDialogRef<MovieFormDialogComponent>) {
    formDialog.afterClosed().subscribe((action) => {
      switch (action) {
        case 'cancel':
          break;
        default:
          this.currentPage = 0;
          this.fetchMovies();
      }
    });
  }
  previous(){
    this.currentPage--;
    this.fetchMovies();
  }
  next(){
    this.currentPage++;
    this.fetchMovies();
  }
  home(){
    this.currentPage=0;
    this.fetchMovies();
  }
}
