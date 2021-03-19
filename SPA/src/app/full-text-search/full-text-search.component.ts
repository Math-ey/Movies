import { Component, OnInit } from '@angular/core';
import { ElasticSearchService } from '../services/elastic-search.service';
import { Movie } from '../model/movie';


@Component({
  selector: 'app-full-text-search',
  templateUrl: './full-text-search.component.html',
  styleUrls: ['./full-text-search.component.css']
})
export class FullTextSearchComponent implements OnInit {

  movies: Movie[];

  constructor(private service : ElasticSearchService) { }

  ngOnInit() {
  }

  Search (searchVal: string): void{
    this.service.getMovies(searchVal).subscribe(res=>{
      let hits = res.hits.hits;
      this.movies = hits.map( hit => {
        var movie = <Movie>{
          title: hit._source.title,
          plot: hit._source.plot,
          budget: hit._source.budget,
          gross: hit._source.gross,
          runTimeInMinutes: hit._source.runTimeInMinutes,
          rating: hit._source.rating,
          ratingCount: hit._source.ratingCount,
          releaseDate: hit._source.releaseDate,
          countries: hit._source.countries,
          languages: hit._source.languages,
          genres: hit._source.genres,
          directors: hit._source.directors,
          writers: hit._source.writers,
          actors: hit._source.actors,
          eId: hit._id,
          posterUrl: hit._source.posterUrl
        };
        return movie;
      })
    });
  }

}
