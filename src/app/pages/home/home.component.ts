import { Component } from '@angular/core';
import { BannerComponent } from "./components/banner/banner.component";
import { EventGridComponent } from "./components/event-grid/event-grid.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, EventGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
