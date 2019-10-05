import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { mergeMap, map, tap, take } from 'rxjs/operators';
import { User, getUsersFunc, getUsersByCount } from '../models/users';
import { Repository } from '../models/repository';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = environment.apiUrl
  private usersSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  get LoadedUsers() {
    return this.usersSubject.value;
  }
  constructor(
    private http: HttpClient
  ) { }

  private getUsers(startingUser: number, noPerPage: number = 100): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?since=${startingUser}&per_page=${noPerPage}`);
  }

  getSpecificNumberOfUsers(noOfUsers: number, startingUserId: number = 0): Observable<User[]> {
    return noOfUsers <= this.LoadedUsers.length ?
      this.usersSubject.asObservable().pipe(map(users => users.slice(0, noOfUsers))) :
      this.getUsers(startingUserId)
        .pipe(getUsersByCount(noOfUsers, this.getUsers.bind(this)), tap(u => this.usersSubject.next(u)));
  }

  getUserById(login: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${login}`);
  }
  getUserRepos(login: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(`${this.baseUrl}/users/${login}/repos`);
  }
}

