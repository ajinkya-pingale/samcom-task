import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private commonService: CommonService) { }
  userDetails: any;
  ticketData: any = [];
  allUsers = []
  ngOnInit(): void {
    for(let i=1; i<= 10; i++){
      let obj: any = {
        ticketNo: String(i),
        price: i * 20
      }
      this.ticketData.push(obj)
    }
    this.getLoggedInUser()
  }

  getAllUsers(){
    this.allUsers = this.commonService.fetchUserData()
  }

  getLoggedInUser(){
    this.userDetails = this.commonService.getLoggedInUser()
  }

  ticketsArray: any = []
  bookSeat(ticketData: any){
    let obj = {
      ticketNo: ticketData['ticketNo']
    }
    let tickets = []
    this.ticketsArray.push(obj)

  }

  bookTickets(){

  }

  logoutUser(){
    this.commonService.logout()
  }

}
