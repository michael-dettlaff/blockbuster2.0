import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovie(title: String){
    let fetchMov = this.http.get('/api/v1/movie/' + title + '&plot=full');
    return fetchMov;
  }

  addToWatch(username:string, title:string, poster:string){

    let list = {
      'title' : title,
      'poster' : poster
    }
    let headers = { 'content-type' : 'application/json' };

    this.http.post('/api/v1/watchList/'+username, list, { 'headers' : headers}).subscribe( res => {
      console.log('added to list');
    });
    
  }

}
