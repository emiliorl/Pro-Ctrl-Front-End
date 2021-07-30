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
import { ListCoursesComponent } from './components/list-courses/list-courses.component';

import { ListProgressComponent } from './components/list-progress/list-progress.component';
import { ProfileProgressComponent } from './components/profile-progress/profile-progress.component';
import { CreateProgressComponent } from './components/create-progress/create-progress.component';
import { ProfileCourseComponent } from './components/profile-course/profile-course.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { OverviewCourseComponent } from './components/overview-course/overview-course.component';
import { CreateLessonComponent } from './components/create-lesson/create-lesson.component';
import { ListLessonsComponent } from './components/list-lessons/list-lessons.component';
import { ProfileLessonComponent } from './components/profile-lesson/profile-lesson.component';

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
  {path: 'listCourses', component: ListCoursesComponent},
  {path: 'profileCourse', component : ProfileCourseComponent},
  {path: 'myCourses', component : MyCoursesComponent},
  {path: 'createProgress', component: ProfileProgressComponent},
  {path: 'listProgress', component: ListProgressComponent},
  {path: 'profileProgress', component: CreateProgressComponent},
  {path: 'reportUser', component: ReportUserComponent},
  {path: 'courseOverview', component: OverviewCourseComponent},
  {path: 'createLesson', component: CreateLessonComponent},
  {path: 'listLessons', component: ListLessonsComponent},
  {path: 'profileLesson', component: ProfileLessonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
