import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionsRoutingModule } from './connections-routing.module';
import { SharedModule } from 'src/app/shared';
import { HttpClientModule } from  '@angular/common/http';
import { ConnectionsComponent, ConnectionListComponent, NewConnectionComponent, UserListComponent } from '.';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    ConnectionsComponent,
    ConnectionListComponent,
    NewConnectionComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    SharedModule,
    ModalModule.forRoot(),
    HttpClientModule,
    TooltipModule.forRoot()
  
  ]
})
export class ConnectionsModule { }
