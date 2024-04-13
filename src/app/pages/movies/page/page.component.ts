import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit{

  movieId: string="";

  constructor(private actRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((param: any) => {
      this.movieId = param.movieId as string;
    })
  }


}
