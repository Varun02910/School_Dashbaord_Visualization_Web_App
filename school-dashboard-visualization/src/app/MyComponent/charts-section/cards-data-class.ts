import { CardData } from "./card-data-class";

export class CardsData {
    main_title: String;
    main_value: String;
    subDataList: Array<CardData>;
    cardImgPath: String
    constructor(main_title: String, main_value: String, dataList: Array<CardData>, imgPath: String) {
      this.main_title = main_title;
      this.main_value = main_value;
      this.subDataList = dataList;
      this.cardImgPath = imgPath;
    }
  }