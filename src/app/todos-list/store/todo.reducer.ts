import { createReducer, on } from '@ngrx/store';
import { TodosActions } from './todos.actions';
import { Todo } from '../todos-list.component';

export interface TodosState {
    todos: Todo[];
}

export const initialState: TodosState = {
    todos: [],
};

export const todosReducer = createReducer(
    initialState,
    on(TodosActions.loadTodosSuccess, (state, payload) => ({
            ...state,
            users: payload.todos,
        })),
    on(TodosActions.create, (state, { todo }) => ({
        ...state,
        todos: [...state.todos, todo], 
    })),
    on(TodosActions.delete, (state, { id }) => ({
        ...state,
        todos: state.todos.filter((t) => t.id !== id),
    }))
);