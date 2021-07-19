import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: User;
  public optionsRol = ['ALUMNO', 'MAESTRO'];

  constructor(private userService: RestUserService, private route:Router) {
    this.user = new User('','','','','',null,'','','');
  }

  ngOnInit(): void {
  }

  onSubmit(register){
    this.userService.saveUser(this.user).subscribe((res:any) => {
      if(res.userSaved){
        alert(res.message);
        register.reset();
        this.route.navigateByUrl('home');
      }else{
        alert(res.message);
      }
    });
    
    error => console.log(<any>error);
  }

}
