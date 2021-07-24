import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Progress } from 'src/app/models/progress';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { RestProgressService } from 'src/app/services/restProgress/rest-progress.service';

@Component({
  selector: 'app-list-topics',
  templateUrl: './list-topics.component.html',
  styleUrls: ['./list-topics.component.css']
})
export class ListProgressComponent implements OnInit {

  public user: User;
  public progress: String;
  public uri: string;
  token: string;
  progress1: [];
  progressSelect: Progress;

  constructor(private restUser:RestUserService, private restProgress:RestProgressService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.user = this.restUser.getUser();
    this.getProgress();
  }

  obtenerData(progress){
    this.progressSelect = progress;
    localStorage.setItem('progressSelect', JSON.stringify(this.progressSelect));
    this.route.navigateByUrl('profileProgress')
  }

  getProgress(){
    this.restProgress.getProgress(this.progress).subscribe((res:any) => {
      if(res.progress1){
        this.progress1 = res.progress1;
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message));
  }
}