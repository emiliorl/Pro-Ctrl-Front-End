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
  selector: 'app-profile-lesson',
  templateUrl: './profile-lesson.component.html',
  styleUrls: ['./profile-lesson.component.css']
})
export class ProfileLessonComponent implements OnInit {

  public user: User;
  public course: Course;
  public topic: Topic;
  public lesson: Lesson;
  public uri: string;
  public possiblePass;
  token: string;
  lessonSelect: Lesson;

  constructor(private restUser:RestUserService, private restCourse:RestCourseService, private restTopic:RestTopicService, private restLesson:RestLessonService, private route: Router) { 
    this.uri = CONNECTION.URI;
    this.user = this.restUser.getUser();
    this.topic = this.restTopic.getTopicSelect();
    this.course = this.restCourse.getCourseStorage();
    this.lesson = this.restLesson.getLessonSelect();
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.restLesson.updateLesson(this.user, this.course, this.topic, this.lesson).subscribe((res:any) => {
      if(res.lessonUpdated){
        localStorage.setItem('lessonSelect', JSON.stringify(res.lessonUpdated))
        alert(res.message);
      }else{
        alert(res.message);
        this.lesson = this.restLesson.getLessonSelect();
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  deleteLesson(){
    this.restLesson.deletLesson(this.user, this.course, this.topic, this.lesson, this.possiblePass).subscribe((res:any) => {
      if(res.lessonDelete){
        alert(res.message);
        localStorage.removeItem('lessonSelect');
        this.route.navigateByUrl('listLessons');
      }else{
        alert(res.message);
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

}
