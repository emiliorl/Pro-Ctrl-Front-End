import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListTopicsComponent } from './components/list-topics/list-topics.component';
import { ProfileTopicComponent } from './components/profile-topic/profile-topic.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { ReportUserComponent } from './components/report-user/report-user.component';

import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
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
  {path: 'reportUser', component: ReportUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
