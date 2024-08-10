import { Component, Input } from '@angular/core';
import { Event } from '../../../../../../shared/models/event.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
@Input() event: Event;
}
