import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleChangerService {
  title = signal<string>('');

  constructor() { }
}
