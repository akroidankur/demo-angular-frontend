import { Component, effect, inject } from '@angular/core';
import { MaterialModule } from '../helper/material.module';
import { ThemeService } from '../services/theme.service';
import { TitleChangerService } from '../services/title/title-changer.service';

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

  constructor() {
    // effect(() => {
    //   this.widthService.width();
    // });
  }

  //reload page
  reloadPage(): void {
    window.location.reload();
  }

  //toggle theme
  toggleTheme(): void {
    this.themeService.setTheme(!this.themeService.isThemeLight());
  }
}
