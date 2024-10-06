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
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _usersCollection = collection(
    this._firestore,
    FirebaseCollections.USERS
  );

  constructor(private _firestore: Firestore) {}

  loadUserById(id: string, force = false): void {
    
    if (force 
        // || this._userState.getUserCurrentValue()?.uid !== id
    ) {
      from(getDoc(doc(this._usersCollection, id)))
        .pipe(
          filter((docSnap) => docSnap.exists()),
          map((docSnap) => docSnap.data()),
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
}
