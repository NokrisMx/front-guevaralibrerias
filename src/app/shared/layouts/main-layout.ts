import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header-component/header-component';
import { FooterComponent } from '../components/footer-component/footer-component';

@Component({
  selector: 'main-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header-component />
      <main class="flex-1">
        <router-outlet />
      </main>
      <app-footer-component />
    </div>
  `,
})
export class MainLayout {}
