import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { RegisterComponent } from './components/register/register.component';
import { ListTopicsComponent } from './components/list-topics/list-topics.component';
import { ProfileTopicComponent } from './components/profile-topic/profile-topic.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: 'Home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'listTopics', component: ListTopicsComponent},
  {path: 'profileTopic', component: ProfileTopicComponent},
  {path: 'profileUser', component: ProfileUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
