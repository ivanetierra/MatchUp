import { Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { filter, switchMap, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../home/components/event-grid/components/event-card/event-card.component';
import { RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, EventCardComponent, RouterLink, RouterModule, NavbarComponent, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$ = this._authService.user$;
  userEvents$ = this._userService.getGoingEvents$().pipe(
    filter(eventIds => !!eventIds),
    take(1),
    switchMap(eventIds => this._eventService.getEventsByIds(eventIds))
  );
  myEvents$ = this.user$.pipe(
    take(1),
    switchMap(user => this._eventService.getEventsByOrganizerId(user.uid))
  );

  isEditMode: boolean = false;
  selectedTab: 'going' | 'hosting' = 'going';

  constructor(
    private _eventService: EventService,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$.pipe(take(1)).subscribe(user => {
      this._userService.loadGoingEventsByUser(user);
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile(): void {
    this.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        this._userService.updateUser(user).then(() => {
          this.isEditMode = false;
        });
      }
    });
  }

  // Handle tab switching
  switchTab(tab: 'going' | 'hosting'): void {
    this.selectedTab = tab;
  }
}
