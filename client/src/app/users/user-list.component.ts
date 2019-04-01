import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from "./user";
import {UserListService} from "./user-list.service";
import {AppComponent} from "../app.component";


@Component({
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})


export class UserListComponent implements OnInit {

  public users: User[];


  constructor(public userListService: UserListService, public appComponent: AppComponent) {}


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
