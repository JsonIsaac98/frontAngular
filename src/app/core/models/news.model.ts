export interface News {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  }
  
  export interface NewsDetails extends News {
    content: string;
    publishDate: string;
    category?: Category;
    categoryName?: string;
    tags?: Tag[];
  }
  
  export interface Category {
    id: number;
    name: string;
    description: string;
  }
  
  export interface Tag {
    id: number;
    name: string;
  }