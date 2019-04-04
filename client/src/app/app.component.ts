import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AppService} from "./app.service";

declare let gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {

  googleAuth;
  userFullName: string;
  userFirstName: string;
  userLastName: string;
  pictureUrl: string;
  userEmail: string;


  constructor(private http: HttpClient, public appService: AppService,) {

  }


  title = 'Mo-Ride';

  // This signs in the user and opens the window for signing in
  signIn() {
    this.googleAuth = gapi.auth2.getAuthInstance();
    console.log(" This is google Auth " + this.googleAuth);
    this.googleAuth.grantOfflineAccess().then((resp) => {
      localStorage.setItem('isSignedIn', 'true');
      this.sendAuthCode(resp.code);
    });
  }

  signOut() {
    this.handleClientLoad();

    this.googleAuth = gapi.auth2.getAuthInstance();

    this.googleAuth.then(() => {
      this.googleAuth.signOut();
      localStorage.setItem('isSignedIn', 'false');
      localStorage.setItem("userID", "");
      window.location.reload();
    })
  }

  // This sends the auth code of our user to the server and stores the fields in local storage when we get data back
  // from gapi
  sendAuthCode(code: string): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    this.http.post(environment.API_URL + "login", {code: code}, httpOptions)
      .subscribe(onSuccess => {
        console.log("Code sent to server");
        console.log(onSuccess["_id"]);
        console.log(onSuccess["_id"]["$oid"]);
        console.log(onSuccess["email"]);
        console.log(onSuccess["fullName"]);
        console.log(onSuccess["lastName"]);
        console.log(onSuccess["firstName"]);
        console.log(onSuccess["pictureUrl"]);
        localStorage.setItem("_id", onSuccess["_id"]);
        localStorage.setItem("oid", onSuccess["_id"]["$oid"]);
        localStorage.setItem("email", onSuccess["email"]);
        localStorage.setItem("userFullName", onSuccess["fullName"]);
        localStorage.setItem("userLastName", onSuccess["lastName"]);
        localStorage.setItem("userFirstName", onSuccess["firstName"]);
        localStorage.setItem("pictureUrl", onSuccess["pictureUrl"]);

      }, onFail => {
        console.log("ERROR: Code couldn't be sent to the server");
      });
  }


  getUserInfo () {
    this.userFullName = localStorage.getItem("userFullName");
    this.userFirstName = localStorage.getItem("userFirstName");
    this.userLastName = localStorage.getItem("userLastName");
    this.userEmail = localStorage.getItem("email");
    this.pictureUrl = localStorage.getItem("pictureUrl");
    return this.userFullName, this.userFirstName, this.userLastName,this.userEmail,this.pictureUrl;
  }

  getUsername() {
    this.userFullName = localStorage.getItem("userFullName");
    return this.userFullName;
  }

  getUserEmail() {
    this.userEmail = localStorage.getItem("email");
    return this.userEmail;
  }

  getUserPic() {
    this.pictureUrl = localStorage.getItem("pictureUrl");
    return this.pictureUrl;
  }


  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    gapi.client.init({
      'clientId': '487005316122-htt44ml0o69nnhfp0kcpfm3bardnjld3.apps.googleusercontent.com',
      'scope': 'profile email'
    });
  }


  ngOnInit() {
    this.handleClientLoad();
    this.getUserInfo();
    this.getUsername();
    this.getUserEmail();
    this.getUserPic()
    /*gapi.load('client:auth2', this.initClient);*/
  }

}
