import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventViewComponent } from './pages/event-view/event-view.component';
import { EventEditorComponent } from './pages/event-editor/event-editor.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'event/:id', component:EventViewComponent},
    {path: 'edit/:id', component:EventEditorComponent},
    {path: 'add', component:EventEditorComponent}
];
