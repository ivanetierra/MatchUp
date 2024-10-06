import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from '@angular/fire/auth';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { setDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable, ReplaySubject, combineLatest, from, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { FirebaseCollections } from '../models/collections.enum';
// import { UrlRoutes } from '../models/urlRoutes.enum';
import { User } from '../models/user.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authStateChanged$: ReplaySubject<any> = new ReplaySubject(1);
  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user$: Observable<User> = this._user.asObservable();
  private _usersCollection = collection(this._firestore, FirebaseCollections.USERS);
  private _isAuthLoading: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(true);
  isAuthLoading$: Observable<Boolean> = this._isAuthLoading.asObservable();

  constructor(
    private _auth: Auth,
    private _firestore: Firestore,
    private router: Router
  ) {
    this._auth.onAuthStateChanged(this._authStateChanged$);
    this._authStateChanged$
      .pipe(
        distinctUntilChanged(),
        switchMap((user: User) => {
          if (user) {
            return from(getDoc(doc(this._usersCollection, user.uid))).pipe(
              filter(docSnap => docSnap.exists()),
              map(docSnap => docSnap.data())
            );
          }
          return of(null);
        })
      )
      .subscribe((user: User) => {
        this._user.next(user);
        this._isAuthLoading.next(false);
      });
  }

  get currentUser(): User | null {
    return this._user.getValue();
  }

  isLoggedIn$(): Observable<boolean> {
    return combineLatest([this.user$, this.isAuthLoading$]).pipe(
      filter(([user, authLoading]) => !authLoading),
      map(([user, authLoading]) => {
        return !!user && !authLoading;
      })
    );
  }

  resetPassword(email: string): void {
    sendPasswordResetEmail(this._auth, email)
      .then(() => {
        console.log('Password reset email sent!');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  login({ email, password }: { email: string; password: string }): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._auth, email, password);
    // .then(userCredential => {
    //   const user = userCredential.user;
    //   return user;
    // })
    // .catch(error => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode, errorMessage);
    // })
  }

  loginWithGoogle() {
    return signInWithPopup(this._auth, new GoogleAuthProvider());
  }

  register({ email, password }: { email: string; password: string }): Observable<boolean> {
    return from(createUserWithEmailAndPassword(this._auth, email, password)).pipe(
      tap(userCredential => {
        const user = userCredential.user;
        this.addUserToUsersCollection(user);
      }),
      map(() => true)
    );

    // .then(userCredential => {
    // })
    // .catch(error => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode, errorMessage);
    // });
  }

  async logout(): Promise<void> {
    signOut(this._auth)
      .then(() => {
        this.router.navigate(['/',this.login]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  private addUserToUsersCollection(firebaseUser: User) {
    const user: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email
    };
    return setDoc(doc(this._usersCollection, user.uid), user);
  }
}
