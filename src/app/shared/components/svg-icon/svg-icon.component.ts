import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  template: `<div id="svg-container" [ngClass]="this.class"></div>`
})
export class SvgIconComponent implements OnInit {
  @Input() icon: string = '';
  @Input() class: string = '';

  constructor(
    private http: HttpClient,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadSvg();
  }

  loadSvg(): void {
    if (this.icon) {
      this.http.get(`assets/icons/${this.icon}.svg`, { responseType: 'text' }).subscribe(
        svgContent => {
          this.insertSvgContent(svgContent);
        },
        error => {
          console.error('Error loading SVG:', error);
        }
      );
    }
  }

  insertSvgContent(svgContent: string): void {
    const svgContainer = this.el.nativeElement.querySelector('#svg-container');
    svgContainer.innerHTML = svgContent; // Inject SVG content into the container
  }
}
