import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/users.actions";
import { selectUsers } from "./store/users.selectors";


export interface User {
    id: number;
    name: string;
    username?: string;
    email: string;
    address?: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase?: string;
      bs?: string;
    };
  }

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, MatDialogModule, ReactiveFormsModule],
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
    
})


export class UsersListComponent implements OnInit{
  @Input()
    user!: User;


  readonly usersApiServise = inject(UsersApiService);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private readonly store = inject(Store);
  public readonly users$ = this.store.select(selectUsers);
            
  durationInSeconds = 5;
  

  constructor() {}

  ngOnInit(): void {
      this.store.dispatch(UsersActions.loadUsers());
  }


    public createUser(formData: User) {
      const currentUsers$ = this.store.select(selectUsers);
      currentUsers$.subscribe((currentUsers: User[]) => {
          const existingUser: User | undefined = currentUsers.find(
              (currentElement: User) => currentElement.email === formData.email
          );
  
          if (existingUser) {
              this.openSnackBar("Пользователь с таким email уже существует");
          } else {
              this.store.dispatch(
                  UsersActions.create({ user: formData })
              );
              this.openSnackBar("Пользователь успешно добавлен!");
          }
      });
  }
    

    deleteUser(id: number) {
      this.store.dispatch(UsersActions.delete({ id }))
      this.openSnackBar("Пользователь успешно удален!");

    }

    editUser(user: User){
      this.store.dispatch(UsersActions.edit({ user }))
      this.openSnackBar("Пользователь успешно отредактирован!");
    }


    openCreateUserForm(): void {
      const dialogRef = this.dialog.open(CreateUserFormComponent, {
        data: {user: this.user},
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.createUser(result);
        }
      });
    }


    openSnackBar(message: string) {
      this._snackBar.open(message, 'OK', {
        duration: this.durationInSeconds * 1000,
      });  
  }
}