import { Component, OnInit } from '@angular/core';
import { ElasticSearchService } from '../services/elastic-search.service';

@Component({
  selector: 'app-top-actors',
  templateUrl: './top-actors.component.html',
  styleUrls: ['./top-actors.component.css']
})
export class TopActorsComponent implements OnInit {

  actors: any[];

  constructor(private service: ElasticSearchService) { }

  ngOnInit() {
    this.service.getTopActors().subscribe(data => {
      this.actors = data.aggregations.actors.buckets;
    });
  }

  makeTwoDecimal(n : number){
    return n.toFixed(2);
  }

}
