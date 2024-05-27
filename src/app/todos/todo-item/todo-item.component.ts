import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducer';
import  * as actions  from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent implements OnInit{
  
  @Input() todo: Todo  = new Todo(''); 
  //@ViewChild('inputFisico',{ static: false }) txtInputFisico!: ElementRef
  @ViewChildren('inputFisico') txtInputFisico!: ElementRef


  chkCompletado!: FormControl; 
  txtImput!: FormControl; 

  editando: boolean = false;

  constructor( private store: Store<AppState>) {}

  ngOnInit(): void { 
    this.todo = {... this.todo}
    
    //this.todo.completado = true;
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtImput = new FormControl(this.todo.texto, Validators.required); 
    
    this.chkCompletado.valueChanges
      .subscribe(valor => {
        this.store.dispatch(actions.toggle( {id: this.todo.id} ));
      });
  }
  
  editar(){
    this.editando = true;
    this.txtImput.setValue( this.todo.texto);
    
    //  setTimeout(() => {
    //    this.txtInputFisico.nativeElement.select();
    //  },1 );  
  }

  terminarEdicion(){
    this.editando = false;

    if (this.txtImput.invalid) { return };
    if (this.txtImput.value === this.todo.texto) { return };


    this.store.dispatch(actions.editar({ id: this.todo.id, texto: this.txtImput.value }));
  }

  borrar(){
    this.store.dispatch(actions.borrar({ id: this.todo.id }))
  }
}
