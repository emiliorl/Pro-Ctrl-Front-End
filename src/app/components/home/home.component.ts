import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logging } from 'protractor';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: User;
  public token: string;

  constructor(public restUser:RestUserService, public route:Router) {    
    this.user = new User('','','','','',null,'','','');
  }

  ngOnInit(): void {
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
    if(this.restUser.loggedIn() == true){
      localStorage.clear();
      this.route.navigateByUrl('home');
    }   
  }

  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('home')
  }

}
