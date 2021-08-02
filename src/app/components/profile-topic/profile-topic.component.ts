import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Course } from 'src/app/models/course';
import { Topic } from 'src/app/models/topic';
import { Lesson } from 'src/app/models/lesson';
import { Progress } from 'src/app/models/progress';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { RestTopicService } from 'src/app/services/restTopic/rest-topic.service';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { RestLessonService } from 'src/app/services/restLesson/rest-lesson.service';
import { RestProgressService } from 'src/app/services/restProgress/rest-progress.service';

@Component({
  selector: 'app-profile-topic',
  templateUrl: './profile-topic.component.html',
  styleUrls: ['./profile-topic.component.css']
})
export class ProfileTopicComponent implements OnInit {

  public user: User;
  public course: Course;
  public lesson: Lesson;
  public progress: Progress;
  public uri: string;
  token: string;
  lessons: [];
  lessonsProgress: [[]];
  topic;
  topicSelect: Topic;
  lessonSelect: Lesson;
  index: Number;
  lessonLength: Number;

  constructor(private restUser:RestUserService, private restCourse:RestCourseService, private restTopic:RestTopicService, private restLesson:RestLessonService, private restProgress:RestProgressService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.topic = this.restTopic.getTopicSelect();
    this.user = this.restUser.getUser();
    this.course = this.restCourse.getCourseStorage();
    this.listLessons();
    this.listLessonsProgress();
  }

  listLessons(){
    this.restLesson.getLessons(this.topic).subscribe((res:any) => {
      if(res.lessons){
        this.lessons = res.lessons;
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
  }

  listLessonsProgress(){
    this.restProgress.getProgressTopic(this.user,this.course,this.topic._id).subscribe((res:any) => {
      if(res.topicLessons){
        this.lessonsProgress = res.topicLessons;
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
  }

  obtenerData(lesson, i){
    this.lessonSelect = lesson;
    localStorage.setItem('lessonSelect', JSON.stringify(this.lessonSelect));
  }

  setGrade(grade){
    this.restProgress.updateProgress(this.user,this.course,this.lessonSelect,grade).subscribe((res:any) => {
      if(res.progressUpdated){
        this.progress = res.progressUpdated;
        this.listLessonsProgress()
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
  }

}
