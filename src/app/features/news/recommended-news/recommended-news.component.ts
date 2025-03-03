// src/app/features/news/recommended-news/recommended-news.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { News } from '../../../core/models/news.model';

@Component({
  selector: 'app-recommended-news',
  templateUrl: './recommended-news.component.html',
  styleUrls: ['./recommended-news.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class RecommendedNewsComponent {
  @Input() news: News[] = [];
}