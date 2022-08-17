import { Component, OnInit } from '@angular/core';

//Importamos el servicio
import { AuthService } from '../../services/auth.service';

//Redirecionar
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn(){
    console.log(this.user)
    //Vamos a enviar a los datos del USUARIO al servidor
    this.authService.signIn(this.user)

    // nos subscribimos a los cambios del servidor
    .subscribe(
      res => {
        console.log(res)
        //Guardamos el token el local storage
        localStorage.setItem('token', res.token);
        
        //Re-direccionamos a la ruta de api/private
        this.router.navigate(['/private']);
      },
      err => console.log(err)
    )
  }
}
