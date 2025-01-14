import { Component, effect, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './helper/material.module';
import { HeaderComponent } from './header/header.component';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './services/theme.service';

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

  constructor() {
    // Reactively watch for changes
    effect(() => {
      this.checkTheme();
    });
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
