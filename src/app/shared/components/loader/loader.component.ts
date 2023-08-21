import { Component } from '@angular/core';
import { LoaderService } from '../..';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styles: [
  ]
})
export class LoaderComponent {

  showLoader : boolean = false;

  constructor(private loaderService : LoaderService){
  }

  ngOnInit(){
    this.loaderService.getLoaderStatus().subscribe((value : boolean)=>{
      this.showLoader = value;
    });
  }


}
