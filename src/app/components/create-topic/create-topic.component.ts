import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Topic } from 'src/app/models/topic';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { RestTopicService } from 'src/app/services/restTopic/rest-topic.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {

  public user: User;
  public course: String;
  public uri: string;
  token: string;
  topic;
  topicSelect: Topic;

  constructor(private restUser:RestUserService, private restTopic:RestTopicService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.topic = new Topic('','','',[],null,'','');
    this.user = this.restUser.getUser();
  }

  onSubmit(statusForm){
    this.restTopic.createTopic(this.user._id, '',this.topic).subscribe((res:any) => {
      if(res.userSaved){
        this.topic = new Topic('','','',[],null,'','');
        statusForm.reset();
        this.route.navigateByUrl('listTopics');
      }else{
        alert(res.message);
      }
    },
    error => alert(error.message));
  }

}
