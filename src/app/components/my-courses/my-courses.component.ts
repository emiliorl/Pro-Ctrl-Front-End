import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { CONNECTION } from 'src/app/services/global';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  public user; 
  public course : Course; 
  public uri : String; 
  public listCourses = [];
  courseSelected : Course;


  constructor(private restCourses : RestCourseService, private restUser : RestUserService, private route : Router) { 
    this.user = this.restUser.getUser(); 
    this.uri = CONNECTION.URI; 
  }

  ngOnInit(): void {
    this.coursesPublic();
  }


  obtenerData(courseSelect){
    this.courseSelected = courseSelect;
    localStorage.setItem('courseSeclect', JSON.stringify(this.courseSelected));
    this.route.navigateByUrl('profileCourse');
  }

  coursesPublic(){
    this.restCourses.listCoursesAdmin(this.user._id).subscribe((res : any)=>{
      if(res.coursesFind){
        this.listCourses = res.coursesFind;
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
  }
}
