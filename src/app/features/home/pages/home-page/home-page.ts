import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero-component/hero-component';
import { StatsComponent } from '../../components/stats-component/stats-component';
import { CategoriesComponent } from '../../components/categories-component/categories-component';
import { FeaturedComponent } from '../../components/featured-component/featured-component';
import { CtaComponent } from '../../components/cta-component/cta-component';

@Component({
  selector: 'home-page',
  imports: [HeroComponent, StatsComponent, CategoriesComponent, FeaturedComponent, CtaComponent],
  templateUrl: './home-page.html',
})
export class HomePage {}
