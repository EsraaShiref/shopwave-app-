import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSubject.asObservable();

  toggle(): void {
    this.isDarkSubject.next(!this.isDarkSubject.value);
  }

  get isDark(): boolean {
    return this.isDarkSubject.value;
  }
}