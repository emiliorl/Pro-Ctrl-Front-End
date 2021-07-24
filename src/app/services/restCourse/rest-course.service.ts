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

  getCoursesPublic(){
    return this.http.get(this.uri + '/getlistCoursesPublic', {})
    .pipe(map(this.extractData));
  }

  getCourseStorage(){
    let course = JSON.parse(localStorage.getItem('courseSeclect'));
    if(course != undefined || course != null){
      this.course = course; 
    }else{
      this.course = null; 
    }
    return this.course; 
  }

  uploadImage(userId, courseId, params: Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+userId+'/uploadImage/'+courseId;

      for(var i=0; i<files.length; i++){
        formData.append(name, files[i], files[i].name)
      }
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('PUT', uri, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

  get
}
