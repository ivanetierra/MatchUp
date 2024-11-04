import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { user } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../../../pages/logout/logout.component';
import { ProfileComponent } from '../../../pages/profile/profile.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, LogoutComponent, SvgIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  user$ = this._authService.user$

  constructor(private _authService: AuthService){

  }

}
