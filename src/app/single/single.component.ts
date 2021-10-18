import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  faHeart = faHeart;

  movie: Object = {};

  isFavorite: Boolean = false;

  constructor(private route: ActivatedRoute, private appService: AppService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.appService.getMovieById(params.imdbID).subscribe(
          val => { this.movie = val, this.isFavorite = this.localStorageService.get(this.movie['imdbID']) == null ? true : false; },
          error => { console.log("error") },
          () => { console.log("Completed") }
        );
      });
  }

  setFavorite(imdbID) {
    let key: string = this.localStorageService.get(imdbID);

    this.isFavorite = key == null ? false : true;

    if (key == null) {
      this.localStorageService.set(imdbID, true);
    } else {
      this.localStorageService.remove(imdbID);
    }
  }

}
