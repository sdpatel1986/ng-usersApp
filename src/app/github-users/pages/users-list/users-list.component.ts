import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { User } from '../../models/users';
import { FormBuilder, FormControl } from '@angular/forms';
import { map, startWith, tap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>
  filteredUsers$: Observable<User[]>;
  searchControl: FormControl;
  search: (term: string, users: User[]) => User[];
  constructor(private userService: UsersService,
    private fb: FormBuilder) {
    this.searchControl = this.fb.control('');
  }
  ngOnInit() {
    this.users$ = this.userService.getSpecificNumberOfUsers(1000)
      .pipe(tap(users => {
        this.search = this.memoizedSearchFunc();
        this.filteredUsers$ = this.searchControl.valueChanges
          .pipe(startWith(''), distinctUntilChanged(), map(v => this.search(v, users)))
        // I think no need to use debounceTime here as it's already searching the cached data
      }));

  }
  searchMethod(users: any[], searchValue: string) {
    const lowerCaseValue = searchValue.toLocaleLowerCase();
    const searchFragments = lowerCaseValue.split(' ').length > 0 ? lowerCaseValue.split(' ') : [lowerCaseValue];
    return users.filter(x => searchFragments.every(y => x.login.toLocaleLowerCase().includes(y)));
  }

  memoizedSearchFunc = () => {
    let cache = {};
    return (n, users) => {
      if (!n) { return users; }
      if (n in cache) {
        return cache[n];
      }
      else {
        let result = this.searchMethod(users, n);
        cache[n] = result;
        return result;
      }
    }
  }

}
