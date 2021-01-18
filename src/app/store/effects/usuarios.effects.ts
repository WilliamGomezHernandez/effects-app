import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import * as usuariosActions from '../actions/usuarios.actions';





@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        // aca escucho la accion
        () => this.actions$.pipe(
            //evalua SOLO esta accion para que cuando se dispare (solo esta accion) pueda disparar el efecto
            ofType( usuariosActions.cargarUsuarios ),
            //nos va ayudar a poder disparar  un nuevo observable y mezclarlo con el obserbable anterior 
            mergeMap(
                () => this.usuarioService.getUsers()
                  .pipe(// no es necesario solo se hizo para ver como iba la informacion en ese punto
                      //tap( data => console.log('getUsers effect', data))
                      map( users => usuariosActions.cargarUsuariosSuccess({usuarios: users})),
                      catchError( err => of(usuariosActions.cargarUsuariosError({ payload: err })))
                  )
            )
        )
    );

}
