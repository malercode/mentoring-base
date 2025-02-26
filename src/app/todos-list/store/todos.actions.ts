import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../todos-list.component';

export const TodosActions = createActionGroup({
    source: 'Todos',
    events: {
        'create': props<{ todo: Todo }>(), 
        'delete': props<{ id: number }>(),
        loadTodos: emptyProps(),
        loadTodosSuccess: props<{ todos: Todo[] }>(),
        loadTodosFailure: props<{ error: any }>(),
    },
});