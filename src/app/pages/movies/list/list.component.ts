import { Component, Input, OnChanges, HostListener, SimpleChanges } from '@angular/core';
import { Movie } from '../../../shared/models/Movie';
import { MovieService } from '../../../shared/services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnChanges{

  @Input() moviesInput?: Movie[];
  image?: string;
  cols = 3;


  constructor(private movieService: MovieService, private router: Router) {}


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
    if(this.moviesInput){
      for(let movie of this.moviesInput){
        this.movieService.loadImage(movie.image_url).subscribe(data => {
          movie.image = data;
        });
      }
    }
    
  }

  openMovie(movieId: string){
      this.router.navigateByUrl("/movies/page/" + movieId)
  }


}
