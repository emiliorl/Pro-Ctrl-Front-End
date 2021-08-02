import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { count, map } from 'rxjs/operators';

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
    return this.http.post(this.uri+User._id+'/'+Course._id+'/createTopic', params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  getTopics(Course){
    return this.http.get(this.uri+Course._id+'/listTopics', this.httpOptions)
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

  updateTopic(User,Course, Topic){
    let params = JSON.stringify(Topic);
    return this.http.put(this.uri+'/'+User._id+'/'+Course._id+'/updateTopic/'+Topic._id, params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  deleteTopic(User, Course, Topic, possiblePassword){
    return this.http.post(this.uri+User._id+'/'+Course._id+'/removeTopic/'+Topic._id, {password : possiblePassword} ,this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  uploadImage(idUser:string, courseId:String, topicId:string, params: Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+idUser+'/'+courseId+'/uploadImageTopic/'+topicId;

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

}
