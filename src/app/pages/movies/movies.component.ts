import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/models/Movie';
import { MovieService } from '../../shared/services/movie.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit{
  moviesObject?: Array<Movie>

  constructor(private movieService: MovieService, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.movieService.loadMovieMeta().subscribe((data: Array<Movie>) => {
      this.moviesObject = data;
    })
  }
  


}
