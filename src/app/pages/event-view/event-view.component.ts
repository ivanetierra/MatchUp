import { Component, OnInit } from '@angular/core';
import { Event } from '../../shared/models/event.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { EventService } from '../../shared/services/event.service';
import { BehaviorSubject, combineLatest, map, Observable, take } from 'rxjs';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, HeaderComponent],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.scss'
})
export class EventViewComponent implements OnInit {
  event$: Observable<Event> = this._eventService.getEvent$();
  user$ = this._authService.user$;
  userIsOwner$: Observable<boolean> = combineLatest([this.event$, this.user$]).pipe(
    map(([event, user]) => !!user && event?.organizerId === user?.uid)
  );

  userIsNotGoing$ = combineLatest([this._userService.getGoingEvents$(), this.event$]).pipe(
    map(([goingEvents, event]) => !goingEvents?.includes(event?.id))
  );

  private _eventAttendees: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  eventAttendees$: Observable<number> = this._eventAttendees.asObservable();

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
    this.user$.pipe(take(1)).subscribe(user => {
      this._userService.loadGoingEventsByUser(user);
    });
    this.getAttendees();
  }

  getAttendees(): void {
    this._eventService
      .getEventAttendeesNumber(this._route.snapshot.paramMap.get('id')!)
      .pipe(take(1))
      .subscribe(attendees => {
        console.log(attendees);

        this._eventAttendees.next(attendees);
      });
  }

  deleteEvent(event: Event): void {
    this._eventService.deleteEvent(event).then(() => {
      this._eventService.loadEvents(true);
      this._router.navigate(['/']);
    });
  }

  joinEvent(event: Event): void {
    this.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        if (this._eventAttendees.value < event.totalSpots) {
          this._userService.addEventToUser(event, user).then(() => {
            this._userService.loadGoingEventsByUser(user);
            this.getAttendees();
          });
        } else {
          alert('Event is full');
        }
      } else {
        this._router.navigate(['/', 'login']);
      }
    });
  }

  leaveEvent(event: Event): void {
    this.user$.pipe(take(1)).subscribe(user => {
      this._userService.deleteEventToUser(event, user).then(() => {
        this._userService.loadGoingEventsByUser(user);
        this.getAttendees();
      });
    });
  }
}
