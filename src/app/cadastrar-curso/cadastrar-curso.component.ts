import { environment } from '../../environments/environment';
import {
  FormGroup,
  FormControl,
  Validators,
  Form,
  NumberValueAccessor,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-curso',
  templateUrl: './cadastrar-curso.component.html',
  styleUrls: ['./cadastrar-curso.component.css'],
})
export class CadastrarCursoComponent implements OnInit {
  //atributo
  mensagem: string = '';

  categoria: any[] = [];

  constructor(private HttpClient: HttpClient) {}

  ngOnInit(): void {
    this.HttpClient.get(environment.apiUrl + '/categoria').subscribe((data) => {
      this.categoria = data as any[];
    });
  }

  //estrutura do formulario
  formCadastro = new FormGroup({
    //campos formulario
    descricao: new FormControl('', [Validators.required]),
    dataInicio: new FormControl('', [Validators.required]),
    dataTermino: new FormControl('', [Validators.required]),
    qtdAlunos: new FormControl(''),
    categoria: new FormControl('', [Validators.required]),
  });

  //acessando o formulario/pagina HTML pegando dados tela
  get form(): any {
    return this.formCadastro.controls;
  }
  voltar(): void {
    window.location.href = 'index.html';
  }

  //fazer chamada de cadastro na API
  onSubmit(): void {
    this.HttpClient.post(
      environment.apiUrl + '/curso',
      this.formCadastro.value,
      { responseType: 'text' }
    ).subscribe(
      (data) => {
        this.mensagem = data;
        console.log(this.formCadastro.value.categoria);
        this.formCadastro.reset();
      },

      (e) => {

        this.mensagem = e.error + "Cadastro não realizado.";

      }
    );
  }
}
