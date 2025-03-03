export interface User {
    id?: number;
    username: string;
  }
  
  export interface AuthRequest {
    username: string;
    password: string;
  }
  
  export interface RegisterRequest {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }