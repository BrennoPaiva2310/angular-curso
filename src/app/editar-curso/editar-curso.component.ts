import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css'],
})
export class EditarCursoComponent implements OnInit {
  mensagem: string = '';

  categoria: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.httpClient.get(environment.apiUrl + '/categoria').subscribe((data) => {
      this.categoria = data as any[];
    });

    const idCurso = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.httpClient.get(environment.apiUrl + '/curso/' + idCurso).subscribe(
      (data: any) => {
        this.formEdicao.patchValue({ idCurso: data.idCurso });
        this.formEdicao.patchValue({ descricao: data.descricao });
        this.formEdicao.patchValue({ qtdAlunos: data.qtdAlunos });
        this.formEdicao.patchValue({ dataInicio: data.dataInicio });
        this.formEdicao.patchValue({ dataTermino: data.dataTermino });
        this.formEdicao.patchValue({ categoria: data.categoria.idCategoria });
      },
      (e) => {
        console.log(e);
      }
    );
  }

  formEdicao = new FormGroup({
    idCurso: new FormControl('',[Validators.required]),
    descricao: new FormControl('',[Validators.required]),
    dataInicio: new FormControl('',[Validators.required]),
    dataTermino: new FormControl('',[Validators.required]),
    qtdAlunos: new FormControl('',[Validators.required]),
    categoria: new FormControl('',[Validators.required]),
  });

  get form(): any {
    return this.formEdicao.controls;
  }

  voltar(): void {
    window.location.href = 'index.html';
  }

  onSubmit(): void {
    this.httpClient
      .put(environment.apiUrl + '/curso/editar', this.formEdicao.value, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          this.mensagem = data;


        },
        (e) => {

          this.mensagem = e.error + ' Erro na hora de editar';

        }
      );
  }
}
