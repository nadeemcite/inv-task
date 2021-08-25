import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MovieComponent } from './movie.component';

import { RouterModule, Routes } from '@angular/router';
import { HotTableModule } from '@handsontable/angular';
import { MovieFormDialogComponent } from './movie-form-dialog/movie-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HotTableModule,
    MatDialogModule,
  ],
  exports: [],
  declarations: [MovieComponent, MovieFormDialogComponent],
  providers: [],
})
export class MovieModule {}
