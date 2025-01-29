import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardHeadingComponent } from './MyComponent/dashboard-heading/dashboard-heading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardHeadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'School Dashboard Visualization';
}
