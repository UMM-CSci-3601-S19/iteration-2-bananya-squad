import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import{User} from "./user";
import {UserListComponent} from "./user-list.component";
import {UserListService} from "./user-list.service";
import {Observable} from "rxjs/Observable";
import {FormsModule} from '@angular/forms';
import {CustomModule} from '../custom.module';
import {MatDialog} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';


describe('User list', () => {

  let userList: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  let userListServiceStub: {
    getUsers: () => Observable<User[]>
  };

  beforeEach(()=> {
    userListServiceStub = {
      getUsers: () => Observable.of([
        {
          _id: Object(),
          userId: '556305803996218700000',
          email:'Aeora22@gmail.com',
          fullName:'Montoya Underwood',
          pictureUrl:'https://picsum.photos/200/300/?random',
          lastName:'Underwood',
          firstName:'Montoya'
        },
        {
          _id: Object(),
          userId: '879272106120580200000',
          email:'Extro13@gmail.com',
          fullName:'Cardenas Casey',
          pictureUrl:'https://picsum.photos/200/300/?random',
          lastName:'Casey',
          firstName:'Cardenas'
        },
        {
          _id: Object(),
          userId: '576582150801152500000',
          email:'Illumity19@gmail.com',
          fullName:'Oneil Everett',
          pictureUrl:'https://picsum.photos/200/300/?random',
          lastName:'Everett',
          firstName:'Oneil'
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [UserListComponent],
      providers: [{provide: UserListService, useValue: userListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(UserListComponent);
      userList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

});
