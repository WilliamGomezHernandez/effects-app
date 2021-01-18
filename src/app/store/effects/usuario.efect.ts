import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import * as usuariosActions from '../actions';





@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        // aca escucho la accion
        () => this.actions$.pipe(
            //evalua SOLO esta accion para que cuando se dispare (solo esta accion) pueda disparar el efecto
            ofType( usuariosActions.cargarUsuario ),
            //nos va ayudar a poder disparar  un nuevo observable y mezclarlo con el obserbable anterior 
            mergeMap(
                ( action ) => this.usuarioService.getUserById(action.id)
                  .pipe(// no es necesario solo se hizo para ver como iba la informacion en ese punto
                      //tap( data => console.log('getUsers effect', data))
                      map( user => usuariosActions.cargarUsuarioSuccess({usuario: user})),
                      catchError( err => of(usuariosActions.cargarUsuarioError({ payload: err })))
                  )
            )
        )
    );

}
