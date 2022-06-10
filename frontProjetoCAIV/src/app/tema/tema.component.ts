import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AuthService } from '../service/auth.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService
  ) {}

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(["/login"])
    }

    this.findAllTemas()
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe(
      (resp: Tema[]) =>{
      this.listaTemas = resp
      },
    );
  }

  cadastrar() {
      this.temaService.postTema(this.tema).subscribe({
      next: (resp: Tema) =>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!') // Mensagem pro usuário
      this.findAllTemas()
      this.tema = new Tema // Zera o campo após cadastrar um tema
      },
    });
  }
}