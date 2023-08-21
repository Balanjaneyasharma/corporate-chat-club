import { CorporateChatClubRoutingModule } from './corporate-chat-club-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateChatClubComponent} from '.';
import { SharedModule } from 'src/app/shared';
import { LayoutModule } from 'src/app/layout';


@NgModule({
  declarations: [
    CorporateChatClubComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    CorporateChatClubRoutingModule
  ],
})

export class CorporateChatClubModule { }
