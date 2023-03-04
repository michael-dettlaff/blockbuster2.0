import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  getName(student:string){
    let name = this.http.get('/api/v1/getName/'+student);
    return name;
  }

  changePassword(username:string, password:string, newPassword:string){

    let user = {
      'username' : username,
      'password' : password,
      'newPassword' : newPassword
    }
    let headers = { 'content-type' : 'application/json' };

    this.http.post('/api/v1/changePassword', user, { 'headers' : headers}).subscribe( res => {
      if(Object.keys(res)[0] == 'error'){
        alert('You entered the wrong password!');
      } else {
          //this.loginService.logout();
          this.router.navigate(['/']);
      }
    });
  }

  changeUsername(username:string, password:string, newUsername:string){

    let user = {
      'username' : username,
      'password' : password,
      'newUsername' : newUsername
    }
    let headers = { 'content-type' : 'application/json' };

    this.http.post('/api/v1/changeUsername', user, { 'headers' : headers}).subscribe( res => {
      if(Object.keys(res)[0] == 'error'){
        alert('You entered the wrong password!');
      } else {
          this.router.navigate(['/']);
      }
    });
  }

  changeToTeacher(username:string){
    let user = {'email': username};
    let headers = { 'content-type' : 'application/json' };

    this.http.put('/api/v1/newTeacher/'+username, user, {'headers' : headers}).subscribe( res => {
      //console.log(res);
      this.router.navigate(['/']);
    });
  }

  getWatchList(username:string){
    let list = this.http.get('/api/v1/watchList/'+username);
    return list;
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
