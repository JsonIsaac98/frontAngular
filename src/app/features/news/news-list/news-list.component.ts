import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';
import { News } from '../../../core/models/news.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class NewsListComponent implements OnInit {
  news: News[] = [];
  loading = true;
  error = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.loading = true;
    this.newsService.getLatestNews().subscribe({
      next: (news) => {
        this.news = news;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar noticias: ' + (err.message || 'Desconocido');
        this.loading = false;
      }
    });
  }
}