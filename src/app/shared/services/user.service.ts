import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, filter, from, map, take } from 'rxjs';
import { FirebaseCollections } from '../models/collections.enum';
import { User } from '../models/user.interface';
import { Event } from '../models/event.interface';
import { UserState } from './user.state';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _usersCollection = collection(this._firestore, FirebaseCollections.USERS);

  private _eventUserCollection = collection(this._firestore, FirebaseCollections.EVENTUSER);

  constructor(
    private _firestore: Firestore,
    private _userState: UserState
  ) {}

  loadUserById(id: string, force = false): void {
    if (
      force
      // || this._userState.getUserCurrentValue()?.uid !== id
    ) {
      from(getDoc(doc(this._usersCollection, id)))
        .pipe(
          filter(docSnap => docSnap.exists()),
          map(docSnap => docSnap.data()),
          take(1)
        )
        .subscribe((user: User) => {
          console.log(user);
          //   this._userState.setUser(user);
        });
    }
  }

  //   setStateUser(user: User): void {
  //     this._userState.setUser(user);
  //   }

  //   getUser$(): Observable<User> {
  //     return this._userState.getUser$();
  //   }

  updateUser(user: User): Promise<void> {
    if (user.uid) {
      return setDoc(doc(this._usersCollection, user.uid), user);
    }
  }

  addEventToUser(event: Event, user: User):void {
    console.log(event);
    setDoc(doc(this._eventUserCollection, user.uid), {
      [event.id]: true
    }).then(() => {
      this.loadGoingEventsByUser(user);
    });
  }

  deleteEventToUser(event: Event, user: User): void {
    setDoc(doc(this._eventUserCollection, user.uid), {
      [event.id]: false
    }).then(() => {
      this.loadGoingEventsByUser(user);
    });;
  }

  loadGoingEventsByUser(user: User): void {
    from(getDoc(doc(this._eventUserCollection, user.uid)))
      .pipe(
        map(docSnap => docSnap.data()),
        map(events =>  Object.keys(events).filter(eventId => events[eventId] === true))
      )
      .subscribe(eventIds => {
        this._userState.setGoingEvents(eventIds);
      });
  }

  getGoingEvents$(): Observable<string[]> {
    return this._userState.getGoingEvents$();
  }
}
