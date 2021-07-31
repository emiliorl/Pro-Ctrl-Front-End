import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CONNECTION } from '../global';
import { count, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestReportService {
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

  public report;
  public token;
  public reportSelect;

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

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  createReport(Report, User){
    let params = JSON.stringify(Report); 
    return this.http.post(this.uri+User._id+'/createReport', params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  getReport(User){
    return this.http.get(this.uri+User._id+'/listReportUser', this.httpOptions)
    .pipe(map(this.extractData));
  }

  getReportSelect(){
    let reportSelect = JSON.parse(localStorage.getItem('reportSelect'));
    if(reportSelect != undefined || reportSelect != null){
      this.reportSelect = reportSelect;
    }else{
      this.reportSelect = null;
    }
    return this.reportSelect;
  }

  updateReport(User,Report){
    let params = JSON.stringify(Report);
    return this.http.put(this.uri+'/'+User._id+'/'+Report._id+'/updateReport/', params, this.httpOptionAuth)
    .pipe(map(this.extractData));
  }

  deleteReport(User, Report, possiblePassword){
    return this.http.post(this.uri+User._id+'/'+Report._id+'/deleteReport/', {password : possiblePassword} ,this.httpOptionAuth)
    .pipe(map(this.extractData));
  }
}
