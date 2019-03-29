import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AppService} from "./app.service";

declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  googleAuth;

  constructor(private http: HttpClient, public appService: AppService) {
  }


  title = 'Mo-Ride';

  // This signs in the user and opens the window for signing in
  signIn() {
    this.googleAuth = gapi.auth2.getAuthInstance();
    console.log(this.googleAuth);
    this.googleAuth.grantOfflineAccess().then((resp) => {
      localStorage.setItem('isSignedIn', 'true');
      this.sendAuthCode(resp.code);
    });
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
        console.log(onSuccess["FirstName"]);
        console.log(onSuccess["LastName"]);
        localStorage.setItem("userID", onSuccess["_id"]["$oid"]);
        localStorage.setItem("userFirstName", onSuccess["FirstName"]);
        localStorage.setItem("userLastName", onSuccess["LastName"]);
        localStorage.setItem("fontSelected", onSuccess["FontSetting"]);
        localStorage.setItem("styleSelected", onSuccess["StyleSetting"]);
      }, onFail => {
        console.log("ERROR: Code couldn't be sent to the server");
      });
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
    gapi.load('client:auth2', this.initClient);
  }

}
