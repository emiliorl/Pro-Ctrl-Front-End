import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListTopicsComponent } from './components/list-topics/list-topics.component';
import { ProfileTopicComponent } from './components/profile-topic/profile-topic.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';

import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { ListProgressComponent } from './components/list-progress/list-progress.component';
import { ProfileProgressComponent } from './components/profile-progress/profile-progress.component';
import { CreateProgressComponent } from './components/create-progress/create-progress.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: 'Home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'listTopics', component: ListTopicsComponent},
  {path: 'profileTopic', component: ProfileTopicComponent},
  {path: 'profileUser', component: ProfileUserComponent},
  {path: 'createTopic', component: CreateTopicComponent},
  {path: 'editTopic', component: EditTopicComponent},
  {path: 'createCourse', component: CreateCourseComponent},
  {path: 'createProgress', component: ProfileProgressComponent},
  {path: 'listProgress', component: ListProgressComponent},
  {path: 'profileProgress', component: CreateProgressComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
