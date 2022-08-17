import { Injectable } from '@angular/core';

//Modulo para la tranferencia de datos
import { HttpClient } from '@angular/common/http';

import { Router } from "@angular/router/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(user) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signIn(user) {
    return this.http.post<any>(this.URL + '/signin', user);
  }

  //Retrona true si el token existe
  loggedIn() {
    //con una sola linea
    return !!localStorage.getItem('token') 
    
    // Forma completa 
    //if (localStorage.getItem('token')) {
    //  return true
    //}
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
  }
}
