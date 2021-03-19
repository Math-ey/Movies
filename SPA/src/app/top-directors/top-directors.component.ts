import { Component, OnInit } from '@angular/core';
import { ElasticSearchService } from '../services/elastic-search.service';

@Component({
  selector: 'app-top-directors',
  templateUrl: './top-directors.component.html',
  styleUrls: ['./top-directors.component.css']
})
export class TopDirectorsComponent implements OnInit {

  directors: any[];

  constructor(private service: ElasticSearchService) { }

  ngOnInit() {
    this.service.getTopDirectors().subscribe(res => {
      this.directors = res.aggregations.directors.buckets;
    });
  }

  makeTwoDecimal(n : number){
    return n.toFixed(2);
  }

}
