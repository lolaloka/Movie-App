import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListComponent } from './movie-list/movie-list.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Ctrl + dot import the files automatically
const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'create', component: CreateMovieComponent },
  { path: ':id/update', component: UpdateMovieComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
