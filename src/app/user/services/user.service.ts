import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // users: User[] = [];
  constructor(private http: HttpClient) {
  //   this.users = [
  //     {
  //       id: 1,
  //       userName: 'Nguyen Duc Anh',
  //       email: 'Anhnd68@fpt',
  //       phoneNumber: '01098881327'
  //     },
  //     {
  //       id: 2,
  //       userName: 'Nguyen Nam Anh',
  //       email: 'Anhnn69@fpt',
  //       phoneNumber: '11199984555'
  //     }
  // ];
  }



  getUsersList(): Observable<User[]>{
    return this.http
      .get<User[]>(`/api/users`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getUserById(id: number): Observable<User>{
    return this.http
      .get<User>(`/api/users/${id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  addNewUser(userData: User): Observable<User>{
    return this.http
      .post<User>(`/api/users`, userData)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateUser(userData: User): Observable<User> {
    return this.http
      .put<User>(`/api/users/${userData.id}`, userData)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
