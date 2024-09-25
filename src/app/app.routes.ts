import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventViewComponent } from './pages/event-view/event-view.component';
import { EventEditorComponent } from './pages/event-editor/event-editor.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'event/:id', component:EventViewComponent},
    {path: 'edit/:id', component:EventEditorComponent},
    {path: 'add', component:EventEditorComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: '**', redirectTo: ''}
];
