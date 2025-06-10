import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserRegister } from '../models/user-register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  register(userData: UserRegister): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
    };
    return this.http.post(`${this.apiUrl}/users/register`, userData, httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Ocorreu um erro:', error);
    // Você pode personalizar o tratamento de erro aqui
    // Por exemplo, verificar error.status para diferentes tipos de erro HTTP
    return throwError(() => new Error('Falha no registro. Tente novamente mais tarde.'));
  }
}
