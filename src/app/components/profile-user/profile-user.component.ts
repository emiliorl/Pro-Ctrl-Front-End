import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CONNECTION } from 'src/app/services/global';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  public user: User;
  public token;
  public possiblePass;
  public uri: string;
  public filesToUpload: Array<File>;

  constructor(private restUser:RestUserService, private router:Router) {
    this.possiblePass = '';
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {    
    if(this.user != null && !this.restUser.loggedIn){
      console.log(":'D")
    }else{
      this.logOut();
    }
  }

  onSubmit(){
    delete this.user.password;
    delete this.user.rol;
    this.restUser.updateUser(this.user).subscribe((res:any) => {
      if(res.userUpdated){
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
        alert(res.message)
      }else{
        alert(res.message);
        this.user = this.restUser.getUser();
      }
    },
      (error:any) => alert(error.error.message)
    )
  }

  deleteUser(){
    this.restUser.removeUser(this.user._id, this.possiblePass).subscribe((res:any) => {
      if(!res.userRemoved){
        alert(res.message)
      }else{
        alert(res.message);
        localStorage.clear();
        this.router.navigateByUrl('home');
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  uploadImage(){
    this.restUser.uploadImage(this.user._id, [], this.filesToUpload, this.token, 'image')
    .then((res:any) => {
      if(res.user){
        this.user.image = res.userImage;
        localStorage.setItem('user', JSON.stringify(this.user));
      }else{
        alert(res.message)
      }
    })
  }  

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('home')
  }

}
