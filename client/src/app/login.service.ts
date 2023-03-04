import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router: Router) { }

  login(email:string, pass:string){

    let user = {
      'email': email, 
      'password': pass
    }
    
    let headers = { 'content-type' : 'application/json' };
    this.http.post('/api/v1/login', user, { 'headers' : headers }).subscribe(res => {       
      console.log(res);
      if(Object.keys(res)[0] == 'error'){
        alert('Unsucessful Login. Please Try Again!');
      } else {
        if(Object.keys(res)[0] == 'Teacher') {
          this.router.navigate(['/teacher/'+email]);
        } else {
          this.router.navigate(['/student/'+email]);
        }
      }
    });
  }

  createNewAcc(teacher:string, first:string, last:string, email:string, password:string){
    
    let student = {'name' : first + ' ' + last, 'email' : email, 'password' : password };
    let headers = { 'content-type' : 'application/json' };

    this.http.post('/api/v1/newStudent/'+teacher, student, { 'headers' : headers}).subscribe( res => {
      console.log(res);
      if(Object.keys(res)[0] == 'error'){
        alert('An Account with this email already exists!');
      } else if (Object.keys(res)[0] == 'noTeacher') {
        alert('This Teacher does not exist!');
      } else {
          this.router.navigate(['/']);
          //window.location.href = '/';
      }
    });
  }

  logout(){
    let user = {'user' : 'logout'};
    this.http.post('/api/v1/logout', user).subscribe( res => {
      this.router.navigate(['/login']);
      //window.location.href = '/login';
    })
  }

  

}
