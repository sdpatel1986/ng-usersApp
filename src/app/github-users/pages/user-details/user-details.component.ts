import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { Repository } from '../../models/repository';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetails$: Observable<User>;
  userRepos$: Observable<Repository[]>;
  constructor(private router: ActivatedRoute,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.userDetails$ = this.userService.getUserById(this.router.snapshot.params.id);
    this.userRepos$ = this.userService.getUserRepos(this.router.snapshot.params.id);
  }

}
