import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.interface";

@Injectable({ providedIn: 'root' })
export class UserState {
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);
  private _goingEvents: BehaviorSubject<string[]> = new BehaviorSubject(null);

  getUser$(): Observable<User> {
    return this._user.asObservable();
  }

  getUserCurrentValue(): User {
    return this._user.getValue();
  }

  setUser(user: User): void {
    this._user.next(user);
  }

  cleanUser(): void {
    this._user.next(null);
    this._goingEvents.next(null);
  }

  getGoingEvents$(): Observable<string[]> {
    return this._goingEvents.asObservable();
  }

  setGoingEvents(eventIdList: string[]): void {
    this._goingEvents.next(eventIdList);
  }

  cleanGoingEvents(): void {
    this._goingEvents.next(null);
  }

  getGoingEventsCurrentValue(): string[] {
    return this._goingEvents.getValue();
  }
}