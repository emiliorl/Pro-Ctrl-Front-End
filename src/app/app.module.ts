import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //formularios y todo lo que lleve consigo, funciones ng
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleChartsModule } from 'angular-google-charts';  

//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ListTopicsComponent } from './components/list-topics/list-topics.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';

import { SearchTopicPipe } from './pipes/searchTopic.pipe';
import { ProfileTopicComponent } from './components/profile-topic/profile-topic.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { ListCoursesComponent } from './components/list-courses/list-courses.component';
import { SearchCoursePipe } from './pipes/search-course.pipe';
import { ProfileCourseComponent } from './components/profile-course/profile-course.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { ReportUserComponent } from './components/report-user/report-user.component';
import { ReportAdminComponent } from './components/report-admin/report-admin.component';

import { ListProgressComponent } from './components/list-progress/list-progress.component';
import { ProfileProgressComponent } from './components/profile-progress/profile-progress.component';
import { CreateProgressComponent } from './components/create-progress/create-progress.component';
import { OverviewCourseComponent } from './components/overview-course/overview-course.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListTopicsComponent,
    CreateTopicComponent,
    SearchTopicPipe,
    ProfileTopicComponent,
    ProfileUserComponent,
    EditTopicComponent,
    CreateCourseComponent,
    ListCoursesComponent,
    SearchCoursePipe,
    ProfileCourseComponent,
    MyCoursesComponent,
    ListProgressComponent,
    ProfileProgressComponent,
    CreateProgressComponent,
    ReportUserComponent,
    ReportAdminComponent,
    OverviewCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
