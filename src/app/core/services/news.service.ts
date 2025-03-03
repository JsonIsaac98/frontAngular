import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News, NewsDetails, Category } from '../models/news.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getLatestNews(): Observable<News[]> {
    return this.http.get<News[]>(`${environment.apiUrl}/news/latest`);
  }

  getNewsById(id: number): Observable<NewsDetails> {
    return this.http.get<NewsDetails>(`${environment.apiUrl}/news/${id}`);
  }

  getRecommendedNews(newsId: number): Observable<News[]> {
    return this.http.get<News[]>(`${environment.apiUrl}/news/${newsId}/recommended`);
  }

  getNewsByCategory(categoryId: number): Observable<News[]> {
    return this.http.get<News[]>(`${environment.apiUrl}/news/category/${categoryId}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }
}