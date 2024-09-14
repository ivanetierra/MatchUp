import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../shared/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs';
import { Event } from '../../shared/models/event.interface';

@Component({
  selector: 'app-event-editor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './event-editor.component.html',
  styleUrl: './event-editor.component.scss',
})
export class EventEditorComponent implements OnInit {
  eventForm = this._fb.group({
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    image: [''], //Validators.required
  });

  constructor(
    private _fb: FormBuilder,
    private _eventService: EventService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const eventId = this._route.snapshot.paramMap.get('id')!;

    if (eventId) {
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
    }
  }

  initForm(event: Event): void {
    this.eventForm.patchValue({ ...event });
  
    // this._cdr.detectChanges();
  }
}
