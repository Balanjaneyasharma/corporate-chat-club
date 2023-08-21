import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HeaderComponent, SideNavComponent } from '.';



@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  exports : [HeaderComponent,SideNavComponent]
})
export class LayoutModule { }
