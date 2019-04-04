import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {User} from "./user";
import {UserListService} from "./user-list.service";

describe( 'User list service: ', () => {
    const testUsers: User[] = [
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
    ];

    let userListService: UserListService;

    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);

      userListService = new UserListService(httpClient);
    });

    afterEach(() => {
      httpTestingController.verify();
    });


    it('getUsers() calls api/user', () => {

      userListService.getUsers().subscribe(
        users => expect(users).toBe(testUsers)
      );

      const req = httpTestingController.expectOne(userListService.baseUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testUsers);
    });

});

