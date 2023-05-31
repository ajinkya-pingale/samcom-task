import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) { }

  login(body: any){
    let userData = [];
    let result: any = null;
    userData = this.fetchUserData()
    console.log(userData, body);
    if(userData){
      for(let eachUser of userData){
        console.log(eachUser)
        if(eachUser?.['email'] === body?.['emailId'] && eachUser?.['password'] === body?.['password']){
          localStorage.setItem('token', JSON.stringify(eachUser))
          result = true;
        }else{
          result = 'No User Found';
        }
      }
    }else{
      result = 'No User Found';
    }
    return result;
  }

  navigateTo(url: string){
    this.router.navigateByUrl(url)
  }

  fetchUserData(){
    let userData: any = localStorage.getItem('userData');
    return JSON.parse(userData);
  }

  addNewUser(userData: any = {}){
    let userArray = [];
    userArray.push(userData)
    localStorage.setItem('userData', JSON.stringify(userArray));
    return true;
  }

  getLoggedInUser(){
    let userDetails: any = localStorage.getItem('token');
    return JSON.parse(userDetails)
  }

  fetchAllUsers(){
    let use
  }

  logout(){
    localStorage.removeItem('token');
    location.reload()
  }

}
