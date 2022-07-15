import { ConsultarCursoComponent } from './consultar-curso/consultar-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import { CadastrarCursoComponent } from './cadastrar-curso/cadastrar-curso.component';

import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'cadastrar-curso', component: CadastrarCursoComponent },

  { path: 'consultar-curso', component: ConsultarCursoComponent },


  { path: 'editar-curso/:id', component: EditarCursoComponent },
];

@NgModule({
  declarations: [
    AppComponent,

    CadastrarCursoComponent,
    ConsultarCursoComponent,
    EditarCursoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
