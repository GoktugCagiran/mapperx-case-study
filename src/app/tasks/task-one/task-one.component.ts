import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-task-one',
  templateUrl: './task-one.component.html',
  styleUrls: ['./task-one.component.scss'],
})
export class TaskOneComponent implements AfterViewInit {
  private map: any;

  private initializeMap(): void {
    // Default icon values
    let defIcon = L.icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });

    // Add Open Street Map as tile
    var topoMap = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        minZoom: 3,
        attribution:
          'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)',
      }
    );

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    // Create More Markers

    let mark1 = L.marker([39.912892, 32.857462], { icon: defIcon }).bindPopup(
      'This is a marker'
    );
    let mark2 = L.marker([39.91161, 32.859782], { icon: defIcon }).bindPopup(
      'Wow another marker'
    );
    let mark3 = L.marker([39.911967, 32.857554], { icon: defIcon }).bindPopup(
      "Close the 'Markers' layer to hide these markers"
    );
    let otherMarkers = L.layerGroup([mark1, mark2, mark3]);

    // Create Map
    this.map = L.map('task-one-map', {
      center: [39.912016, 32.858681],
      zoom: 17,
      layers: [tiles, otherMarkers],
    });
    // tiles.addTo(this.map);

    // Create Marker on MapperX
    let mapperXMarker = L.marker([39.912016, 32.858681], {
      icon: defIcon,
    }).addTo(this.map);

    // Create Popup on MapperX
    mapperXMarker.bindPopup('<b>MapperX Offices</b>').openPopup();

    // Create and add Layer Control
    let layerControl = L.control
      .layers({ StreetMap: tiles, TopoMap: topoMap })
      .addTo(this.map);
    layerControl.addOverlay(otherMarkers, 'Markers');
  }

  constructor() {}

  // DONT USE ngOnInit
  // HTML element must be created before map is initialized on the HTML element
  ngAfterViewInit(): void {
    this.initializeMap();
  }
}
