import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestCourseService {

  public uri : string;
  public token;
  public course; 
  public courseSelect;

  public httpOptions = {
    headers:new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  public httpOptionAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  };

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) { 
    this.uri = CONNECTION.URI; 
  }

  createCourse(userId, parametros){
    let params = JSON.stringify(parametros);
    return this.http.post(this.uri + '/createCourse/'+ userId, params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  updateCourse(userId, courseId, parametros){
    let params = JSON.stringify(parametros);
    return this.http.put(this.uri + '/' + userId + '/updateCourse/'+ courseId, params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  deleteCourse(userId, courseId, possiblePassword){
    return this.http.post(this.uri + '/ ' + userId + '/deleteCourse/' + courseId, {password : possiblePassword}, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }


}
