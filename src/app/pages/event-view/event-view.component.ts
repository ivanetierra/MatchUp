import { Component } from '@angular/core';
import { Event } from '../../shared/models/event.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.scss',
})
export class EventViewComponent {
  event: Event;

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
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&h=800',
      name: 'Event 4',
      organizer: 'Organizer 4',
      date: '2020-01-04 10:00:00',
      location: 'Location 4',
      price: 400,
      going: 5,
      totalSpots: 40,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
    {
      id: 5,
      image:
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&h=800',
      name: 'Event 5',
      organizer: 'Organizer 5',
      date: '2020-01-05 10:00:00',
      location: 'Location 5',
      price: 500,
      going: 6,
      totalSpots: 50,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const eventId = +this.route.snapshot.paramMap.get('id')!;
    this.event = this.eventsList.find((e) => e.id === eventId);
  }
}
