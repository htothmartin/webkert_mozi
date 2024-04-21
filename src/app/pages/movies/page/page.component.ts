import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../shared/models/Movie';
import { MovieService } from '../../../shared/services/movie.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

interface Showtime {
  time: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent implements OnInit, OnChanges {
  movieId: string = '';
  movie?: Movie;
  minDate = new Date();
  maxDate = new Date();
  movieLoaded = false;

  combinedDate = new Date();

  choosenDate = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
  });

  showtimes: Showtime[] = [{ time: '12:00' }, { time: '15:00' }];

  //showtimeControl = new FormControl(this.showtimes[0].time);
  //dateControl = new FormControl('');

  constructor(
    private actRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((param: any) => {
      this.movieId = param.movieId as string;
    });
    this.maxDate.setDate(this.minDate.getDate() + 5);

    this.movieService
      .loadMovieMeta(this.movieId)
      .then((movie) => {
        if (movie) {
          this.movie = movie;
          this.onMovieChange();
          this.movieLoaded = true;
        } else {
          console.log('Nincs film a megadott ID-vel.');
        }
      })
      .catch((error) => {
        console.error(
          'Hiba történt a film adatainak lekérdezése közben:',
          error
        );
      });

    this.choosenDate.valueChanges.subscribe((val) => {
      if (val.date && val.time) {
        const date = new Date(val.date);
        console.log(val.time);
        const timeParts = val.time.split(':');
        date.setHours(parseInt(timeParts[0]));
        date.setMinutes(parseInt(timeParts[1]));
        this.combinedDate = date;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  onMovieChange(): void {
    if (this.movie && this.movie.image_url) {
      this.movieService.loadImage(this.movie.image_url).subscribe((data) => {
        if (this.movie) {
          this.movie.image = data;
        }
      });
    }
  }
}
