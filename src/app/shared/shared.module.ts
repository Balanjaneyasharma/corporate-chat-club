import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PropertyFilterPipe } from 'src/app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClubComponent, DataFiltersComponent, DeactivateClubComponent, LeaveClubComponent, LoaderComponent, ReactivateClubComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';


@NgModule({
  declarations: [PropertyFilterPipe, DeactivateClubComponent, LeaveClubComponent, ReactivateClubComponent, AddClubComponent, DataFiltersComponent, LoaderComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    SharedRoutingModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [PropertyFilterPipe , DataFiltersComponent,LoaderComponent]
})
export class SharedModule { }
