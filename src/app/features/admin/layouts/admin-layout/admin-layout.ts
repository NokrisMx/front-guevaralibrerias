import { Component } from '@angular/core';
import { AdminSidebarLayout } from '../admin-sidebar-layout/admin-sidebar-layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-layout',
  imports: [AdminSidebarLayout, RouterOutlet],
  templateUrl: './admin-layout.html',
})
export class AdminLayout {}
