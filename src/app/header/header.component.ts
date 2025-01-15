import { Component, effect, inject } from '@angular/core';
import { MaterialModule } from '../helper/material.module';
import { ThemeService } from '../services/theme.service';
import { TitleChangerService } from '../services/title/title-changer.service';
import { TokenService } from '../services/auth/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly themeService: ThemeService = inject(ThemeService);
  readonly titleChangerService: TitleChangerService = inject(TitleChangerService);
  readonly tokenService: TokenService = inject(TokenService);
  private router: Router = inject(Router);

  constructor() {
  }

  //toggle theme
  toggleTheme(): void {
    this.themeService.setTheme(!this.themeService.isThemeLight());
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}
