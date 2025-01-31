import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import data from "./MapToolTip.json";



@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrl: './map-section.component.scss',
})

export class MapSectionComponent implements AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object // Inject platformId
  ) { } //Inject ElementRef

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) { // Check if it's the browser

      //colour the MAp.....
      this.distributeAndColor(data);


      // Now the DOM is available, so you can access the SVG and its paths.
      const paths = this.elementRef.nativeElement.querySelectorAll('svg path');
      const svgContainer = this.elementRef.nativeElement.querySelector('svg');
      const resetButton = this.elementRef.nativeElement.querySelector('#reset-map-button');
      const tooltipBox = this.elementRef.nativeElement.querySelector("#tooltip-box");
      const tooltipTitle = this.elementRef.nativeElement.querySelector("#tooltip-title");
      const tooltipValue = this.elementRef.nativeElement.querySelector("#tooltip-value");
      tooltipValue.style.display = 'none';
      tooltipTitle.style.display = "none";
      tooltipBox.style.display = 'none';

      if (svgContainer) {
        resetButton.style.display = 'none';//1st hide the button
        svgContainer.addEventListener('click', (event: MouseEvent) => {
          const clickedPath = event.target as SVGPathElement;

          if (clickedPath && clickedPath.tagName === 'path') {
            resetButton.style.display = 'block';//show the button
            paths.forEach((path: Element) => {
              const currentPath = path as SVGPathElement;
              currentPath.style.display = currentPath === clickedPath ? 'block' : 'none';
            });

            // 2. Zoom and center on the clicked path
            this.zoomToPath(svgContainer, clickedPath); // Pass both container and path
          }
        });
      }
    }
  }

  private zoomToPath(svgContainer: SVGSVGElement, path: SVGPathElement) {
    const bbox = path.getBBox();
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;

    const svgWidth = svgContainer.clientWidth;
    const svgHeight = svgContainer.clientHeight;

    // Calculate scale (with padding)
    const scale = Math.min(svgWidth / bbox.width, svgHeight / bbox.height) * 0.8;

    // Apply transformation to the SVG's viewBox
    const newViewBox = `${centerX - svgWidth / (2 * scale)} ${centerY - svgHeight / (2 * scale)} ${svgWidth / scale} ${svgHeight / scale}`;
    svgContainer.setAttribute('viewBox', newViewBox);

  }

  resetViewBox() {
    const paths = this.elementRef.nativeElement.querySelectorAll('svg path');
    const svgContainer = this.elementRef.nativeElement.querySelector('svg');
    const resetButton = this.elementRef.nativeElement.querySelector('#reset-map-button');


    if (svgContainer) {
      resetButton.style.display = 'none';
      svgContainer.setAttribute('viewBox', "0 0 1000 1034");
      paths.forEach((path: Element) => {
        const currentPath = path as SVGPathElement;
        currentPath.style.display = 'block';
      });
    }
  }

  @ViewChild('mySvg', { static: false }) mySvg!: ElementRef<SVGSVGElement>;

  onMouseMove(event: MouseEvent) {
    const tooltipBox = this.elementRef.nativeElement.querySelector("#tooltip-box");
    const tooltipTitle = this.elementRef.nativeElement.querySelector("#tooltip-title");
    const tooltipValue = this.elementRef.nativeElement.querySelector("#tooltip-value");
    tooltipValue.style.display = 'block';
    tooltipTitle.style.display = "block";
    tooltipBox.style.display = 'block';
    if (!this.mySvg) return; // Handle the case where mySvg is not yet available

    const svgElement = this.mySvg.nativeElement;
    const pt = svgElement.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;

    // Get the current transformation matrix of the SVG
    const cursorpt = pt.matrixTransform(svgElement.getScreenCTM()?.inverse());


    console.log("Mouse X:", cursorpt.x, "Mouse Y:", cursorpt.y);

    // Get the element under the mouse pointer
    const element = document.elementFromPoint(event.clientX, event.clientY);

    if (element instanceof SVGPathElement || element instanceof SVGCircleElement) { // Check if it's a path or other SVG element

      console.log("Element ID:", element.id);
      const stateData = data.find(state_data => state_data.id === element.id);

      //Changed the title and the value of the tooltip.......
      tooltipTitle.innerHTML = stateData?.state;
      tooltipValue.innerHTML = stateData?.grossEnrollement;



      // Get text bounding boxes
      const titleBBox = tooltipTitle.getBBox();
      const valueBBox = tooltipValue.getBBox();

      // Calculate tooltip dimensions with padding
      const padding = 10; // Adjust padding as needed
      const boxWidth = Math.max(titleBBox.width, valueBBox.width) + 2 * padding;
      const boxHeight = titleBBox.height + valueBBox.height + 2 * padding;

      //setting box height and width
      tooltipBox.setAttribute("width", boxWidth.toString());
      tooltipBox.setAttribute("height", boxHeight.toString());
      //radius of the box
      tooltipBox.setAttribute("rx", `10`);
      tooltipBox.setAttribute("ry", `10`);

      // *** NEW: Tooltip Positioning Logic ***
      let tooltipX = cursorpt.x + 20;
      let tooltipY = cursorpt.y + 10;

      // Get SVG bounding box
      const svgBBox = svgElement.getBoundingClientRect();

      // Check if tooltip goes outside SVG bounds and adjust
      if (tooltipX + boxWidth > 1000) {
        tooltipX = 1000 - boxWidth - 10; // 10px margin from right edge
      }
      if (tooltipY + boxHeight > 1034) {
        tooltipY = 1034 - boxHeight - 10; // 10px margin from bottom edge
      }



      //for tooltip box
      tooltipBox.setAttribute("x", tooltipX.toString());
      tooltipBox.setAttribute("y", tooltipY.toString());
      tooltipBox.style.display = 'block';


      //for tooltip title
      tooltipTitle.setAttribute("x", `${tooltipX + 10}`);
      tooltipTitle.setAttribute("y", `${tooltipY + 30}`);
      tooltipTitle.style.display = 'block';
      //for tooltip valuie
      tooltipValue.setAttribute("x", `${tooltipX + 10}`);
      tooltipValue.setAttribute("y", `${tooltipY + 55}`);
      tooltipValue.style.display = 'block';

    } else {
      tooltipBox.style.display = 'none';
      tooltipTitle.style.display = 'none';
      tooltipValue.style.display = 'none';
      console.log("No SVG path under mouse.");
    }
  }


  distributeAndColor(data: any[]) {

    if (!isPlatformBrowser(this.platformId)) return;


    const paths = this.elementRef.nativeElement.querySelectorAll('svg path');
    // 1. Find the maximum grossEnrollement
    const maxEnrollement = Math.max(...data.map(item => item.grossEnrollement));

    // 2. Calculate the range for each group
    const range = maxEnrollement / 5;

    // 3. Assign each state to a group and determine its color
    paths.forEach((path: Element) => {
      const currentPath = path as SVGPathElement;
      //finding state in the data list 
      const stateData = data.find(state_data => state_data.id === currentPath.id);
      if (stateData) {
        console.log(stateData);
        //putting them in a group and finding its no. 
        const group = Math.ceil(stateData.grossEnrollement / range);
        //assigning the color value to the state.
        currentPath.style.fill = this.getColorForGroup(group);

        //For Lakshadweep rect only 
        if (currentPath.id == "IN-LD") {
          const rect = this.elementRef.nativeElement.querySelector("#rect-IN-LD");
          rect.style.fill = currentPath.style.fill;
        }
      }
    });

    //4. assigning colour to the Scale
    console.log("range=", Math.ceil(range));
    this.elementRef.nativeElement.querySelector("#group1").style.fill = this.getColorForGroup(1);
    this.elementRef.nativeElement.querySelector("#group2").style.fill = this.getColorForGroup(2);
    this.elementRef.nativeElement.querySelector("#group3").style.fill = this.getColorForGroup(3);
    this.elementRef.nativeElement.querySelector("#group4").style.fill = this.getColorForGroup(4);
    this.elementRef.nativeElement.querySelector("#group5").style.fill = this.getColorForGroup(5);


    const range_upper = Math.ceil(range / 1000000) * 1000000;

    const text = this.elementRef.nativeElement.querySelector("#group1-range-txt")
    text.innerHTML = `&lt; ${range_upper}`;
    this.elementRef.nativeElement.querySelector("#group2-range-txt").innerHTML = `${range_upper} - ${range_upper * 2}`;
    this.elementRef.nativeElement.querySelector("#group3-range-txt").innerHTML = `${range_upper * 2} - ${range_upper * 3}`;
    this.elementRef.nativeElement.querySelector("#group4-range-txt").innerHTML = `${range_upper * 3} - ${range_upper * 4}`;
    this.elementRef.nativeElement.querySelector("#group5-range-txt").innerHTML = `&gt; ${range_upper * 4}`;

  }


  getColorForGroup(group: number): string {
    switch (group) {
      case 1: return "#D1ECFD";
      case 2: return "#73B8F9";
      case 3: return "#1A73E9";
      case 4: return "#0D43A7";
      case 5: return "#05206F";
      default: return "gray"; // Default color if group is outside 1-5
    }
  }
}

