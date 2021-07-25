import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Topic } from 'src/app/models/topic';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { RestTopicService } from 'src/app/services/restTopic/rest-topic.service';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent implements OnInit {

  public user: User;
  public course: String;
  public uri: string;
  token: string;
  topics: [];
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

  constructor(private restUser:RestUserService, private restTopic:RestTopicService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.course = "60f5f30629d18b0b52e47c7d";
    this.listTopics();
  }

  obtenerData(topic){
    this.topicSelect = topic;
    localStorage.setItem('topicSelect', JSON.stringify(this.topicSelect));
    this.route.navigateByUrl('profileTopic')
  }

  listTopics(){
    this.restTopic.getTopics(this.course).subscribe((res:any) => {
      if(res.topics){
        this.topics = res.topics;
        var numbers = res.topics.map(topic => topic.level);
        var sum = numbers.reduce((a, b) => a + b, 0);
        var result = sum/numbers.length;
        console.log(result)
        this.data = [["total",10],["Progress",result]]
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
  }

}
