import { Component, Input } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, map, tap } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private breakpointObs: BreakpointObserver) {}

  // Check for mobile
  // Handset is 600px
  isHandset$: Observable<boolean> = this.breakpointObs
    .observe(Breakpoints.Handset)
    .pipe(
      map((res) => res.matches)
    );
}
