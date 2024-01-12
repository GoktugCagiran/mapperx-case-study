import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-res-dialog',
  templateUrl: './res-dialog.component.html',
  styleUrls: ['./res-dialog.component.scss'],
})
export class ResDialogComponent {
  resOptions = [8, 16, 32, 64, 128, 256, 512, 1024];

  constructor(
    public dialogRef: MatDialogRef<ResDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentRes: number }
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
