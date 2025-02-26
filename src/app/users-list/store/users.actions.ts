import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from "../users-list.component";

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'edit': props<{ user: User }>(),
        'create': props<{ user: User }>(),
        'delete': props<{ id: number }>(),
        loadUsers: emptyProps(), 
        loadUsersSuccess: props<{ users: User[] }>(), 
        loadUsersFailure: props<{ error: any }>(),
    },
});