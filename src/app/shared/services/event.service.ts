import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, filter, from, map, take, tap } from 'rxjs';
import { FirebaseCollections } from '../models/collections.enum';
import { Event } from '../models/event.interface';
import { count, deleteDoc, getCountFromServer, getDocs, query, setDoc, where } from 'firebase/firestore';
import { User } from '../models/user.interface';
import { EventState } from './event.state';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _eventsCollection = collection(this._firestore, FirebaseCollections.EVENTS);
  private _eventUserCollection = collection(this._firestore, FirebaseCollections.EVENTUSER);
  constructor(
    private _firestore: Firestore,
    private _eventState: EventState
  ) {}

  loadEventById(id: string, force = false): void {
    if (force || this._eventState.getEventCurrentValue()?.id !== id) {
      from(getDoc(doc(this._eventsCollection, id)))
        .pipe(
          filter(docSnap => docSnap.exists()),
          map(docSnap => docSnap.data()),
          take(1)
        )
        .subscribe((event: Event) => {
          this._eventState.setEvent(event);
        });
    }
  }

  setStateEvent(event: Event): void {
    this._eventState.setEvent(event);
  }

  getEvent$(): Observable<Event> {
    return this._eventState.getEvent$();
  }

  updateEvent(event: Event): Promise<void> {
    if (event.id) {
      return setDoc(doc(this._eventsCollection, event.id), event);
    } else {
      event.id = doc(this._eventsCollection).id;
      this._eventState.setEvent(event);
      return setDoc(doc(this._eventsCollection, event.id), event);
    }
  }

  getEventsList$(): Observable<Event[]> {
    return this._eventState.getEventsList$();
  }

  loadEvents(force = false): void {
    if (!this._eventState.getEventListCurrentValue()?.length || force) {
      this._eventState.setEventsListLoading(true);

      const q = query(this._eventsCollection);
      from(getDocs(q))
        .pipe(
          take(1),
          map(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
        )
        .subscribe((eventsList: Event[]) => {
          this._eventState.setEventsListLoading(false);
          this._eventState.setEventsList(eventsList);
        });
    }
  }

  getEventAttendeesNumber(eventId: string): Observable<number> {
    const q = query(this._eventUserCollection, where(eventId, '==', true));
    return from(getCountFromServer(q)).pipe(
      map(docSnap => docSnap.data().count),
)  }

  deleteEvent(event: Event): Promise<void> {
    console.log(event);
    return deleteDoc(doc(this._eventsCollection, event.id)).then(() => this._eventState.cleanEvent());
  }

  // Fetch multiple events by their IDs
  getEventsByIds(eventIds: string[]): Observable<Event[]> {
    const q = query(this._eventsCollection, where('id', 'in', eventIds));
    return collectionData(q, { idField: 'id' }) as Observable<Event[]>;
  }

  getEventsByOrganizerId(userId: string): Observable<Event[]> {
    const q = query(this._eventsCollection, where('organizerId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Event[]>;
  }
}
