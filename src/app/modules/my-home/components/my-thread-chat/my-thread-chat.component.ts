import { tap, switchMap, of, catchError, EMPTY, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MuteClubComponent, ScrollToBottomDirectiveDirective, Thread, ThreadMessage, ThreadMessagesService,  ThreadsService, UnmuteClubComponent } from '../..';
import { AuthServiceService } from 'src/app/core';



@Component({
  selector: 'app-my-thread-chat',
  templateUrl: './my-thread-chat.component.html',
})
export class MyThreadChatComponent implements OnInit {

  @ViewChild(ScrollToBottomDirectiveDirective)
  scroll: ScrollToBottomDirectiveDirective;
  currentUserId : number;
  threadId : number;
  messages : ThreadMessage[]=[];
  message : string='';
  selectedChat: Thread;
  attachmentsArray: {name : string , value : File}[] = [];
  modalRef: BsModalRef;
  isUserFavourite:boolean;
  isUserMuted:boolean;
  isUserBlocked:number;
  fileSelectedArray: File[]=[];

  constructor(private activatedRoute : ActivatedRoute,
    private threadService : ThreadsService,
    private threadMessageServices : ThreadMessagesService,
    private modalService: BsModalService,
    private authService : AuthServiceService , 
    ) { };



  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.activatedRoute.paramMap.pipe(
      switchMap(value => {        
        this.threadId = parseInt(value.get('id'));
        return this.threadService.getThreadDataObservable()
      }),
      switchMap(threadData =>{
        this.selectedChat = threadData.find( ele => ele.receiverId == this.threadId);
        if(this.selectedChat){
          this.isUserFavourite = this.selectedChat.isFavourite;
          this.isUserMuted = this.selectedChat.isNotificationMuted;
          this.isUserBlocked = this.selectedChat.status;  
        }
        return this.updateThreadMessages();
      }),
      switchMap(()=>{
        return this.threadMessageServices.getThreadMessagesObservable().pipe(
          map(messages =>{
            messages.forEach((ele)=>{
              if(!ele.postedOn.getTimezoneOffset) ele.postedOn = this.getISTime(ele.postedOn)
            });
            return messages;
          })
        )
      })
    ).subscribe((response)=>{
        if(response !== this.messages) this.messages = response;
    })
  }

  removeFromAttachement(index: number) {
    this.attachmentsArray.splice(index,1);
  }

  fileSelected(event: any){
    this.fileSelectedArray= Array.from(event.target.files);    
    this.fileSelectedArray.forEach((ele)=> {
      this.attachmentsArray.push({ name : ele.name, value : ele});
    }); 
  }

  sendMessage(){
    if(this.message.trim().length!=0 || this.attachmentsArray.length!=0){
      const formData = new FormData();
      formData.append('msg',this.message);
      if(this.attachmentsArray.length>0){
        this.attachmentsArray.forEach((ele)=> formData.append(ele.name ,ele.value))
      }
      this.postMessage(formData);
    }
  }

  postMessage(msg : FormData){
    this.threadMessageServices.postThreadMessage(this.threadId, msg).pipe(
      tap((response)=>{
        this.threadMessageServices.updateThreadSingleMEssage(response['message']);
        this.message='';
        if(this.attachmentsArray.length > 0) this.attachmentsArray=[];
      }),
      switchMap(()=> this.updateThreadList())
    ).subscribe();
  }

  compareDate(postedDate : Date){
    const currentDate = new Date();
    let required  = new Date(postedDate);
    return (currentDate.toDateString() === required.toDateString())
  }

  getISTime(utcDate :Date){
    let dateIst = new Date(utcDate);
    dateIst.setHours(dateIst.getHours()+5);
    dateIst.setMinutes(dateIst.getMinutes()+30);
    return dateIst;
  }

  updateThreadList(){
    return this.threadService.fetchThreadList().pipe(
      tap((response)=> this.threadService.updateThreadListObservable(response))
    )
  }

  updateThreadMessages(){
    return this.threadMessageServices.fetchThreadMessages(this.threadId).pipe(
      tap((response)=> this.threadMessageServices.updateThreadMessageObservable(response)),
      catchError((error,caught)=>{
        console.log(error,caught);
        this.threadMessageServices.updateThreadMessageObservable(null);
        return of(null);
      })
    )
  }

  addToFavourites() {
    this.threadMessageServices.updateToFavorite(this.threadId,this.selectedChat).pipe(
      switchMap(()=> this.updateThreadList())
    ).subscribe();
  }

  removeFromFavourites() {
    this.threadMessageServices.RemoveFromFavourite(this.threadId, this.selectedChat).pipe(
      switchMap(()=> this.updateThreadList())
    ).subscribe();
  }

  blockUser(){
    this.threadMessageServices.blockUser(this.threadId).pipe(
      switchMap(()=> this.updateThreadList())
    ).subscribe();
 }

 unblockUser(){
   this.threadMessageServices.UnBlockUser(this.threadId).pipe(
     switchMap(()=> this.updateThreadList())
   ).subscribe();
 }

  openModal(type: string) {
    const initialState = {
      fromParent: {
        id: this.selectedChat.receiverId,
        name: this.selectedChat.receiverDisplayName,
        location : "my-thread"
      }
    }
    if (type === 'mute') {
      this.modalRef = this.modalService.show(MuteClubComponent, { class: 'large-modal', initialState })
    }
    else if (type === 'unmute') {
      this.modalRef = this.modalService.show(UnmuteClubComponent, { class: 'large-modal', initialState })
    }
  }

}
