import { Component, OnInit } from '@angular/core';
import { Event } from '../../shared/models/event.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { EventService } from '../../shared/services/event.service';
import { combineLatest, map, Observable, take } from 'rxjs';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.scss',
})
export class EventViewComponent implements OnInit {
  event$:Observable<Event> = this._eventService.getEvent$();
  user$  = this._authService.user$;
  userIsOwner$:Observable<boolean> = combineLatest([this.event$, this.user$]).pipe(map(([event, user]) => event?.organizerId === user?.uid));

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _eventService: EventService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    const eventId = this._route.snapshot.paramMap.get('id')!;
    this._eventService.loadEventById(eventId);
  }

  deleteEvent(event: Event): void {
    this._eventService.deleteEvent(event).then(() => {
      this._eventService.loadEvents(true);
      this._router.navigate(['/'])
    });


  }
}
