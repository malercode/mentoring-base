import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from "@angular/forms";


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
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent, MatDialogModule, ReactiveFormsModule],
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MatDialog]

})


export class UsersListComponent{
  @Input()
    user!: User;

  @Output() 
    createUserEvent = new EventEmitter<User>();



  readonly usersApiServise = inject(UsersApiService);
  readonly usersService = inject(UsersService);
  readonly dialog = inject(MatDialog);

    constructor() {
        this.usersApiServise.getUsers().subscribe(
          (response: User[]) => {
                this.usersService.setUsers(response)
            });
    }


    public createUser(formData: User) {
      this.usersService.createUser({
        id: new Date().getTime(),
        name: formData.name,
        email: formData.email,
        website: formData.website,
        company: {
        name : formData.company.name
        }
      });
      this.createUserEvent.emit(formData);
    }
    

    deleteUser(id: number) {
        this.usersService.deleteUser(id);
    }

    editUser(user: User){
      this.usersService.editUser(user);
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
}