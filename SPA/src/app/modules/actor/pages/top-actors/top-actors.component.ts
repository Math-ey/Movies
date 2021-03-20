import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/core/services/actor.service';

@Component({
  selector: 'app-top-actors',
  templateUrl: './top-actors.component.html',
  styleUrls: ['./top-actors.component.css']
})
export class TopActorsComponent implements OnInit {

  actors: any[];

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.actorService.getTopActors().subscribe(data => {
      this.actors = data.aggregations.actors.buckets;
    });
  }

  makeTwoDecimal(n : number){
    return n.toFixed(2);
  }

}
