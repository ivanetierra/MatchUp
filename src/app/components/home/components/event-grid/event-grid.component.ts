import { Component } from '@angular/core';
import { EventCardComponent } from './components/event-card/event-card.component';

@Component({
  selector: 'app-event-grid',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './event-grid.component.html',
  styleUrl: './event-grid.component.scss',
})
export class EventGridComponent {
  eventsList = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&h=800',
      name: 'Event 1',
      organizer: 'Organizer 1',
      date: '2020-01-01 10:00:00',
      location: 'Location 1',
      price: 100,
      going: 2,
      totalSpots: 10,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&h=800',
      name: 'Event 2',
      organizer: 'Organizer 2',
      date: '2020-01-02 10:00:00',
      location: 'Location 2',
      price: 200,
      going: 3,
      totalSpots: 20,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&h=800',
      name: 'Event 3',
      organizer: 'Organizer 3',
      date: '2020-01-03 10:00:00',
      location: 'Location 3',
      price: 300,
      going: 4,
      totalSpots: 30,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
  ];
}
