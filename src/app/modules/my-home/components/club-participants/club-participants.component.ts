import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/core';
import { ClubinfoService, Participant } from '../..';

@Component({
  selector: 'app-club-participants',
  templateUrl: './club-participants.component.html',
})

export class ClubParticipantsComponent implements OnInit {
  @Input() participantsData: Participant[]=[];
  @Input() isAdmin : boolean;
  filterText: string = '';
  currUserId  : number ;


  isUserBlocked: string = '';
  isClubAdmin: string = '';

  isCurrentUserGlobalAdmin : boolean;

  constructor(private clubInfoService:ClubinfoService , private authService : AuthServiceService) { }

  ngOnInit(): void {
    this.currUserId = this.authService.getCurrentUserId();
    this.isCurrentUserGlobalAdmin = this.authService.checkIsUserGlobalAdmin();
  }

  getDrop(d: Participant) {
    d.status == true ? this.isUserBlocked = "Block Member" : this.isUserBlocked = "UnBlock Member";
    d.isAdmin == true ? this.isClubAdmin = "Remove as Admin" : this.isClubAdmin = "Make as Admin";
  }


  toggleUser(d: Participant) {
    (d.status) ?
      this.clubInfoService.blockUser(d.userId, d.clubId).subscribe(() => {
        this.clubInfoService.fetchClubDetails(d.clubId).subscribe((response) => {
          this.clubInfoService.updateToObservable(response)
        })
        this.clubInfoService.getClubDetailsObservable().subscribe((response)=>{
          this.participantsData = response['allParticipants'];
        })

      }) : this.clubInfoService.unblockUser(d.userId, d.clubId).subscribe(() => {
        this.clubInfoService.fetchClubDetails(d.clubId).subscribe((response) => {
          this.clubInfoService.updateToObservable(response)
        })

        this.clubInfoService.getClubDetailsObservable().subscribe((response)=>{
          this.participantsData = response['allParticipants'];
        })
      })
  }

  toggleAdmin(d: Participant) {

    (d.isAdmin) ?
    this.clubInfoService.removeAdmin(d.userId, d.clubId).subscribe(() => {
      this.clubInfoService.fetchClubDetails(d.clubId).subscribe((response) => {
        this.clubInfoService.updateToObservable(response)
      })
      this.clubInfoService.getClubDetailsObservable().subscribe((response)=>{
        this.participantsData = response['allParticipants'];
      })

    }) : this.clubInfoService.makeAdmin(d.userId, d.clubId).subscribe(() => {
      this.clubInfoService.fetchClubDetails(d.clubId).subscribe((response) => {
        this.clubInfoService.updateToObservable(response)
      })

      this.clubInfoService.getClubDetailsObservable().subscribe((response)=>{
        this.participantsData = response['allParticipants'];
      })
    })
  }

  
  updateClubInfoObservable(){
    
  }
}
