import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

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

  getProgress(Progress){
    return this.http.get(this.uri+Progress+'/listProgress', this.httpOptions)
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

  updateProgress(User,Progress){
    let params = JSON.stringify(Progress);
    return this.http.put(this.uri+'/'+User._id+'/updateTopic/'+Progress._id, params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  deleteProgress(User, Progress, possiblePassword){
    return this.http.post(this.uri+User._id+'/removeTopic/'+Progress._id, {password : possiblePassword} ,this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

}