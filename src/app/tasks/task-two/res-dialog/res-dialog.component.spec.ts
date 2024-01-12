import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResDialogComponent } from './res-dialog.component';

describe('ResDialogComponent', () => {
  let component: ResDialogComponent;
  let fixture: ComponentFixture<ResDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResDialogComponent]
    });
    fixture = TestBed.createComponent(ResDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
