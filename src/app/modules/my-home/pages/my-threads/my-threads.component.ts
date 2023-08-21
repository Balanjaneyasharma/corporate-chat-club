import { tap, switchMap } from 'rxjs';
import { Component,OnInit } from '@angular/core';
import { Thread,  ThreadsService } from '../../shared';

@Component({
  selector: 'app-my-threads',
  templateUrl: './my-threads.component.html',
  
})
export class MyThreadsComponent implements OnInit {

  threadList : Thread[]=[];

  constructor(private threadService : ThreadsService) { }

  ngOnInit(): void {
    this.getThreadList();
  }

  getThreadList(){
    this.threadService.fetchThreadList().pipe(
      tap((response)=> this.threadService.updateThreadListObservable(response)),
      switchMap(()=> this.threadService.getThreadDataObservable())
    ).subscribe((value)=>{
      this.threadList = value;
      this.sortData(this.threadList);
    });
  }

  sortData(data){
    data =data.sort((a,b)=>{
      return new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime();
    })
  }

}
