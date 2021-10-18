import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  searchControl: FormControl;
  movies: Observable<any[]>;
  reviews: any[];
  selectedType: String = "movie";
  selectedYear: String = "2021";
  selectedPage: String = "1";
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;
  totalResults: String = "0";

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.searchControl = new FormControl();

    this.movies = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(
          (searchString) => this.appService.getMovieBySearchTerm(searchString)
        ),
        map((res: any) => res.Search)
      );

    this.appService.getMovieByYearType(this.selectedYear, this.selectedType, this.selectedPage)
      .subscribe(
        val => { this.reviewsFunction(val) },
        error => { console.log("error") },
        () => { console.log("Completed") }
      )
  }

  handleClick(id) {
    this.router.navigate(['/single/'], {
      queryParams: { imdbID: id }
    });
  }

  selectChange() {
    this.appService.getMovieByYearType(this.selectedYear, this.selectedType, this.selectedPage)
      .subscribe(
        val => { this.reviewsFunction(val) },
        error => { console.log("error") },
        () => { console.log("Completed") }
      )
  }

  pageChanged(event: PageChangedEvent): void {
    this.selectedPage = event.page.toString();
    this.selectChange();
  }

  reviewsFunction(value) {
    this.reviews = value['Search'];
    this.totalResults = value['totalResults'];
  }
}

