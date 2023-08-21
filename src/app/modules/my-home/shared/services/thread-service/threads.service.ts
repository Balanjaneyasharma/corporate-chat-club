import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Thread } from '../..';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ThreadsService {


  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http : HttpClient) { }

  threadsData : Thread[]=[];
  currentEnvironment : string = environment.apiLink;


  private threadData$ = new BehaviorSubject<Thread[]>([]);

  getThreadDataObservable()  {
    return this.threadData$.asObservable();
  }

  updateThreadListObservable(response:Thread[]) {
      this.threadsData = response;
      this.threadData$.next(response);
    }

  fetchThreadList(){
        return this.http.get<Thread[]>(`${this.currentEnvironment}/api/users/me/threads`,{headers:this.headers});
  }

  getSingleThread(id : number) : Thread{
    return this.threadsData.find((ele)=>ele.receiverId == id)!
  }


  MuteClub(id:number){
    return this.http.patch(`${this.currentEnvironment}/api/threads/${id}/mute`,{},{headers:this.headers});
  }

  UnmuteClub(id:number){
    return this.http.patch(`${this.currentEnvironment}/api/threads/${id}/unmute`,{},{headers:this.headers});   
  }
}
