import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [
  { path: 'list', component: UsersListComponent },
  { path: ':id', component: UserDetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'list' }
];

@NgModule({
  declarations: [UsersListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
    RouterModule.forChild(routes)
  ]
})
export class GithubUsersModule { }
