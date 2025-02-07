import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";


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
    phone?: string;
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


export class UsersListComponent{
  @Input()
    user!: User;


  readonly usersApiServise = inject(UsersApiService);
  readonly usersService = inject(UsersService);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
            
  durationInSeconds = 5;
  

    constructor() {
        this.usersApiServise.getUsers().subscribe(
          (response: User[]) => {
                this.usersService.setUsers(response)
            });
    }


    public createUser(formData: User) {
      this.usersService.users$.subscribe((currentUsers: User[]) => {
        const existingUser = currentUsers.find(
            (currentElement: { email: string; }) => currentElement.email === formData.email
        );

        if (existingUser !== undefined) {
            this.openSnackBar("Пользователь с таким email уже существует");
        } else {
            this.usersService.createUser(formData);
            this.openSnackBar("Пользователь успешно добавлен!");
        }
    });
  }
    

    deleteUser(id: number) {
      this.usersService.deleteUser(id);
      this.openSnackBar("Пользователь успешно удален!");
      console.log(id)

    }

    editUser(user: User){
      this.usersService.editUser(user);
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