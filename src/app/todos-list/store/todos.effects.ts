import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodosApiService } from '../../todos-api.service';
import { TodosActions } from './todos.actions'; 


export const loadTodos$ = createEffect(() => {
    const actions$ = inject(Actions);
    const todosApiService = inject(TodosApiService);

    return actions$.pipe(
        ofType(TodosActions.loadTodos),
        mergeMap(() =>
            todosApiService.getTodos().pipe(
                map((todos) => TodosActions.loadTodosSuccess({ todos })),
                catchError((error) => of(TodosActions.loadTodosFailure({ error })))
            )
        )
    );
}, { functional: true });