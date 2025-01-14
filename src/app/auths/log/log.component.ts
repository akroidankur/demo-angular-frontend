import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Log } from '../../interfaces/logs/log';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { LoginResponse } from '../../interfaces/logs/login-response';
import { TitleChangerService } from '../../services/title/title-changer.service';
import { MaterialModule } from '../../helper/material.module';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent implements OnInit {
  spinner: boolean = true;
  isNotPassword: boolean = false;
  inputType: string = 'password'

  logData: Log = {
    username: '',
    password: ''
  }

  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)
  private snackBarService: SnackbarService = inject(SnackbarService)
  titleChangerService: TitleChangerService = inject(TitleChangerService)

  constructor() { }

  ngOnInit(): void {
    this.titleChangerService.title.set('Log In');
  }

  passwordToggler() {
    this.isNotPassword = !this.isNotPassword;
    this.isNotPassword ? this.inputType = 'password' : this.inputType = 'text'
  }

  logIn() {
    this.authService.logIn(this.logData).subscribe({
      next: (response: LoginResponse) => {
        this.handleLogin(response)
      },
      error: (error) => {
        this.snackBarService.showSnackBar(error.error.message)}
    })
  }

  private handleLogin(response: LoginResponse): void {
    this.router.navigateByUrl('staffs')
    this.snackBarService.showSnackBar(`Welcome ${response.user.username}`);
  }
}
