import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loader = new Subject();

  hideLoader(){
    this.loader.next(false);
  }
  showLoader(){
    this.loader.next(true);
  }

  getLoaderStatus(){
    return this.loader.asObservable();
  }
}
