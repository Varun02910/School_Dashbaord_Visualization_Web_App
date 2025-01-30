import { Component, input} from '@angular/core';
import { CardData } from '../card-data-class';
import { CardDetailsComponent } from "./card-details/card-details.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-card',
  imports: [CardDetailsComponent, CommonModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  title = input<string>()
  dataList = input<CardData[]>()
}
