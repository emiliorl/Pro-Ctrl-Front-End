import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCourse'
})
export class SearchCoursePipe implements PipeTransform {

  transform(courses: any, searchCourse: any): any {
    if(searchCourse == undefined || searchCourse == ''){
      return courses;
    }else{
      return courses.filter(course =>{
        if(course.name.toLowerCase().includes(searchCourse.toLowerCase())){
          return course
        }
      })
    }
  }

}
