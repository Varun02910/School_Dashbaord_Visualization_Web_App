import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardHeadingComponent } from './MyComponent/dashboard-heading/dashboard-heading.component';
import { MapSectionComponent } from "./MyComponent/map-section/map-section.component";
import { ChartsSectionComponent } from "./MyComponent/charts-section/charts-section.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardHeadingComponent, MapSectionComponent, ChartsSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'School Dashboard Visualization';
}
