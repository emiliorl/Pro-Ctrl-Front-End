import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RestProgressService {

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

  public token;
  public progressSelect;

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



  createProgress(User,Course,Topic,Progress){
    let params = JSON.stringify(Progress); 
    return this.http.post(this.uri+User._id+'/'+Course+'/'+Topic+'/'+Course+'/createProgress', params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  getProgress(User,Course){
    return this.http.post(this.uri+User._id+'/'+Course._id+'/listProgress',null,this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  getProgressSelect(){
    let progressSelect = JSON.parse(localStorage.getItem('progressSelect'));
    if(progressSelect != undefined || progressSelect != null){
      this.progressSelect = progressSelect;
    }else{
      this.progressSelect = null;
    }
    return this.progressSelect;
  }

  updateProgress(User,Course,Lesson,Grade){
    return this.http.put(this.uri+User._id+'/'+Course._id+'/'+Lesson._id+'/updateProgress', {grade: Grade}, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  deleteProgress(User, Progress){
    return this.http.post(this.uri+User._id+'/removeTopic/'+Progress._id,this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

}