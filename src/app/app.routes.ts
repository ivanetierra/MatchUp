import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventViewComponent } from './pages/event-view/event-view.component';
import { EventEditorComponent } from './pages/event-editor/event-editor.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard } from './auth';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event/:id', component: EventViewComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EventEditorComponent, canActivate: [AuthGuard] },
  { path: 'add', component: EventEditorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
