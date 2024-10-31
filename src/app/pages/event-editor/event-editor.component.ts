import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../shared/services/event.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { filter, from, take, tap } from 'rxjs';
import { Event } from '../../shared/models/event.interface';
import { routes } from '../../app.routes';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-event-editor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './event-editor.component.html',
  styleUrl: './event-editor.component.scss',
})
export class EventEditorComponent implements OnInit {
  eventForm = this._fb.group({
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    image: [''], // Validators.required
    organizer: [''],
    organizerId: ['', Validators.required],
    date: ['', Validators.required],
    location: ['', Validators.required],
    price: [0, Validators.required],
    totalSpots: [0, Validators.required],
    going: [0],
  });

  isEditing = false;

  constructor(
    private _fb: FormBuilder,
    private _eventService: EventService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    const eventId = this._route.snapshot.paramMap.get('id')!;

    if (eventId) {
      this.isEditing = true;
      this._eventService.loadEventById(eventId);
      this._eventService
        .getEvent$()
        .pipe(
          filter((v) => !!v),
          take(1)
        )
        .subscribe((event) => {
          this.initForm(event);
        });
    } else {
      this._authService.user$.pipe(take(1)).subscribe(user => {
        console.log(user)
        this.eventForm.controls.organizer.setValue(user.email)
        this.eventForm.controls.organizerId.setValue(user.uid)
      })
    }


  }

  initForm(event: Event): void {
    this.eventForm.patchValue({ ...event });
    // this._cdr.detectChanges();
  }

  saveEvent(): void {
    
    console.log(this.eventForm.value);
    if (this.eventForm.invalid) {
      return;
    }

    const eventData: Event = {
      ...this.eventForm.value,
      id: this.eventForm.value.id ?? ''
    } as Event;

    if (this.isEditing) {
      this._eventService.updateEvent(eventData).then(() => {
        console.log('Event updated');
        this._eventService.loadEvents(true);
        this._eventService.loadEventById(eventData.id!, true);
        this._router.navigate(['/', 'event', eventData.id]);
        
        
      });
    } else {      
      
      this._eventService.updateEvent(eventData).then(() => {
        
        this._eventService.loadEvents(true);
        this._eventService.getEventsList$().pipe(
          filter((v) => !!v?.find((e) => e.id === eventData.id)),
          take(1)
        ).subscribe(()=> {
          console.log('Event created');
          this._router.navigate(['/' ,'event' , eventData.id]);
        });
    } );
  }
  }

}
