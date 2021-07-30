import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { count, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestLessonService {

  public uri:string;
  
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

  public lesson;
  public token;
  public lessonSelect;

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token != undefined || token != null){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  createLesson(User,Topic,Lesson){
    let params = JSON.stringify(Lesson); 
    return this.http.post(this.uri+User._id+'/'+Topic._id+'/createLesson', params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  getLessons(Topic){
    return this.http.get(this.uri+Topic._id+'/listLessons', this.httpOptions)
    .pipe(map(this.extractData));
  }

  getLessonSelect(){
    let lessonSelect = JSON.parse(localStorage.getItem('lessonSelect'));
    if(lessonSelect != undefined || lessonSelect != null){
      this.lessonSelect = lessonSelect;
    }else{
      this.lessonSelect = null;
    }
    return this.lessonSelect;
  }

  updateLesson(User, Course, Topic, Lesson){
    let params = JSON.stringify(Lesson);
    return this.http.put(this.uri+'/'+User._id+'/'+Course._id+'/'+Topic._id+'/updateLesson/'+Lesson._id, params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  deletLesson(User, Course, Topic, Lesson, possiblePassword){
    return this.http.post(this.uri+User._id+'/'+Course._id+'/'+Topic._id+'/removeLesson/'+Lesson._id, {password : possiblePassword} ,this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

}
