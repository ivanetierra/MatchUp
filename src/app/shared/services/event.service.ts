import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, filter, from, map, take } from 'rxjs';
import { FirebaseCollections } from '../models/collections.enum';
import { Event } from '../models/event.interface';
import { getDocs, query, setDoc } from 'firebase/firestore';
import { User } from '../models/user.interface';
import { EventState } from './event.state';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private _eventsCollection = collection(
    this._firestore,
    FirebaseCollections.EVENTS
  );

  constructor(private _firestore: Firestore, private _eventState: EventState) {}

  loadEventById(id: string, force = false): void {
    if (
      force
      || this._eventState.getEventCurrentValue()?.id !== id
    ) {
      from(getDoc(doc(this._eventsCollection, id)))
        .pipe(
          filter((docSnap) => docSnap.exists()),
          map((docSnap) => docSnap.data()),
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
          map((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
        )
        .subscribe((eventsList: Event[]) => {
          this._eventState.setEventsListLoading(false);
          this._eventState.setEventsList(eventsList);
        });
    }
  }
}
