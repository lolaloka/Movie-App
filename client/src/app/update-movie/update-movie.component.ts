import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss'],
})
export class UpdateMovieComponent implements OnInit {
  movie;
  messageerror;
  movieForm = new FormGroup({
    movieName: new FormControl(null, [Validators.required]),
    // rate: new FormControl(null, [Validators.required]),
  });
  constructor(private route: ActivatedRoute) {
    this.getMovieById(this.route.snapshot.params.id);
  }

  ngOnInit(): void {}

  getMovieById(id) {
    fetch('http://localhost:3000/api/genres/' + id, { method: 'GET' }).then(
      async (resp) => {
        const movie = await resp.json();
        this.movie = movie;
        this.movieForm.get('movieName').setValue(this.movie.name);
        console.log(this.movie);
      }
    );
  }

  submit() {
    if (this.movieForm.invalid) return;

    const movieId = this.route.snapshot.params.id;
    this.updateMovie(movieId, this.movieForm.value.movieName)
      .then(async (resp) => {
        const data = await resp.json();
        if (!resp.ok) throw data;

        return data;
      })
      .then((result) => console.log(result))
      .catch((err) => (this.messageerror = err.msg));
  }

  updateMovie(movieId, name) {
    return fetch(`http://localhost:3000/api/genres/${movieId}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
