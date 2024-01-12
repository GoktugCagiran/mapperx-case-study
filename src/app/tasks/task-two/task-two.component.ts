import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { MatDialog } from '@angular/material/dialog';
import { ResDialogComponent } from './res-dialog/res-dialog.component';

@Component({
  selector: 'app-task-two',
  templateUrl: './task-two.component.html',
  styleUrls: ['./task-two.component.scss'],
})
export class TaskTwoComponent implements AfterViewInit {
  private map: any;
  // Initial resolution is 512
  currentRes: number = 512;
  georaster: any;
  layer: any;
  constructor(public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    // Load geoRaster Parser
    let georaster_parser = require('georaster');

    // Create Map
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 25,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    this.map = L.map('task-two-map', {
      center: [39.912016, 32.858681],
      zoom: 17,
      layers: [tiles],
    });

    let tir_file_dir = 'assets/data/raster.tif';

    // Read tif file
    fetch(tir_file_dir)
      .then((res) => res.arrayBuffer())
      .then((res) => georaster_parser(res))
      .then((georasterRes) => {
        this.georaster = georasterRes;
        this.createGeorasterLayer();
      });
  }

  createGeorasterLayer() {
    // Remove layer from map
    if (this.layer) {
      this.map.removeLayer(this.layer);
    }
    // Create layer
    this.layer = new GeoRasterLayer({
      georaster: this.georaster,
      opacity: 0.9,
      resolution: this.currentRes,
    });
    // Add layer to map
    this.layer.addTo(this.map);
    // Set map bounds to layer
    this.map.fitBounds(this.layer.getBounds());
  }

  openChangeResDialog() {
    const dialogRef = this.dialog.open(ResDialogComponent, {
      data: { currentRes: this.currentRes },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Change Resolution
      if (result && result != this.currentRes) {
        this.currentRes = result;
        this.createGeorasterLayer();
      }
    });
  }
}
