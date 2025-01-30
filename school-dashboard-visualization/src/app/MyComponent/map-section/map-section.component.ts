import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';


@Component({
  selector: 'app-map-section',
  imports: [],
  templateUrl: './map-section.component.html',
  styleUrl: './map-section.component.scss'
})

export class MapSectionComponent implements AfterViewInit{
  constructor(private elementRef: ElementRef){} //Inject ElementRef

  ngAfterViewInit(): void {
    // Now the DOM is available, so you can access the SVG and its paths.
    const paths = this.elementRef.nativeElement.querySelectorAll('svg path');
    const svgContainer = this.elementRef.nativeElement.querySelector('svg');
    
    if (svgContainer){
      svgContainer.addEventListener('click', (event: MouseEvent)=> {
        const clickedPath = event.target as SVGPathElement;

        if (clickedPath && clickedPath.tagName === 'path'){
          
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
}

