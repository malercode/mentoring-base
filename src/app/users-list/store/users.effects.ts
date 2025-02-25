import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsersApiService } from '../../users-api.service';
import { UsersActions } from './users.actions';


export const loadUsers$ = createEffect(() => {
    const actions$ = inject(Actions);
    const usersApiService = inject(UsersApiService);

    return actions$.pipe(
        ofType(UsersActions.loadUsers),
        mergeMap(() =>
            usersApiService.getUsers().pipe(
                map((users) => UsersActions.loadUsersSuccess({ users })),
                catchError((error) => of(UsersActions.loadUsersFailure({ error })))
            )
        )
    );
}, { functional: true });