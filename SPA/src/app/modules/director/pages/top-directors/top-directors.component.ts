import { Component, OnInit } from '@angular/core';
import { DirectorService } from 'src/app/core/services/director.service';

@Component({
  selector: 'app-top-directors',
  templateUrl: './top-directors.component.html',
  styleUrls: ['./top-directors.component.css']
})
export class TopDirectorsComponent implements OnInit {

  directors: any[];


  constructor(private directorService: DirectorService) { }

  ngOnInit(): void {
    this.directorService.getTopDirectors().subscribe(res => {
      this.directors = res.aggregations.directors.buckets;
    });
  }

  makeTwoDecimal(n : number){
    return n.toFixed(2);
  }


}
