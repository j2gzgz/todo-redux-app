import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filtro/filtro.actions';
import { limpiarTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css'
})
export class TodoFooterComponent implements OnInit{

  filtroActual: actions.filtrosValidos = 'todos'; 
  filtros: actions.filtrosValidos[] = ['todos','completados','pendientes'];
  pendientes: number = 0;
  
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('filtro')
    //   .subscribe( filtro => this.filtroActual = filtro)

    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }
 
  cambiarFiltro(filtro: actions.filtrosValidos){
    //console.log('Filtro:', filtro )
    this.store.dispatch(actions.setFiltro({ filtro: filtro }));
  }
  limpiarCompletadas(){
    this.store.dispatch( limpiarTodos() );
  }
}