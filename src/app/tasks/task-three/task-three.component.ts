import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
// For editing
import 'leaflet-editable';
// For dragging lines, polygons etc.
import 'leaflet.path.drag';
declare var toGeoJSON: any;

@Component({
  selector: 'app-task-three',
  templateUrl: './task-three.component.html',
  styleUrls: ['./task-three.component.scss'],
})
export class TaskThreeComponent implements AfterViewInit {
  map: L.Map | null = null;

  initializeMap() {
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    // Initially set map to MapperX office coordinates
    this.map = L.map('task-three-map', {
      editable: true,
      layers: [tiles],
    }).setView([39.912016, 32.858681], 17);


    // ******************* Create Controls ******************* //

    // Draw Line Control
    let NewLineControl = L.Control.extend({
      options: {
        position: 'topleft',
      },

      onAdd: function (map: any) {
        let container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
        let link = L.DomUtil.create('a', '', container);

        link.href = '#';
        link.title = 'Create a new line';
        link.innerHTML = '/\\/';
        L.DomEvent.on(link, 'click', L.DomEvent.stop).on(
          link,
          'click',
          function () {
            map.editTools.startPolyline();
          }
        );

        return container;
      },
    });

    // Draw Polygon Control
    let NewPolygonControl = L.Control.extend({
      options: {
        position: 'topleft',
      },

      onAdd: function (map: any) {
        let container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
        let link = L.DomUtil.create('a', '', container);

        link.href = '#';
        link.title = 'Create a new polygon';
        link.innerHTML = '▱';
        L.DomEvent.on(link, 'click', L.DomEvent.stop).on(
          link,
          'click',
          function () {
            map.editTools.startPolygon();
          }
        );

        return container;
      },
    });

    // Draw Circle Control
    let NewCircleControl = L.Control.extend({
      options: {
        position: 'topleft',
      },
      onAdd: function (map: any) {
        let container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
        let link = L.DomUtil.create('a', '', container);

        link.href = '#';
        link.title = 'Create a new circle';
        link.innerHTML = '⬤';
        L.DomEvent.on(link, 'click', L.DomEvent.stop).on(
          link,
          'click',
          function () {
            map.editTools.startCircle();
          }
        );

        return container;
      },
    });

    // Register Controls
    this.map.addControl(new NewLineControl());
    this.map.addControl(new NewPolygonControl());
    this.map.addControl(new NewCircleControl());

    // Delete Shapes by ctrl + click
    this.map.on('layeradd', function (e) {
      if (e.layer instanceof L.Path) {
        e.layer.on('click', L.DomEvent.stop).on(
          'click',
          // this:any is a fake parameter and it is set by the caller
          function (this: any, e: any) {
            if (
              (e.originalEvent.ctrlKey || e.originalEvent.metaKey) &&
              // !e.target.editor['_drawing'] &&
              this.editEnabled()
            ) {
              this.editor.deleteShapeAt(e.latlng);
            }
          },
          e.layer
        );
      }

      if (e.layer instanceof L.Path) {
        e.layer
          .on('dblclick', L.DomEvent.stop)
          .on('dblclick', (e.layer as any).toggleEdit);
      }
    });

    // Create Tooltip
    let tooltip = L.DomUtil.get('tooltip');
    // Add tooltip function
    function addTooltip(e: any) {
      L.DomEvent.on(document as any, 'mousemove', moveTooltip);
      tooltip!.innerHTML = 'Click on the map to start. Click on the last point again to stop drawing.';
      tooltip!.style.display = 'block';
    }

    // Remove tooltip function
    function removeTooltip(e: any) {
      tooltip!.innerHTML = '';
      tooltip!.style.display = 'none';
      L.DomEvent.off(document as any, 'mousemove', moveTooltip);
    }

    // Move tooltip with mouse movement
    function moveTooltip(e: any) {
      tooltip!.style.left = e.clientX + 20 + 'px';
      tooltip!.style.top = e.clientY - 10 + 'px';
    }

    this.map.on('editable:drawing:start', addTooltip);
    this.map.on('editable:drawing:end', removeTooltip);

    // Read .kml file
    fetch('assets/data/poligon.kml')
      .then((res) => res.text())
      .then((resBody: any) => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(resBody, 'text/xml');
        let temp = toGeoJSON.kml(xml);
        // Array to store coordinates from KML
        let coords: any[] = [];
        let geoJson = L.geoJSON(temp, {
          onEachFeature(feature, layer) {
            // Push coordinates from KML to array
            // Coordinates are not X,Y but Y,X for some reason so reverse each element
            coords.push(
              (feature.geometry as any).coordinates.map((val: any) => {
                return val.map((coorData: any) => [coorData[1], coorData[0]]);
              })
            );
          },
        });
        // Add Popup
        let geojsonPoly = L.polygon(coords)
          .bindPopup('This is the kml you want right?')
          .addTo(this.map!);
        // Enable editing Polygon
        geojsonPoly.enableEdit();
        // Toggle editing polygon with double click
        geojsonPoly
          .on('dblclick', L.DomEvent.stop)
          .on('dblclick', geojsonPoly.toggleEdit);
        geojsonPoly.openPopup();
        this.map!.fitBounds(geoJson.getBounds());
      });
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }
}
