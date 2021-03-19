import { Component, OnInit } from '@angular/core';
import { ElasticSearchService } from '../services/elastic-search.service';
import { Movie } from '../model/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  private id: string;

  constructor(private service: ElasticSearchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.service.getMovie(param['id']).subscribe(res => {
        let hit = res.hits.hits[0];
        this.movie = <Movie>{
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
        }
        console.log(this.movie.posterUrl);
      });
    });


  }

}
