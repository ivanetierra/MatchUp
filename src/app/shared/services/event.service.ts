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
import { deleteDoc, getDocs, query, setDoc } from 'firebase/firestore';
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

  private _eventUserCollection = collection(
    this._firestore,
    FirebaseCollections.EVENTUSER
  );

  constructor(private _firestore: Firestore, private _eventState: EventState) {}

  loadEventById(id: string, force = false): void {
    if (force || this._eventState.getEventCurrentValue()?.id !== id) {
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
          map((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
        )
        .subscribe((eventsList: Event[]) => {
          this._eventState.setEventsListLoading(false);
          this._eventState.setEventsList(eventsList);
        });
    }
  }

  deleteEvent(event: Event): Promise<void> {
    console.log(event);
    return deleteDoc(doc(this._eventsCollection, event.id)).then(() => this._eventState.cleanEvent());
  }


  addEventToUser(event: Event, user: User): Promise<void> {
    console.log(event);
    
    return setDoc(doc(this._eventUserCollection, user.uid), {
      [event.id]: true,
    });
  }

  deleteEventToUser(event: Event, user: User): Promise<void> {
    return setDoc(doc(this._eventUserCollection, user.uid), {
      [event.id]: false,
    });
  }
    
}
