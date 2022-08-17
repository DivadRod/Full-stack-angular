import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


//Redirecionar
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(
    private authService:AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  signUp() {
    this.authService.signUp(this.user)
    .subscribe(
      res => {
        console.log(res);
        
        //Vamos a guardar el token en el localStorage
        localStorage.setItem('token', res.token);

        //Despues de recibir el token lo reedireccionamos al main
        this.router.navigate(['/private']);
        
      },
      err => console.log(err)
    )
    //console.log(this.user)
  }
}
