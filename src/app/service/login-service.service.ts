import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  public token: string;

  constructor(private http: HttpClient) { }
  login(usuario: string, password: string) {
    return this.http.post<any>('http://localhost:4000/login',
      { usuario, password }
    ).toPromise();
  }
}
