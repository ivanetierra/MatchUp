import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from './components/event-card/event-card.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from '../../../../shared/services/event.service';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../shared/models/event.interface';

@Component({
  selector: 'app-event-grid',
  standalone: true,
  imports: [EventCardComponent, CommonModule],
  templateUrl: './event-grid.component.html',
  styleUrl: './event-grid.component.scss',
})
export class EventGridComponent implements OnInit {
  eventsList$: Observable<Event[]> = this._eventService.getEventsList$();



  constructor(private router: Router, private _eventService: EventService) {}
  ngOnInit(): void {
    this._eventService.loadEvents();
  }

  onEventClick(eventId: number) {
    this.router.navigate(['/event', eventId]);
  }


}
