import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { Router } from '@angular/router';
import { CONNECTION } from '../../services/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userLogged: User;
  public user: User;
  public userLog: User;
  public token: string;
  uri;
  public optionsRol = ['ALUMNO', 'MAESTRO'];

  constructor(private restUser: RestUserService, private route:Router) {
    this.userLogged = new User('','','','','',null,'','','');
    this.user = new User('','','','','',null,'','','');
    this.userLog = new User('','','','','',null,'','','');
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    this.uri = CONNECTION.URI;
  }  

  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.userLogged = this.restUser.getUser();
  }

  onSubmit(register){
    this.restUser.saveUser(this.user).subscribe((res:any) => {
      if(res.userSaved){
        alert(res.message);
        register.reset();
      }else{
        alert(res.message);
      }
    });
    
    error => console.log(<any>error);
  }
  
  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('home')
  }

  functionLogin(){
    this.restUser.login(this.userLog, 'true').subscribe((res:any) => {
      this.userLogged = res.userFind;
      console.log('datos recibidos: '+ this.userLogged)
      if(!res.token){
        alert(res.message);
      }else{
        this.token = res.token;
        if(this.token.length <= 0){
          alert('El token no se genero de manera correcta');
        }else{
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.userLogged));
          alert('Usuario logeado correctamente');
          this.route.navigateByUrl('home');
        }
      }
    },
      (error:any) => alert(error.error.message)
    )
  }
}
