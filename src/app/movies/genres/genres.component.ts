import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  @Input() genres: Genre[];
  @Input() max: number;

  constructor() {}

  ngOnInit() {
    if (this.max && this.max > 0) {
      const genres = this.genres.slice(0, this.max);
      if (this.genres.length > this.max){
         genres.push({ id: 0, name: '...' });
      }
      this.genres = genres;
    }
  }
}
