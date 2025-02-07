import {  Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "./users-list/users-list.component";


@Injectable({providedIn: 'root'})
export class UsersService {
    private usersSubject$ = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject$.asObservable();

    setUsers(users: User[]) {
        this.usersSubject$.next(users);
    }

    
    editUser(editedUser: User) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                user => {
                    return (user.id === editedUser.id) ? editedUser : user;

                }
            )   
        );
    }


    createUser(user: User){
        const currentUsers = this.usersSubject$.value;
        console.log('Текущие пользователи до добавления:', currentUsers);
    
        const updatedUsers = [...currentUsers, user];
        this.usersSubject$.next(updatedUsers);
    
        console.log('Добавлен пользователь:', user);
        console.log('Обновленный список пользователей:', updatedUsers);
    }


    deleteUser(id: number) {
    const currentUsers = this.usersSubject$.value;
    const updatedUsers = currentUsers.filter(user => user.id !== id);

    this.usersSubject$.next(updatedUsers);
    console.log('Удален пользователь с ID:', id);
    console.log('Обновленный список пользователей:', updatedUsers);
      }
      
}