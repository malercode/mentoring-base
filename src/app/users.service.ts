import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "./users-list/users-list.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class UsersService {
    private usersSubject$ = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject$.asObservable();
    private _snackBar = inject(MatSnackBar);
    
    durationInSeconds = 5;

    setUsers(users: User[]) {
        this.usersSubject$.next(users);
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, 'OK', {
          duration: this.durationInSeconds * 1000,
        });
      }

    
    editUser(editedUser: User) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                user => {
                    return (user.id === editedUser.id) ? editedUser : user;

                }
            )   
        );
        this.openSnackBar('Пользователь успешно отредактирован!');

    }


    createUser(user: User){
        const userIsExiting = this.usersSubject$.value.find(
            (currentElement) => currentElement.email === user.email
        );
        
        if (userIsExiting !== undefined) {
            this.openSnackBar('Такой пользователь уже зарегестрирован!');
        } else {
            this.usersSubject$.next([...this.usersSubject$.value, user]);
            this.openSnackBar('Пользователь успешно добавлен!');
        }
    }


    deleteUser(id: number) {
        this.usersSubject$.next(
            this.usersSubject$.value.filter(user => {
                return user.id !== id;
              }
            )
        );
        this.openSnackBar('Пользователь успешно удален!');
      }
      
}