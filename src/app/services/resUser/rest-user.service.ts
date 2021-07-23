import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
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

  public user;
  public token;
  public userSelect;
  helper = new JwtHelperService;

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient, private route: Router) {
    this.uri = CONNECTION.URI;
  }

  //function getUsers
  getUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user != undefined || user != null){
      this.user = user;
    }else{
      this.user = null;
    }
    return this.user;
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

  saveUser(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'signUp', params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  //Function Login
  login(user, token){
    user.gettoken = token;
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'login',params,this.httpOptions).pipe(map(this.extractData));    
  }

  updateUser(userToUpdate){
    let params = JSON.stringify(userToUpdate);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri+'updateUser/'+userToUpdate._id, params, {headers: headers})
    .pipe(map(this.extractData));
  }
  
  removeUser(userDelete, password){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    return this.http.put(this.uri+'removeUser/'+userDelete, {password: password}, {headers: headers})
    .pipe(map(this.extractData));
  }

  uploadImage(idUser:string, params: Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+idUser+'/uploadImage';

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

  loggedIn(){
    const token = this.getToken()
    return this.helper.isTokenExpired(token)
  }

  logOutTokenCheck(){
    let checkToken: boolean;

    const token = this.getToken()
    checkToken == this.helper.isTokenExpired(token)

    if(checkToken == true){
      localStorage.clear();
      console.log('funcion de navigateUrl')      
      return this.route.navigateByUrl('home');
    }
  }
  
}
