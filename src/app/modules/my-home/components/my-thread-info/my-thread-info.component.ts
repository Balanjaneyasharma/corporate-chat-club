import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/core';
import { Thread, ThreadMessagesService, ThreadsService } from '../..';
import { tap, switchMap } from 'rxjs';

@Component({
  selector: 'app-my-thread-info',
  templateUrl: './my-thread-info.component.html',
  
})
export class MyThreadInfoComponent {

  @Input() threadData : Thread;
  
  currUserId:number;
  threadId:number;

  threadInfoData:any=[];

  constructor(private threadMessageService : ThreadMessagesService,
    private threadService : ThreadsService,
    private activatedRoute : ActivatedRoute,
    private authService : AuthServiceService
    ){}

  ngOnInit(): void {
    this.currUserId = this.authService.getCurrentUserId();
    this.threadId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.threadMessageService.threadInfo(this.threadId).subscribe((res)=>{
      this.threadInfoData = res;      
    })
  }

  connectUser(){
    this.threadMessageService.connectToUser(this.threadId).pipe(
      switchMap(()=> this.updateThreadObservable())
    ).subscribe();
  }

  blockUser(){
    this.threadMessageService.blockUser(this.threadId).pipe(
      switchMap(()=> this.updateThreadObservable())
    ).subscribe();
  }

  updateThreadObservable(){
    return this.threadService.fetchThreadList().pipe(
      tap((response)=> this.threadService.updateThreadListObservable(response))
    );
  }

  ngOnDestroy(){
  }

}
