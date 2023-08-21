import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styles: [
  ]
})
export class SideNavComponent implements OnInit {
  isCurrentUserGlobalAdmin : boolean ;

  constructor(private authService : AuthServiceService) { }

  ngOnInit(): void {
    this.isCurrentUserGlobalAdmin = this.authService.checkIsUserGlobalAdmin();
  }
}
