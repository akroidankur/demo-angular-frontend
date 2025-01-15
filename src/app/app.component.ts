import { Component, effect, inject, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from './helper/material.module';
import { HeaderComponent } from './header/header.component';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { ApiService } from './services/api/api.service';
import { TokenService } from './services/auth/token.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly document: Document = inject(DOCUMENT);
  private readonly themeService: ThemeService = inject(ThemeService);
  readonly apiService: ApiService = inject(ApiService);
  private readonly tokenService: TokenService = inject(TokenService);
  private router: Router = inject(Router);

  constructor() {
    // Reactively watch for changes
    effect(() => {
      this.checkTheme();
    });
  }

  async ngonInit(): Promise<void> {
    const token = await this.tokenService.getToken();

    if (token && this.tokenService.isLoggedIn()) {
      this.router.navigate(['/staffs']);
    } else {
      this.router.navigate(['/']);
    }
  }

  //assign theme
  private checkTheme(): void {
    if (this.themeService.isThemeLight()) {
      this.setLightTheme();
    }
    else {
      this.setDarkTheme();
    }
  }

  //render dark theme
  private setDarkTheme(): void {
    this.renderer.removeClass(this.document.body, 'light');
    this.renderer.addClass(this.document.body, 'dark');
  }

  //render light theme
  private setLightTheme(): void {
    this.renderer.removeClass(this.document.body, 'dark');
    this.renderer.addClass(this.document.body, 'light');
  }
}
