import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';

@Component({
  selector: 'app-profile-course',
  templateUrl: './profile-course.component.html',
  styleUrls: ['./profile-course.component.css']
})
export class ProfileCourseComponent implements OnInit {

  public course; 
  public possiblePass; 
  public user; 
  public token; 
  public uri; 
  public typesCourses = ['PUBLIC', 'PRIVATE'];
  public filesToUpload: Array<File>;

  constructor(private restUser : RestUserService, private restCourse : RestCourseService, private route : Router) {
    this.possiblePass = '';
    
   }

  ngOnInit(): void {
    this.course = this.restCourse.getCourseStorage();
    this.user = this.restUser.getUser();
  }

  onSubmit(coursoUpdated){

  }


  deleteCourse(){

  }

  fileChange(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  uploadImage(){
    
  }
}
