import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from "./user";
import {UserListService} from "./user-list.service";


@Component({
  templateUrl: 'user-list.component.html',
})


export class UserListComponent implements OnInit {

  public users: User[];


  constructor(public userListService: UserListService) {}


  refreshUsers(): Observable<User[]> {

    const users: Observable<User[]> = this.userListService.getUsers();
    users.subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.log(err);
      });
    return users;
  }


  ngOnInit(): void {
    this.refreshUsers();
  }
}
