import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTopic'
})
export class SearchTopicPipe implements PipeTransform {

  transform(topics: any, searchTopic: any): any {
    if(searchTopic == undefined || searchTopic == ''){
      return topics;
    }else{
      return topics.filter(topic =>{
        if(topic.nameTopic.toLowerCase().includes(searchTopic.toLowerCase())){
          return topic
        }
      })
    }
  }

}
