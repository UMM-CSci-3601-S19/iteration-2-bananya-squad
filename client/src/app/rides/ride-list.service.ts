import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Ride} from "./ride";

@Injectable()
export class RideListService {
  readonly baseUrl: string = environment.API_URL + 'rides';
  private rideUrl: string = this.baseUrl;
  public hour: string;
  public minute: string;

  constructor(private http: HttpClient) {

  }

  getRides(searchedDestination: string, searchedOrigin: string, searchedDate: string, searchedTime: string, searchedRoundTrip: boolean): Observable<Ride[]> {
    console.log("searched Destination to getRides is " + searchedDestination);
    console.log("searched Origin to getRides is " + searchedOrigin);
    console.log("searched date to getRides is " + searchedDate);
    console.log("searched time to getRides is " + searchedTime);
    console.log("searched roundTrip to getRides is " + searchedRoundTrip);

    console.log("Ride Url before filter By PARAMETERS " + this.rideUrl);

    this.filterByParameters(searchedDestination,searchedOrigin,searchedDate,searchedTime,searchedRoundTrip);

    console.log("Ride Url after filter By PARAMETERS " + this.rideUrl);

    return this.http.get<Ride[]>(this.rideUrl);
  }


  //This could be changed into a getRideById if we decide to ad id as a field
  getRideByDestination(destination: string): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + destination);
  }

  getRideByRoundTrip(roundTrip: boolean): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + roundTrip.toString());
  }



  addNewRide(newRide: Ride): Observable<string> {
    console.log("This the format of departure date when adding " + newRide.departureDate);
    const httpOptions = {
      headers: new HttpHeaders({
        // We're sending JSON
        'Content-Type': 'application/json'
      }),
      // But we're getting a simple (text) string in response
      // The server sends the hex version of the new ride back
      // so we know how to find/access that ride again later.
      responseType: 'text' as 'json'
    };

    // Send post request to add a new ride with the ride data as the body with specified headers.
    return this.http.post<string>(this.rideUrl + '/new', newRide, httpOptions);
  }



  editRide(editedRide: Ride): Observable<string> {
    console.log("The edited Time NON FORMAT and passed was " + editedRide.departureTime);

    this.hour = editedRide.departureTime.split(":",2)[0];
    this.minute = editedRide.departureTime.split(":",2)[1];

    console.log("The hour is " + this.hour );
    console.log("The minute is " + this.minute);

    if(this.minute.includes("PM")){
      this.hour = (parseInt(this.hour) + 12).toString();
    }

    if(this.minute.includes("AM")){
      if(parseInt(this.hour)<10){
        this.hour = "0" + this.hour;
      }
    }

    this.minute = this.minute.replace(" PM","");
    this.minute = this.minute.replace(" AM","");

    editedRide.departureTime = this.hour + ":" + this.minute;

    console.log("The edited Time formatted and passed was " + editedRide.departureTime);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };

    return this.http.post<string>(this.rideUrl + '/update', editedRide, httpOptions);
  }


  deleteRide(deleteId: String): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    let deleteDoc: string = "{ \"_id\": \"" + deleteId + "\"}";

    return this.http.post<string>(this.rideUrl + '/remove', deleteDoc, httpOptions);
  }


  // Helper Functions

  public hasSearched(): boolean {
    status = localStorage.getItem('searched');
    if (status == 'true') { return true;}
    else {return false;}
  }

  filterByParameters(rideDestination: string, rideOrigin: string, rideDate: string, rideTime: string, rideRoundTrip: boolean): void {

    // Filtering by destination
    if (!(rideDestination == null || rideDestination === '')) {
      if (this.parameterPresent('destination=')) {
        // there was a previous search by destination that we need to clear
        this.removeParameter('destination=');
      }
      if (this.rideUrl.indexOf('?') !== -1) {
        // there was already some information passed in this url
        this.rideUrl += 'destination=' + rideDestination + '&';
      } else {
        // this was the first bit of information to pass in the url
        this.rideUrl += '?destination=' + rideDestination + '&';
      }
    } else {
      // there was nothing in the box to put onto the URL... reset
      if (this.parameterPresent('destination=')) {
        let start = this.rideUrl.indexOf('destination=');
        const end = this.rideUrl.indexOf('&', start);
        if (this.rideUrl.substring(start - 1, start) === '?') {
          start = start - 1;
        }
        this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
      }
    }


    // Filtering by origin
    if (!(rideOrigin == null || rideOrigin === '')) {
      if (this.parameterPresent('origin=')) {
        // there was a previous search by origin that we need to clear
        this.removeParameter('origin=');
      }
      if (this.rideUrl.indexOf('?') !== -1) {
        // there was already some information passed in this url
        this.rideUrl += 'origin=' + rideOrigin + '&';
      } else {
        // this was the first bit of information to pass in the url
        this.rideUrl += '?origin=' + rideOrigin + '&';
      }
    } else {
      // there was nothing in the box to put onto the URL... reset
      if (this.parameterPresent('origin=')) {
        let start = this.rideUrl.indexOf('origin=');
        const end = this.rideUrl.indexOf('&', start);
        if (this.rideUrl.substring(start - 1, start) === '?') {
          start = start - 1;
        }
        this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
      }
    }

    // Filtering by departureDate
    if (!(rideDate == null || rideDate === '')) {
      if (this.parameterPresent('departureDate=')) {
        // there was a previous search by destination that we need to clear
        this.removeParameter('departureDate=');
      }
      if (this.rideUrl.indexOf('?') !== -1) {
        // there was already some information passed in this url
        this.rideUrl += 'departureDate=' + rideDate + '&';
      } else {
        // this was the first bit of information to pass in the url
        this.rideUrl += '?departureDate=' + rideDate + '&';
      }
    } else {
      // there was nothing in the box to put onto the URL... reset
      if (this.parameterPresent('departureDate=')) {
        let start = this.rideUrl.indexOf('departureDate=');
        const end = this.rideUrl.indexOf('&', start);
        if (this.rideUrl.substring(start - 1, start) === '?') {
          start = start - 1;
        }
        this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
      }
    }

    // Filtering by departureTime
    if (!(rideTime == null || rideTime === '')) {
      if (this.parameterPresent('departureTime=')) {
        // there was a previous search by destination that we need to clear
        this.removeParameter('departureTime=');
      }
      if (this.rideUrl.indexOf('?') !== -1) {
        // there was already some information passed in this url
        this.rideUrl += 'departureTime=' + rideTime + '&';
      } else {
        // this was the first bit of information to pass in the url
        this.rideUrl += '?departureTime=' + rideTime + '&';
      }
    } else {
      // there was nothing in the box to put onto the URL... reset
      if (this.parameterPresent('departureTime=')) {
        let start = this.rideUrl.indexOf('departureTime=');
        const end = this.rideUrl.indexOf('&', start);
        if (this.rideUrl.substring(start - 1, start) === '?') {
          start = start - 1;
        }
        this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
      }
    }

    // Filtering by roundTrip
    if (!(rideRoundTrip == null)) {
      if (this.parameterPresent('roundTrip=')) {
        // there was a previous search by destination that we need to clear
        this.removeParameter('roundTrip=');
      }
      if (this.rideUrl.indexOf('?') !== -1) {
        // there was already some information passed in this url
        this.rideUrl += 'roundTrip=' + rideRoundTrip + '&';
      } else {
        // this was the first bit of information to pass in the url
        this.rideUrl += '?roundTrip=' + rideRoundTrip + '&';
      }
    } else {
      // there was nothing in the box to put onto the URL... reset
      if (this.parameterPresent('roundTrip=')) {
        let start = this.rideUrl.indexOf('roundTrip=');
        const end = this.rideUrl.indexOf('&', start);
        if (this.rideUrl.substring(start - 1, start) === '?') {
          start = start - 1;
        }
        this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end + 1);
      }
    }


  }

  private parameterPresent(searchParam: string) {
    return this.rideUrl.indexOf(searchParam) !== -1;
  }

  //remove the parameter and, if present, the &
  private removeParameter(searchParam: string) {
    let start = this.rideUrl.indexOf(searchParam);
    let end = 0;
    if (this.rideUrl.indexOf('&') !== -1) {
      end = this.rideUrl.indexOf('&', start) + 1;
    } else {
      end = this.rideUrl.indexOf('&', start);
    }
    this.rideUrl = this.rideUrl.substring(0, start) + this.rideUrl.substring(end);
  }

}
