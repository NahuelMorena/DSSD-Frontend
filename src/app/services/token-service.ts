import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'accessToken';

  constructor() {}

  setToken(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  clearToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}