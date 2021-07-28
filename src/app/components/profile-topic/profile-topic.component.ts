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
  selector: 'app-profile-topic',
  templateUrl: './profile-topic.component.html',
  styleUrls: ['./profile-topic.component.css']
})
export class ProfileTopicComponent implements OnInit {

  public user: User;
  public course: Course;
  public uri: string;
  token: string;
  topic;
  topicSelect: Topic;

  constructor(private restUser:RestUserService, private restCourse:RestCourseService, private restTopic:RestTopicService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.topic = this.restTopic.getTopicSelect();
    this.user = this.restUser.getUser();
    this.course = this.restCourse.getCourseStorage();
  }

}
