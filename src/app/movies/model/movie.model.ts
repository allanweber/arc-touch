import { Genre } from './genre.model';

export class Movie {
  id: number;
  title: string;
  overview: string;
  genres: Genre[];
  smallImage: string;
  image: string;
  date: Date;
}
