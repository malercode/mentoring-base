import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  name: string,
  email: string,
  isAdmin: boolean | null
}


@Injectable({
  providedIn: 'root'
})


export class UserService {
  private readonly userSubject$ = new BehaviorSubject<IUser | null>(null);
  public readonly user$ = this.userSubject$.asObservable();

  private user: IUser = {
    name: '',
    email: '',
    isAdmin: null
  }

  loginAsAdmin() {
    this.userSubject$.next({...this.user, isAdmin: true})
  }

  loginAsUser() {
    this.userSubject$.next({...this.user, isAdmin: false})
  }

  logout() {
    this.userSubject$.next(null)
  }

  get isAdmin() {
    return this.userSubject$.value?.isAdmin
  }
}
