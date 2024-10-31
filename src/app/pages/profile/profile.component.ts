import { Component, OnInit } from "@angular/core";
import { EventService } from "../../shared/services/event.service";
import { UserService } from "../../shared/services/user.service";
import { AuthService } from "../../shared/services/auth.service";
import { filter, switchMap, take, tap } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
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
    switchMap(user => this._eventService.getEvenetsByOrganizerId(user.uid))
  );

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
}
