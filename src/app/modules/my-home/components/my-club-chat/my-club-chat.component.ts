import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {  ChatUpdateLogs, Club, ClubDetails, ClubMessages, ClubService, MessageServiceService, MuteClubComponent, ScrollToBottomDirectiveDirective, UnmuteClubComponent } from "../..";
import { AuthServiceService } from "src/app/core";
import { LeaveClubComponent } from "src/app/shared";
import { switchMap, concatMap, mergeMap, map, tap, Subject, takeUntil, catchError, of } from 'rxjs';

@Component({
  selector: 'app-my-club-chat',
  templateUrl: './my-club-chat.component.html',
})


export class MyClubChatComponent implements OnInit{

  @ViewChild('cmp' , {static : true}) parentContainer ! : ElementRef  ;

  @ViewChild(ScrollToBottomDirectiveDirective)
  scroll: ScrollToBottomDirectiveDirective;
  currentUserId : number;
  clubName: string;
  clubId: number;
  data: ClubDetails ;
  selectedChat: Club;
  attachmentsArray : {name : string , value : File}[]=[];
  isClubFavourite: boolean;
  isClubMuted: boolean;
  textEmoji: string;
  modalRef: BsModalRef;
  merged: any[] = [];
  message : string ='';
  fileSelectedArray : File[]=[];

  constructor( private activatedRoute: ActivatedRoute, 
    private clubService: ClubService, 
    private messageService: MessageServiceService, 
    private modalSerivce: BsModalService ,private authService : AuthServiceService, 
    private router : Router) {};
  

  ngOnInit(): void {    
    this.currentUserId = this.authService.getCurrentUserId();
    this.activatedRoute.paramMap.pipe(
      switchMap(value => {
        this.clubId = parseInt(value.get('id'));
        this.clubName = this.clubService.getClubName(this.clubId);
        return this.clubService.getClubDataObservable();
      }),
      switchMap(clubData => {
        this.selectedChat = clubData.find(u => u.clubId === this.clubId);
        if(this.selectedChat) {
          this.isClubFavourite = this.selectedChat.isFavourite;
          this.isClubMuted = this.selectedChat.isNotificationsMuted;
        }
        return this.updateClubMessages();
      }),
      switchMap(() => {
        return this.messageService.getClubMessageObservable().pipe(
          map((data)=> {
            data.clubMessages.forEach((ele)=>{ 
              if(!ele.postedOn.getTimezoneOffset) ele.postedOn = this.getISTime(ele.postedOn)
            });
            data.updateLogs.forEach((ele)=>{ 
              if(!ele.postedOn.getTimezoneOffset) ele.postedOn = this.getISTime(ele.postedOn)      
            });            
            return data;
          })
        )
      })
     ).subscribe({
        next:(data : ClubDetails) => {
          if(data && data != this.data) {
            this.data = data;
            this.sortMessages();
          }
        },
        error:(err)=>{
          this.data = null;
          console.log('got error in getting current club chat',err)
        },
        complete:()=>{}
      });  
  }

  removeFromAttachement(index: number,name : string) {
    this.attachmentsArray.splice(index,1);
  }

  getMessages(){
    this.messageService.getClubMessageObservable().
    subscribe({
      next:(data : ClubDetails) => {
        if(data && data != this.data) {
          this.data = data;
          this.sortMessages();

        }
      },
      error:(err)=>{
        this.data = null;
        console.log('got error in getting current club chat',err)
      },
      complete:()=>{}
    })
  }

  fileSelected(event)
  {
    this.fileSelectedArray= Array.from(event.target.files);    
    this.fileSelectedArray.forEach((ele)=> {
      this.attachmentsArray.push({
          name : ele.name,
          value : ele
        });
      }
    );
  }

  sendMessage() {
    if(this.message.trim().length!=0 || this.attachmentsArray.length!=0){
      const formData = new FormData();
      formData.append('msg',this.message);
      if(this.attachmentsArray.length > 0){
        this.attachmentsArray.forEach((ele)=>{
          formData.append(ele.name,ele.value);
        });
      }
      this.postMessage(formData);
      this.sortMessages();
    }
  }

  postMessage(msg : FormData){
    this.messageService.postClubMessage(this.clubId , msg).pipe(
      tap(()=>{
        this.message='';
        if(this.attachmentsArray.length!=0) this.attachmentsArray=[];
      }),
      switchMap(()=> this.updateClubMessages()),
      switchMap(()=> this.updateThisClub())
    ).subscribe();
  }

  updateThisClub(){
    return this.clubService.fetchClubList().pipe(
      tap((response) => this.clubService.updateToObservable(response)),
      catchError((error , caught)  => {
        console.log(caught,error);
        this.clubService.updateToObservable(null);
        return of(null)
      }) 
    );
  }

  updateClubMessages(){
    return this.messageService.fetchClubMessages(this.clubId).pipe(
      tap((response)=> this.messageService.updateClubMesssageObservable(response)),
      catchError((error , caught)  => {
        console.log(caught,error);
        this.clubService.updateToObservable(null);
        return of(null)
      })
    );
  }

  compareDate(postedDate : Date){
    const currentDate = new Date();
    let required  = new Date(postedDate);    
    return (currentDate.toDateString() === required.toDateString());
  }

  handleEmoji(e)  {
    this.textEmoji +=  e.char;
  }

  handleCharDelete(e)  {
    if (this.textEmoji.length >  0) {
      this.textEmoji =  this.textEmoji.substr(0,  this.textEmoji.length -  2);
    }
  }

  sortMessages() {
    this.merged = [...this.data['clubMessages'], ...this.data["updateLogs"]];
    this.merged = this.merged.sort((a, b) => {
        const dateA = new Date(b.postedOn)
        const dateB = new Date(a.postedOn)
        if (dateA > dateB) { return -1; } if (dateA < dateB) { return 1; } return 0;
    })
  }

  getISTime(utcDate :Date){
    let dateIst = new Date(utcDate);
    dateIst.setHours(dateIst.getHours()+5);
    dateIst.setMinutes(dateIst.getMinutes()+30);
    return dateIst;
  }

  addToFavourites() {
    this.clubService.updateToFavorite(this.clubId,this.selectedChat).pipe(
      switchMap(()=> this.updateThisClub())
    ).subscribe();
  }

  removeFromFavourites() {
    this.clubService.RemoveFromFavourite(this.clubId, this.selectedChat).pipe(
      switchMap(()=> this.updateThisClub())
    ).subscribe();
  }

  openModal(type: string) {
    const initialState = {
      fromParent: {
        clubId: this.selectedChat.clubId as number,
        name: this.selectedChat.name,
        location: "my-club"
      }
    }
    if (type === 'mute') {
      this.modalRef = this.modalSerivce.show(MuteClubComponent, { class: 'large-modal', initialState })
    }
    else if (type === 'unmute') {
      this.modalRef = this.modalSerivce.show(UnmuteClubComponent, { class: 'large-modal', initialState })
    }
    else if (type === 'leave') {
      const modalRef = this.modalSerivce.show(LeaveClubComponent, { class: 'large-modal', initialState });
      modalRef.content.removeClub.pipe(
        switchMap(()=> {
          this.router.navigate(['/corporate-club/my-home/my-clubs']);
          return this.updateThisClub();
        })
      ).subscribe();
    }
  }

  ngOnDestroy(){
    this.messageService.updateClubMesssageObservable(null);    
  }

}

