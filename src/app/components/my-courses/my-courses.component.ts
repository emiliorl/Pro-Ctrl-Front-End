import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Progress } from 'src/app/models/progress';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { RestProgressService } from 'src/app/services/restProgress/rest-progress.service';
import { CONNECTION } from 'src/app/services/global';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  public user; 
  public course : Course; 
  public progress : Progress; 
  public uri : String; 
  public listCourses = [];
  courseSelected : Course;
  result : number[] = [];
  courseNo: number;

  constructor(private restCourses : RestCourseService, private restUser : RestUserService, private restProgress : RestProgressService, private route : Router) { 
    this.user = this.restUser.getUser(); 
    this.uri = CONNECTION.URI; 
  }

  ngOnInit(): void {
    this.coursesPublic();
  }


  obtenerData(courseSelect){
    this.courseSelected = courseSelect;
    localStorage.setItem('courseSeclect', JSON.stringify(this.courseSelected));
    this.route.navigateByUrl('/profileCourse');
  }

  goToCourse(courseSelect){
    this.courseSelected = courseSelect;
    localStorage.setItem('courseSeclect', JSON.stringify(this.courseSelected));
    this.route.navigateByUrl('/courseOverview');
  }

  reportAdmin(courseSelect){
    this.courseSelected = courseSelect;
    localStorage.setItem('courseSeclect', JSON.stringify(this.courseSelected));
    this.route.navigateByUrl('/reportAdmin');
  }

  reportUser(courseSelect){
    this.courseSelected = courseSelect;
    localStorage.setItem('courseSeclect', JSON.stringify(this.courseSelected));
    this.route.navigateByUrl('/reportUser');
  }

  coursesPublic(){
    this.restCourses.listMyCourses(this.user._id).subscribe((res : any)=>{
      if(res.coursesFind){
        this.listCourses = res.coursesFind;
        if(this.user.rol == 'ALUMNO'){
          for(var i = 0; i<this.listCourses.length;i++){
            this.checkTotalProgress(this.listCourses[i]);
          }
        }
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
  }

  checkTotalProgress(course){
    this.restProgress.getProgress(this.user,course).subscribe((res:any) => {
      if(res.progressFind){
        var numbers = res.progressFind.grades;
        var sum = numbers.reduce((a, b) => a + b, 0);
        var result = sum/numbers.length;
        if(isNaN(result)){
          result = null;
        }
        this.result.push(result);
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
  }

}
