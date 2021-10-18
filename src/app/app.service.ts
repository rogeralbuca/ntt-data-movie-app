import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  getMovieBySearchTerm(query) {
    return this.http.get(`http://www.omdbapi.com/?apikey=85a0ae7b&s=${query}`);
  }

  getMovieById(query) {
    return this.http.get(`http://www.omdbapi.com/?apikey=85a0ae7b&plot=full&i=${query}`);
  }

  getMovieByYearType(year, type, page) {
    return this.http.get(`http://www.omdbapi.com/?apikey=85a0ae7b&y=${year}&type=${type}&page=${page}&s=War`);
  }
}
