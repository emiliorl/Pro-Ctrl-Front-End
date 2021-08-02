import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Course } from 'src/app/models/course';
import { Topic } from 'src/app/models/topic';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { RestTopicService } from 'src/app/services/restTopic/rest-topic.service';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';

@Component({
  selector: 'app-overview-course',
  templateUrl: './overview-course.component.html',
  styleUrls: ['./overview-course.component.css']
})
export class OverviewCourseComponent implements OnInit {

  public user: User;
  public course;
  public uri: string;
  public possiblePass; 
  token: string;
  topics: [];
  topic;
  searchTopic;
  topicSelect: Topic;
  courseSelected: Course;
  findProgress = false; 

  constructor(private restUser:RestUserService, private restCourse:RestCourseService, private restTopic:RestTopicService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.course = this.restCourse.getCourseStorage();
    this.listTopics();
    if(this.user != null || this.user != undefined){
      if(this.user.rol == 'ALUMNO'){
        this.verifyProgress();
      }
    }
  }

  obtenerData(topic){
    this.topicSelect = topic;
    localStorage.setItem('topicSelect', JSON.stringify(this.topicSelect));
    this.route.navigateByUrl('profileTopic')
  }

  obtenerCourse(courseSelect){
    this.courseSelected = courseSelect;
    localStorage.setItem('courseSeclect', JSON.stringify(this.courseSelected));
    this.route.navigateByUrl('profileCourse');
  }

  listTopics(){
    this.restTopic.getTopics(this.course).subscribe((res:any) => {
      if(res.topics){
        this.topics = res.topics;
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
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

  verifyProgress(){
    this.restCourse.verifyProgress(this.user._id, this.course._id).subscribe((res:any)=>{
      if(res.progressFinded == true){
        this.findProgress = true;
      }else if (res.progressFinded == false){
        this.findProgress = false;
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.error.message));
  }
}
