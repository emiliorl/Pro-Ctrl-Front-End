import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Progress } from 'src/app/models/progress';
import { Topic } from 'src/app/models/topic';
import { Course } from 'src/app/models/course';
import { RestUserService } from 'src/app/services/resUser/rest-user.service';
import { RestProgressService } from 'src/app/services/restProgress/rest-progress.service';

@Component({
  selector: 'app-profile-topic',
  templateUrl: './profile-topic.component.html',
  styleUrls: ['./profile-topic.component.css']
})
export class ProfileProgressComponent implements OnInit {

    public user: User;
    public progress: Progress;
    public topic: Topic;
    public course: Course;
    public uri: string;
    token: string;
    progressSelect: Progress;

  constructor(private restUser:RestUserService, private restProgress:RestProgressService, private route: Router) { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.topic = this.restProgress.getProgressSelect();
    this.user = this.restUser.getUser();
  }

  obtenerData(progress){
    this.progressSelect = progress;
    this.route.navigateByUrl('profileProgress')
  }

  onSubmit(){
    this.restProgress.updateProgress(this.user, this.progress).subscribe((res:any) => {
      if(res.progressUpdate){
        localStorage.setItem('progressSelect', JSON.stringify(res.progressUpdate))
        alert(res.message);
      }else{
        alert(res.message);
        this.progress = this.restProgress.getProgressSelect();
      }
    },
    (error:any) => alert(error.error.message)
    )
  }

  deleteProgress(){
    this.restProgress.deleteProgress(this.user._id ,this.progress._id).subscribe((res:any) => {
      if(!res.progressRemoved){
        alert(res.message);
      }else{
        alert(res.message);
        localStorage.removeItem('progressSelect');
        this.route.navigateByUrl('listProgress');
      }
    },
    (error:any) => alert(error.message)
    )
  }

}