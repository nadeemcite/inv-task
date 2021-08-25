import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MovieComponent } from './movie.component';

import { RouterModule, Routes } from '@angular/router';
import { HotTableModule } from '@handsontable/angular';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), HotTableModule],
  exports: [],
  declarations: [MovieComponent],
  providers: [],
})
export class MovieModule {}
