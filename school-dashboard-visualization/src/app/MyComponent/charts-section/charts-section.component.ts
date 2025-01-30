import { Component } from '@angular/core';
import { InfoCardComponent } from "./info-card/info-card.component";
import { CardData } from './card-data-class';

@Component({
  selector: 'app-charts-section',
  imports: [InfoCardComponent],
  templateUrl: './charts-section.component.html',
  styleUrl: './charts-section.component.scss'
})

export class ChartsSectionComponent {
    data1 = new CardData("Banana", "20");
    data2 = new CardData("Mango", "50");
    dataList = [this.data1, this.data2]
}
