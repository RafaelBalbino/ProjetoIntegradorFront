import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user: User = new User
  confirmarSenha: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
      window.scroll(0,0)
    }
  
    confirmaSenha(event: any) {
      this.confirmarSenha = event.target.value
    }
  
    cadastrar() {
      if(this.user.senha != this.confirmarSenha) {
        this.alertas.showAlertDanger('A senha não coincide! Confirme sua senha novamente.')
      }
      else {
        if(this.user.foto == ''){
          this.user.foto = 'https://i.imgur.com/rOmhIOT.png'
        }
        this.authService.cadastrar(this.user).subscribe((resp:User) => {
          this.user = resp
          this.router.navigate(["/login"])
          this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
        })
      }
    }
  
  }
