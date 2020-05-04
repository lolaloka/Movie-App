import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  url = 'http://localhost:3000/api';
  movies = [];
  constructor() {
    this.getMovies();
  }

  ngOnInit(): void {}

  getMovies() {
    fetch(this.url + '/genres', { method: 'GET' }).then(async (res) => {
      this.movies = await res.json();
      console.log(this.movies);
    });
  }
}
