import { Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

export interface User {
    id: number;
    avatar_url: string;
    html_url: string;
    login:string;
}
export type getUsersFunc = (startingUserId: number, noUserPerPage: number) => Observable<User[]>;

//RXJS custom Operator
export const getUsersByCount = (requiredNoOfUsers: number, getUsersFunc: getUsersFunc) => (source: Observable<User[]>) =>
  source.pipe(mergeMap((cr: User[]) => {
    let currentItemsLength = cr.length;
    if (currentItemsLength < requiredNoOfUsers) {
      return getUsersFunc(cr[currentItemsLength - 1].id, requiredNoOfUsers - currentItemsLength < 100 ?
        requiredNoOfUsers - currentItemsLength : 100).pipe(map(nr => cr.concat(nr)))
        .pipe(getUsersByCount(requiredNoOfUsers, getUsersFunc));
    } else {
      return of(cr)
    }
  }));