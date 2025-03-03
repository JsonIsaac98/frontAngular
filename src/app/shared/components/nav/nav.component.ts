import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';
import { User } from '../../../core/models/auth.model';
import { NewsService } from '../../../core/services/news.service';
import { CommonModule } from '@angular/common';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Category } from '../../../core/models/news.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterLinkActive,
    NgIf,
    NgFor,
    NgClass
  ]
})
export class NavComponent implements OnInit, OnDestroy {
  currentUser$: Observable<User | null>;
  categories: Category[] = [];
  isMobileMenuOpen = false;
  private subscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    private newsService: NewsService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {    
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        if (user) {
          this.loadCategories();
        }
      })
    );

    if (this.authService.isAuthenticated()) {
      this.loadCategories();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCurrentUsername(): string {
    const user = this.authService.getCurrentUser();
    return user?.username || '';
  }

  loadCategories(): void {
    this.subscription.add(
      this.newsService.getCategories().subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error: (error) => {
          console.error('Error al cargar categorías:', error);
        }
      })
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}