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
import { HeaderComponent } from "../../shared/components/header/header.component";

import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-event-editor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HeaderComponent, NgxDropzoneModule],
  templateUrl: './event-editor.component.html',
  styleUrl: './event-editor.component.scss'
})
export class EventEditorComponent implements OnInit {
  eventForm = this._fb.group({
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    image: [''],
    organizer: [''],
    organizerId: ['', Validators.required],
    date: ['', Validators.required],
    location: ['', Validators.required],
    price: [0, Validators.required],
    totalSpots: [0, Validators.required],
    going: [0]
  });

  isEditing = false;

  filePreview: string | null = null;

  uploadedFiles: File[] = [];
  uploadedImageUrl: string | null = null;

  constructor(
    private _fb: FormBuilder,
    private _eventService: EventService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const eventId = this._route.snapshot.paramMap.get('id')!;

    if (eventId) {
      this.isEditing = true;
      this._eventService.loadEventById(eventId);
      this._eventService
        .getEvent$()
        .pipe(
          filter(v => !!v),
          take(1)
        )
        .subscribe(event => {
          this.initForm(event);
        });
    } else {
      this._authService.user$.pipe(take(1)).subscribe(user => {
        console.log(user);
        this.eventForm.controls.organizer.setValue(user.email.split('@')[0]);
        this.eventForm.controls.organizerId.setValue(user.uid);
      });
    }
  }

  initForm(event: Event): void {
    this.eventForm.patchValue({ ...event });
  }

  saveEvent(): void {
    console.log(this.eventForm.value);
    if (this.eventForm.invalid) {
      return;
    }

    const eventData: Event = {
      ...this.eventForm.value,
      id: this.eventForm.value.id ?? '',
      image: this.uploadedImageUrl || this.eventForm.value.image
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
        this._eventService
          .getEventsList$()
          .pipe(
            filter(v => !!v?.find(e => e.id === eventData.id)),
            take(1)
          )
          .subscribe(() => {
            console.log('Event created');
            this._router.navigate(['/', 'event', eventData.id]);
          });
      });
    }
  }

  onFileSelect(event: any) {
    const file = event.addedFiles[0];
    if (file) {
      this.filePreview = null;
      this.generateFilePreview(file);
      this.validateAndUploadFile(file);
    }
  }

  generateFilePreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  validateAndUploadFile(file: File) {
    const maxSize = 5000000;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only JPEG and PNG are allowed.');
      return;
    }

    if (file.size > maxSize) {
      alert('File is too large. Maximum size is 5 MB.');
      return;
    }

    this.uploadFileToCloudinary(file);
  }

  uploadFileToCloudinary(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);

    this.http.post(`https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`, formData).subscribe(
      (response: any) => {
        this.uploadedImageUrl = response.secure_url;
        this.eventForm.patchValue({ image: this.uploadedImageUrl });
        alert('Image uploaded successfully!');
      },
      error => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    );
  }
}
