import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userLogged: User;

  constructor(public restUser:RestUserService, public route:Router) {    
    this.userLogged = new User('','','','','',null,'','','');
  }

  ngOnInit(): void {
    if(this.userLogged != null && !this.restUser.loggedIn){
      console.log(":'D")
    }else{
      this.logOut();
    }
  }

  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('home')
  }

}
