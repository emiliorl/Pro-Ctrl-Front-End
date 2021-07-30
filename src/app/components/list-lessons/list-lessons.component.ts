import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Course } from 'src/app/models/course';
import { Topic } from 'src/app/models/topic';
import { Lesson } from 'src/app/models/lesson';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { RestTopicService } from 'src/app/services/restTopic/rest-topic.service';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { RestLessonService } from 'src/app/services/restLesson/rest-lesson.service';

@Component({
  selector: 'app-list-lessons',
  templateUrl: './list-lessons.component.html',
  styleUrls: ['./list-lessons.component.css']
})
export class ListLessonsComponent implements OnInit {

  public user: User;
  public topic: Topic;
  public course: Course;
  public uri: string;
  token: string;
  lessons: [];
  lesson;
  searchTopic;
  lessonSelect: Lesson;

  constructor(private restUser:RestUserService,  private restCourse:RestCourseService, private restTopic:RestTopicService, private restLesson:RestLessonService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.course = this.restCourse.getCourseStorage();
    this.topic = this.restTopic.getTopicSelect();
    this.listTopics();
  }

  obtenerData(lesson){
    this.lessonSelect = lesson;
    localStorage.setItem('lessonSelect', JSON.stringify(this.lessonSelect));
    this.route.navigateByUrl('profileLesson')
  }

  editTopic(lesson){
    this.lessonSelect = lesson;
    localStorage.setItem('lessonSelect', JSON.stringify(this.lessonSelect));
    this.route.navigateByUrl('profileLesson')
  }

  listTopics(){
    this.restLesson.getLessons(this.topic).subscribe((res:any) => {
      if(res.lessons){
        this.lessons = res.lessons;
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
  }

}
