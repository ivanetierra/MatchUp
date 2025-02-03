import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BannerComponent } from "./components/banner/banner.component";
import { EventGridComponent } from "./components/event-grid/event-grid.component";
import { EventService } from '../../shared/services/event.service';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, EventGridComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
