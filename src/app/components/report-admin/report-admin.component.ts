import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Topic } from 'src/app/models/topic';
import { Course } from 'src/app/models/course';
import { Lesson } from 'src/app/models/lesson';
import { Progress } from 'src/app/models/progress';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { RestTopicService } from 'src/app/services/restTopic/rest-topic.service';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { RestLessonService } from 'src/app/services/restLesson/rest-lesson.service';
import { RestProgressService } from 'src/app/services/restProgress/rest-progress.service';


@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.css']
})
export class ReportAdminComponent implements OnInit {

  public user: User;
  public course: Course;
  public lesson: Lesson;
  public progress: Progress;
  public uri: string;
  token: string;
  progressUsers: [];
  percentages: number[] = [];
  topic;
  searchTopic;
  topicSelect: Topic;
  data = [];
  columnNames=['Name','Points'];
  options={
    legend: 'none',
    pieSliceText: 'none',
    enableInteractivity: false,
    colors: ['#0380A8','#ADE8F4']
   };

  constructor(private restUser:RestUserService, private restCourse:RestCourseService, private restTopic:RestTopicService,  private restLesson:RestLessonService,  private restProgress:RestProgressService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.course = this.restCourse.getCourseStorage();
    this.checkTotalProgress();
  }

  checkTotalProgress(){
    this.restProgress.getProgressAdmin(this.user,this.course).subscribe((res:any) => {
      if(res.progressFind){
        res.progressFind.map(user => {
          var numbers = user.grades;
          var sum = numbers.reduce((a, b) => a + b, 0);
          var result = sum/numbers.length;
          this.percentages.push(result);
        })
        this.progressUsers = res.progressFind;
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
  }

}
