import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

}
