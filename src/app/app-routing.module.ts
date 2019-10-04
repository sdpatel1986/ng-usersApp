import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/pages/layout/layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: 'users', loadChildren: () =>
          import('./github-users/github-users.module')
            .then(m => m.GithubUsersModule)
      },
      { path: '', pathMatch: 'full', redirectTo: 'users' }]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
