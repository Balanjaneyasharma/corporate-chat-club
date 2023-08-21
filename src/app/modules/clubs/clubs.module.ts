import { SharedModule } from 'src/app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClubsRoutingModule } from './clubs-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClubListComponent, ClubsComponent } from '.';

@NgModule({
  declarations: [
    ClubsComponent,
    ClubListComponent,
  ],
  imports: [
    CommonModule,
    ClubsRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    Ng2SearchPipeModule,
    SharedModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
  ],
  

})
export class ClubsModule { }
