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
  selector: 'app-list-topics',
  templateUrl: './list-topics.component.html',
  styleUrls: ['./list-topics.component.css']
})
export class ListTopicsComponent implements OnInit {

  public user: User;
  public course: Course;
  public uri: string;
  token: string;
  topics: [];
  topic;
  searchTopic;
  topicSelect: Topic;

  constructor(private restUser:RestUserService,  private restCourse:RestCourseService, private restTopic:RestTopicService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.course = this.restCourse.getCourseStorage();
    this.listTopics();
  }

  obtenerData(topic){
    this.topicSelect = topic;
    localStorage.setItem('topicSelect', JSON.stringify(this.topicSelect));
    this.route.navigateByUrl('profileTopic')
  }

  editTopic(topic){
    this.topicSelect = topic;
    localStorage.setItem('topicSelect', JSON.stringify(this.topicSelect));
    this.route.navigateByUrl('editTopic')
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

}
