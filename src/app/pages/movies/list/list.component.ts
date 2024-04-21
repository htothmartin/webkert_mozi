import {
  Component,
  Input,
  OnChanges,
  HostListener,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Movie } from '../../../shared/models/Movie';
import { MovieService } from '../../../shared/services/movie.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnChanges, OnInit {
  @Input() moviesInput?: Movie[];
  image?: string;
  cols = 3;

  orderType = 'Növekvő';
  sortAscending = true;

  searchControl = new FormControl('');

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.calculateCols(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateCols(window.innerWidth);
  }

  calculateCols(windowWidth: number): void {
    // Írd meg a saját logikádat az oszlopok számának kiszámítására
    // pl. az ablak szélességétől függően
    // Itt csak egy egyszerű példa van:
    if (windowWidth < 600) {
      this.cols = 1;
    } else if (windowWidth < 900) {
      this.cols = 2;
    } else {
      this.cols = 3;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.moviesInput) {
      this.loadImages(this.moviesInput);
    }
  }

  loadImages(movies: Movie[]) {
    for (let movie of movies) {
      this.movieService.loadImage(movie.image_url).subscribe((data) => {
        movie.image = data;
      });
    }
  }

  openMovie(movieId: string) {
    this.router.navigateByUrl('/movies/page/' + movieId);
  }

  toggleSortDirection(): void {
    this.sortAscending = !this.sortAscending;
    if (!this.sortAscending) {
      this.moviesInput = this.moviesInput?.reverse();
      this.orderType = 'Csökkenő';
    } else {
      this.orderType = 'Növekvő';
      this.moviesInput = this.moviesInput?.reverse();
    }

    console.log(this.orderType);
  }
  search() {
    if (this.searchControl.value != null && this.searchControl.value != '') {
      this.movieService
        .loadMoviesMeta(this.searchControl.value, true)
        .subscribe((data: Array<Movie>) => {
          this.moviesInput = [...data];
          this.loadImages(this.moviesInput);
        });
    } else {
      this.movieService
        .loadMoviesMeta('', true)
        .subscribe((data: Array<Movie>) => {
          this.moviesInput = [...data];
          this.loadImages(this.moviesInput);
        });
    }
  }
}
