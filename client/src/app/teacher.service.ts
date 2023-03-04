import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient, private router: Router) {}

  newStudent:any;
  newTeacher:any;

  getStudents(username: any){

    let students = this.http.get('/api/v1/teacher/' + username);
    return students;
  }

  deleteStudent(username: any){
  
    let deletedStudent = this.http.delete('/api/v1/student/' + username);
    return deletedStudent;
  }

  addStudent(first: string, last: string, username: string, password: string, teacher: string){

    let student = {'name' : first + ' ' + last, 'email' : username, 'password' : password };
    let headers = { 'content-type' : 'application/json' };

    this.http.post('/api/v1/newStudent/'+teacher, student, { 'headers' : headers}).subscribe( res => {
      //console.log(res);
      this.newStudent = res;
      if(Object.keys(res)[0] == 'error'){
        alert('An Account with this email already exists!');
      } else {
          //window.location.href = '/teacher/'+teacher;
          this.router.navigate(['/teacher/'+teacher]);
      }
    });
  }

  addTeacher(first: string, last: string, username: string, password: string, teacher: string){

    let newTeach = {'name' : first + ' ' + last, 'email' : username, 'password' : password };
    let headers = { 'content-type' : 'application/json' };

    this.http.post('/api/v1/newTeacher', newTeach, { 'headers' : headers}).subscribe( res => {
      //console.log(res);
      this.newTeacher = res;
      if(Object.keys(res)[0] == 'error'){
        alert('An Account with this email already exists!');
      } else {
        //window.location.href = '/teacher/'+teacher;
        this.router.navigate(['/teacher/'+teacher]);
      }
    });
  }

  getName(teacher:string){
    let name = this.http.get('/api/v1/getName/'+teacher);
    return name;
  }

  getWatchList(username:string){
    console.log('username is ' + username);
    let list = this.http.get('/api/v1/watchList/'+username);
    return list;
  }

  delFromWatchlist(username: string, title: string){

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

  
  
}
