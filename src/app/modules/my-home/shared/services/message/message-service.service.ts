import { Injectable } from '@angular/core';
import { message } from '../..';
// import { message } from '../../models/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor() { }
  // dateObj = new Date();
      
  //   // subtract one day from current time                        
  // dateObj.setDate(dateObj.getDate() - 1);
      
  //   alert(dateObj);
  previousDate = new Date();

  updateDate(){
    this.previousDate.setDate(this.previousDate.getDate() - 1);
  }
   
  private messages:message[]=[
    {senderId:1,senderName:'Akash',profileImageURl:'',postedOn: new Date(),conntent:'Hi here nothing there'},
    {senderId:2,senderName:'Rakesh',profileImageURl:'',postedOn: new Date(),conntent:'Hi here nothing there'},
    {senderId:3,senderName:'mukesh',profileImageURl:'',postedOn: new Date(),conntent:'Hi here nothing there'},
    {senderId:4,senderName:'somesh',profileImageURl:'',postedOn: new Date(),conntent:'Hi here nothing there'},
    {senderId:5,senderName:'Sailesh',profileImageURl:'',postedOn: new Date(),conntent:'Hi here nothing there'},
    {senderId:6,senderName:'Lokesh',profileImageURl:'',postedOn: new Date(),conntent:'Hi here nothing there'},
    {senderId:7,senderName:'Rajesh',profileImageURl:'',postedOn: new Date(),conntent:'Hi here nothing there'},
    {senderId:8,senderName:'prakash',profileImageURl:'',postedOn: new Date(),conntent:'Hi here nothing there'},
    {senderId:9,senderName:'Rupesh',profileImageURl:'',postedOn: new Date(),conntent:'Hi here nothing there'},
    {senderId:10,senderName:'sharma',profileImageURl:'',postedOn: new Date(),conntent:'Hi here nothing there'},

  ]
  getData(){
    return this.messages;
  }
}
