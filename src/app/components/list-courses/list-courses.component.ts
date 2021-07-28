import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CONNECTION } from 'src/app/services/global';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

  public user; 
  public course : Course; 
  public typesCourses = ['PUBLIC', 'PRIVATE'];
  public listCourses = [];
  public token : String;
  courseSelected : Course;
  searchCourse;  
  public uri : String; 

  constructor(private restCourses : RestCourseService, private restUser : RestUserService, private route : Router) {
    this.user = this.restUser.getUser(); 
    this.uri = CONNECTION.URI; 
   }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token == null){
      this.coursesPublic();
    }else{
      this.allCourses();
    }   
  }

  obtenerData(courseSelect){
    this.courseSelected = courseSelect;
    localStorage.setItem('courseSeclect', JSON.stringify(this.courseSelected));
    this.route.navigateByUrl('courseOverview');
  }

  coursesPublic(){
    this.restCourses.getCoursesPublic().subscribe((res : any)=>{
      if(res.coursesFind){
        this.listCourses = res.coursesFind;
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
  }

  allCourses(){
    this.restCourses.listAllCourses().subscribe((res : any)=>{
      if(res.coursesFind){
        this.listCourses = res.coursesFind;
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
  }
}
