import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from '../../components/nav-blank/nav-blank.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, NavBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
})
export class BlankLayoutComponent {
  isScrolled: boolean = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    const screenHeight = window.innerHeight;
    this.isScrolled = scrollPosition > screenHeight;
  }
  goTop(): void {
    scrollTo(0, 0);
  }
}
