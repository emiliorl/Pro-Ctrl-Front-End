import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestTopicService {

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

  public topic;
  public token;
  public topicSelect;

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

  createTopic(User,Course,Topic){
    let params = JSON.stringify(Topic); 
    return this.http.post(this.uri+'signUp', params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  getTopics(Course){
    return this.http.get(this.uri+Course+'/listTopics', this.httpOptions)
    .pipe(map(this.extractData));
  }

  getTopicSelect(){
    let topicSelect = JSON.parse(localStorage.getItem('topicSelect'));
    if(topicSelect != undefined || topicSelect != null){
      this.topicSelect = topicSelect;
    }else{
      this.topicSelect = null;
    }
    return this.topicSelect;
  }

}
