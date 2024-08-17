import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventViewComponent } from './pages/event-view/event-view.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'event/:id', component:EventViewComponent}
];
