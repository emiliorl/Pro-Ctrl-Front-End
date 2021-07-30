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
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  public user: User;
  public course: Course;
  public topic: Topic;
  public lesson: Lesson;
  public uri: string;
  token: string;
  lessonSelect: Topic;
  
  constructor(private restUser:RestUserService, private restCourse:RestCourseService, private restTopic:RestTopicService, private restLesson:RestLessonService, private route: Router) { 
    this.lesson = new Lesson('','','',null,[]);
    this.uri = CONNECTION.URI;
    this.user = this.restUser.getUser();
    this.course = this.restCourse.getCourseStorage();
    this.topic = this.restTopic.getTopicSelect();
  }

  ngOnInit(): void {
  }

  onSubmit(createLesson){
    console.log(this.lesson)
    this.restLesson.createLesson(this.user, this.topic, this.lesson).subscribe((res:any) => {
      if(res.lessonPush){
        this.lesson = new Lesson('','','',null,[]);
        alert(res.message);
        createLesson.reset();
        this.route.navigateByUrl('listLessons');
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
  }


}
