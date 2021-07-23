import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //formularios y todo lo que lleve consigo, funciones ng
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ListTopicsComponent } from './components/list-topics/list-topics.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';

import { SearchTopicPipe } from './pipes/searchTopic.pipe';
import { ProfileTopicComponent } from './components/profile-topic/profile-topic.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { EditTopicComponent } from './components/edit-topic/edit-topic.component';

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
    EditTopicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
