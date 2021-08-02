import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CONNECTION } from 'src/app/services/global';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';

@Component({
  selector: 'app-profile-course',
  templateUrl: './profile-course.component.html',
  styleUrls: ['./profile-course.component.css']
})
export class ProfileCourseComponent implements OnInit {

  public course : Course; 
  public possiblePass; 
  public user; 
  public token; 
  public uri : string; 
  public typesCourses = ['PUBLIC', 'PRIVATE'];
  public filesToUpload: Array<File>;
  public newPasswordCourse : String;
  public thePassword : String;

  constructor(private restUser : RestUserService, private restCourse : RestCourseService, private route : Router) {
    this.possiblePass = '';
    this.user = this.restUser.getUser();
    this.uri = CONNECTION.URI;
    this.token = this.restUser.getToken();
   }

  ngOnInit(): void {
    this.course = this.restCourse.getCourseStorage();
    this.thePassword = this.course.password;
    console.log('Es el tipo de curso '  + this.course.name);
    if(this.course.type == 'PUBLIC'){
      this.thePassword = null; 
    }
  }

  onSubmit(coursoUpdated){
    if(this.course.type == 'PUBLIC'){
      this.course.password = '';
    }
    this.restCourse.updateCourse(this.user._id, this.course._id, this.course).subscribe((res:any)=>{
      if(res.courseUpdated){
        alert(res.message);
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
  }


  deleteCourse(){
    this.restCourse.deleteCourse(this.user._id, this.course._id, this.possiblePass).subscribe((res:any)=>{
      if(res.courseDelete){
        alert(res.message);
        this.route.navigateByUrl('listCourses');
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.error.message));
  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  uploadImage(){
    this.restCourse.uploadImage(this.user._id, this.course._id, [], this.filesToUpload, this.token, 'imageCourse')
    .then((res : any)=>{
      if(res.imageCourse){
        this.course.imageCourse = res.imageTeam;        
      }else{
        alert(res.message);
      }
    });
  }

  suscribeCourse(){
    if(this.course.type == 'PUBLIC'){
      this.possiblePass == '';
    }
    this.restCourse.incriptionCourse(this.user._id, this.course._id, this.possiblePass).subscribe((res:any)=>{
      if(res.courseProgressPush){
        alert(res.message);
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.error.message));
  }

  updatePassword(){
    this.restCourse.updatePassword(this.user._id, this.course._id, this.possiblePass, this.newPasswordCourse).subscribe((res : any)=>{
      if(res.courseUpdated){
        alert(res.message);
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.error.message));
  }
}
