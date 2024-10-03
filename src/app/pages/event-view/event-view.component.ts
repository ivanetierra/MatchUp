import { Component, OnInit } from '@angular/core';
import { Event } from '../../shared/models/event.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { EventService } from '../../shared/services/event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.scss',
})
export class EventViewComponent implements OnInit {
  event$:Observable<Event> = this._eventService.getEvent$();


  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _eventService: EventService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    const eventId = this._route.snapshot.paramMap.get('id')!;
    this._eventService.loadEventById(eventId);
    this._userService.loadUserById('s9SfNwQiJwyzf4sPLdWX', true);
  }

  deleteEvent(event: Event): void {
    this._eventService.deleteEvent(event).then(() => {
      this._eventService.loadEvents(true);
      this._router.navigate(['/'])
    });


  }
}
