import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consultar-curso',
  templateUrl: './consultar-curso.component.html',
  styleUrls: ['./consultar-curso.component.css'],
})
export class ConsultarCursoComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}
  mensagem: string = '';
  curso: any[] = [];

  ngOnInit(): void {
    this.httpClient.get(environment.apiUrl + '/curso').subscribe((data) => {
      this.curso = data as any[];
    });
  }

  Limpar(): void {
    window.location.reload();
  }

  voltar(): void {
    window.location.href="index.html"
  }

  formPesquisa = new FormGroup({
    //campos formulario
    descricao: new FormControl(''),
    dataInicio: new FormControl(''),
    dataTermino: new FormControl(''),
  });

  get form(): any {
    return this.formPesquisa.controls;
  }

  onSubmit(): void {
    this.httpClient
      .get(
        environment.apiUrl +
          'curso?descricao=' +
          this.formPesquisa.value.descricao +
          '&dataInicio=' +
          this.formPesquisa.value.dataInicio +
          '&dataTermino=' +
          this.formPesquisa.value.dataTermino
      )
      .subscribe(
        (data) => {
          this.curso = data as any[];
        },

        (error) => {
          console.log(error.error);
          console.log(this.curso);
        }
      );
  }


  excluir(idCurso: number): void {
    if (window.confirm('Deseja realmente excluir o curso selecionado?')) {
      this.httpClient
        .delete(environment.apiUrl + '/curso/' + idCurso, {
          responseType: 'text',
        })

        .subscribe(
          (data) => {
            this.mensagem=data
            this.ngOnInit();
          },
          (error) => {
            this.mensagem = error.error + " Curso não pode ser excluido.";

          }
        );
    }
  }
}
