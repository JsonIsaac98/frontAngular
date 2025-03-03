// src/app/features/news/news-detail/news-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';
import { News, NewsDetails } from '../../../core/models/news.model';
import { RecommendedNewsComponent } from '../recommended-news/recommended-news.component';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  standalone: true,
  imports: [CommonModule, DatePipe, RecommendedNewsComponent]
})
export class NewsDetailComponent implements OnInit {
  newsDetails: NewsDetails | null = null;
  recommendedNews: News[] = [];
  loading = true;
  error = '';

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const newsId = +params['id'];
      if (newsId) {
        this.loadNewsDetails(newsId);
      } else {
        this.error = 'ID de noticia no válido';
        this.loading = false;
      }
    });
  }

  loadNewsDetails(id: number): void {
    this.loading = true;
    this.newsService.getNewsById(id).subscribe({
      next: (details) => {
        this.newsDetails = details;
        this.loading = false;
        this.loadRecommendedNews(id);
      },
      error: (err) => {
        this.error = 'Error al cargar los detalles de la noticia: ' + (err.message || 'Desconocido');
        this.loading = false;
      }
    });
  }

  loadRecommendedNews(newsId: number): void {
    this.newsService.getRecommendedNews(newsId).subscribe({
      next: (news) => {
        this.recommendedNews = news;
      },
      error: (err) => {
        console.error('Error al cargar noticias recomendadas:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}