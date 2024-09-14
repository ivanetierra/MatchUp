import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Event } from "../models/event.interface";

@Injectable({ providedIn: 'root' })
export class EventState {
  private _event: BehaviorSubject<Event> = new BehaviorSubject(null);
  private _eventsList: BehaviorSubject<Event[]> = new BehaviorSubject(null);
  private _eventsListLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getEvent$(): Observable<Event> {
    return this._event.asObservable();
  }

  getEventCurrentValue(): Event {
    return this._event.getValue();
  }

  setEvent(event: Event): void {
    this._event.next(event);
  }

  cleanEvent(): void {
    this._event.next(null);
  }

  getEventsList$(): Observable<Event[]> {
    return this._eventsList.asObservable();
  }

  setEventsList(eventList: Event[]): void {
    this._eventsList.next(eventList);
  }

  cleanEventsList(): void {
    this._eventsList.next(null);
  }

  getEventListCurrentValue(): Event[] {
    return this._eventsList.getValue();
  }

    getEventsListLoading$(): Observable<boolean> {
        return this._eventsListLoading.asObservable();
    }

    setEventsListLoading(eventList: boolean): void {
        this._eventsListLoading.next(eventList);
    }



}