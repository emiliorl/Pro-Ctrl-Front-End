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
    var params = JSON.stringify(parametros);
    return this.http.post(this.uri + '/createCourse/'+ userId, params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  updateCourse(){

  }

  deleteCourse(){

  }
  
}
