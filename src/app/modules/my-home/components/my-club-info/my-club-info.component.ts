import { tap, switchMap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component,  OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeactivateClubComponent, LeaveClubComponent } from 'src/app/shared';
import { Club, ClubInfo, ClubinfoService, ClubService, NewUsers } from '../..';
import { AuthServiceService } from 'src/app/core';

@Component({
  selector: 'app-my-club-info',
  templateUrl: './my-club-info.component.html',
})
export class MyClubInfoComponent implements OnInit {

  isDropdownOpen : boolean= false;
  id : number;
  clubInfoDetails:ClubInfo[]=[];
  modalRef: BsModalRef;
  newUsers:NewUsers[]=[]
  selectedChat: Club;
  isClubMuted:boolean;
  isUserBlocked:string='';
  isClubAdmin:string='';
  filterText : string = '';
  selectedUsers:number = 0;
  selectedUsersArray: number[] = [];
  isCurrentUserGlobalAdmin : boolean ;
  
  constructor(private clubService : ClubService,
    private clubInfoService : ClubinfoService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private modalService: BsModalService,
    private clubListService : ClubService,private authService : AuthServiceService
    ) { }

  ngOnInit(): void {
    this.isCurrentUserGlobalAdmin = this.authService.checkIsUserGlobalAdmin();
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
  }

  getData(){
    this.updateClubInfoObservable().pipe(
      switchMap(()=> this.clubInfoService.getClubDetailsObservable())
    ).subscribe((data)=> this.clubInfoDetails = data);
    this.clubService.getClubDataObservable().subscribe((value)=>{
      this.selectedChat=value.find((u: any) => u.clubId === this.id);
      if(this.selectedChat) this.isClubMuted = this.selectedChat.isNotificationsMuted;
    });
  }

  getNewUsers(){
    this.clubInfoService.getNewUsers(this.id).subscribe((response)=>{
       this.newUsers = response;
    });
  }

  usersSelected(id:number){
    if (this.selectedUsersArray.includes(id)) {
      let index = this.selectedUsersArray.indexOf(id);
      if (index !== -1) {
        this.selectedUsersArray.splice(index, 1);
      }
      this.selectedUsers--;
    }
    else {
      this.selectedUsers++;
      this.selectedUsersArray.push(id);
    }
  }

  addUserToClub(){
    this.clubInfoService.addNewUsers(this.id,this.selectedUsersArray).pipe(
      tap(()=>{
        this.selectedUsers = 0;
        this.selectedUsersArray = [];
      }),
      switchMap(()=>this.updateClubInfoObservable())
    ).subscribe();
    document.getElementById("new-users").click();
  }

  openModal(type: string) {
    const initialState = {
      fromParent : this.selectedChat
    }
    if (type === 'deactivate') {
      const modalRef = this.modalService.show(DeactivateClubComponent, { class: 'large-modal', initialState });
      modalRef.content.deactivatClub.pipe(
        tap(()=> this.navigateToClubs()),
        switchMap(()=> this.updateClubListObservable())
      ).subscribe();
    }
    else if (type === 'leave') {
      const modalRef = this.modalService.show(LeaveClubComponent, { class: 'large-modal', initialState });
      modalRef.content.removeClub.pipe(
        tap(()=> this.navigateToClubs()),
        switchMap(()=> this.updateClubListObservable())
      ).subscribe();
    }
  }

  navigateToClubs(){
    this.router.navigate(['/corporate-club/my-home/my-clubs']);
  }
  
  togglePrivateOrPublic(){
    ( this.clubInfoDetails['clubInfo'].isPublic) ?
      this.clubInfoService.makeClubPrivate(this.id).pipe(
        switchMap(()=> this.updateClubInfoObservable())
      ).subscribe()
    :
     this.clubInfoService.makeClubPublic(this.id).pipe(
       switchMap(() => this.updateClubInfoObservable())
     ).subscribe()
  }

  toggleOpenOrClosed(){
    (!this.clubInfoDetails['clubInfo'].type)?
     this.clubInfoService.makeClubClosed(this.id).pipe(
       switchMap(()=> this.updateClubInfoObservable())
     ).subscribe()
    :
     this.clubInfoService.makeClubOpen(this.id).pipe(
       switchMap(()=> this.updateClubInfoObservable())
     ).subscribe();
  }

  toggleMuteClub(){
    (this.isClubMuted)?
     this.clubListService.UnmuteClub(this.id).pipe(
       switchMap(()=> this.updateClubListObservable())
     ).subscribe()
    :
     this.clubListService.MuteClub(this.id).pipe(
       switchMap(()=> this.updateClubListObservable())
     ).subscribe();
  }

  updateClubListObservable(){
    return this.clubListService.fetchClubList().pipe(
      tap((response)=> this.clubListService.updateToObservable(response))
    );
  }
  
  updateClubInfoObservable(){
    return this.clubInfoService.fetchClubDetails(this.id).pipe(
      tap(response => this.clubInfoService.updateToObservable(response))
    );
  }


}
