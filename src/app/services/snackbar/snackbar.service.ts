import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(message: string, duration: number = 3, action: string = 'Close'): void {
    const config = new MatSnackBarConfig();
    config.duration = duration * 1000;
    config.verticalPosition = 'top';

    this.snackBar.open(message, action, config);
  }
}
