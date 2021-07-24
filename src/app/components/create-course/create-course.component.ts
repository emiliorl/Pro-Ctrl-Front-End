import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  public user; 
  public course; 
  public typesCourses = ['PUBLIC', 'PRIVATE'];
  public typeSelect : false; 

  constructor(private resUser : RestUserService, private route : Router, private restCourse : RestCourseService) { 
    this.course = new Course('','','', null ,'','','','',[],[],[]);
    this.user = this.resUser.getUser()._id;
  }

  ngOnInit(): void {

  }

  onSubmit(courseSave){
    this.restCourse.createCourse(this.user, this.course).subscribe((res:any)=>{
      if(res.coursePush){
        this.course = new Course('','','', null ,'','','', '',[],[],[]);
        courseSave.reset();
        alert(res.message);
      }else{
        alert(res.message);
      }
    },
    error => alert(error.message));
  }
}
