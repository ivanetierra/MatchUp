import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.interface";

@Injectable({ providedIn: 'root' })
export class EventState {
  private _event: BehaviorSubject<User> = new BehaviorSubject(null);
  private _eventsList: BehaviorSubject<User[]> = new BehaviorSubject(null);
  private _eventsListLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getEvent$(): Observable<User> {
    return this._event.asObservable();
  }

  getEventCurrentValue(): User {
    return this._event.getValue();
  }

  setEvent(user: User): void {
    this._event.next(user);
  }

  cleanEvent(): void {
    this._event.next(null);
  }

  getEventsList$(): Observable<User[]> {
    return this._eventsList.asObservable();
  }

  setEventsList(eventList: User[]): void {
    this._eventsList.next(eventList);
  }

  cleanEventsList(): void {
    this._eventsList.next(null);
  }

  getEventListCurrentValue(): User[] {
    return this._eventsList.getValue();
  }

  getEventsListLoading$(): Observable<boolean> {
      return this._eventsListLoading.asObservable();
  }

  setEventsListLoading(eventList: boolean): void {
      this._eventsListLoading.next(eventList);
  }



}