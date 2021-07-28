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
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {

  public user: User;
  public course: Course;
  public topic: Topic;
  public uri: string;
  token: string;
  topicSelect: Topic;

  constructor(private restUser:RestUserService, private restCourse:RestCourseService, private restTopic:RestTopicService, private route: Router) { 
    this.topic = new Topic('','','',[],null,'','');
    this.uri = CONNECTION.URI;
    this.user = this.restUser.getUser();
    this.course = this.restCourse.getCourseStorage();
  }

  ngOnInit(): void {
  }

  onSubmit(createForm){
    this.restTopic.createTopic(this.user, this.course, this.topic).subscribe((res:any) => {
      if(res.coursePush){
        this.topic = new Topic('','','',[],null,'','');
        alert(res.message);
        createForm.reset();
        this.route.navigateByUrl('listTopics');
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message));
  }

}
