import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { TodosApiService } from "../todos-api.service";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { Store } from "@ngrx/store";
import { TodosActions } from "./store/todos.actions";
import { selectTodos } from "./store/todos.selectors";

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }

@Component({
    selector: 'app-todos-list',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
    templateUrl: './todos-list.component.html',
    styleUrls: ['./todos-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class TodosListComponent implements OnInit{
  readonly todosApiServise = inject(TodosApiService);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);


  constructor() {}

  ngOnInit(): void {
      this.store.dispatch(TodosActions.loadTodos());
  }

  public createTodo(formData: Todo) {
    this.store.dispatch(
        TodosActions.create({ todo: formData })
    );
}

    deleteTodo(id: number) {
      this.store.dispatch(TodosActions.delete({ id }))
    }
}