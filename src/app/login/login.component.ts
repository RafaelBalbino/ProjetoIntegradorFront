import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Userlogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: Userlogin = new Userlogin()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  logar() {
    this.auth.entrar(this.userLogin).subscribe({
      next: (resp: Userlogin) => {
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id

      this.userLogin.foto

      this.router.navigate(['/inicio'])
      this.alertas.showAlertInfo('Seja bem-vindo(a)!')
    }, error: (erro) => {
      if (erro.status == 500 || erro.status == 401) {
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
        }
      },
    });
  }
}
