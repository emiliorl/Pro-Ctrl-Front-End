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
  selector: 'app-create-progress',
  templateUrl: './create-progress.component.html',
  styleUrls: ['./create-progress.component.css']
})

export class CreateProgressComponent implements OnInit {
    public user: User;
    public progress: Progress;
    public topic: Topic;
    public course: Course;
    public uri: string;
    token: string;
    progressSelect: Progress;

    constructor(private restUser:RestUserService, private restProgress:RestProgressService, private route: Router) { 
        this.progress = new Progress('','',[],[],null);
        this.uri = CONNECTION.URI;
        this.user = this.restUser.getUser();
      }
    
    ngOnInit(): void {
    }

    onSubmit(progressSaved){
        this.restProgress.createProgress(this.user, this.course, this.topic,this.progress).subscribe((res:any)=>{
            if(res.progressPush){
                this.progress = new Progress('','',[],[],null);
              progressSaved.reset();
              this.route.navigateByUrl('createProgress');
              alert(res.message);
            }else{
              alert(res.message);
            }
          },
          error => alert(error.message));
        }

}