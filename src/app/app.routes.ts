import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventViewComponent } from './components/event-view/event-view.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'event', component:EventViewComponent}
];
