import { Component } from '@angular/core';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'samcomTask';

  constructor(private commonService: CommonService){
    // if(localStorage.getItem('token')){
    //   this.commonService.navigateTo('/app')
    // }else{
    //   this.commonService.navigateTo('')
    // }
  }

}
