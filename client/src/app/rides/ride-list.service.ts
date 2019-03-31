import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Ride} from "./ride";

@Injectable()
export class RideListService {
  readonly baseUrl: string = environment.API_URL + 'rides';
  private rideUrl: string = this.baseUrl;

  constructor(private http: HttpClient) {

  }

  getRides(searchedDestination?: string, searchedOrigin?: string): Observable<Ride[]> {
    console.log("searched Destination to getRides is " + searchedDestination);
    console.log("searched Origin to getRides is " + searchedOrigin);

    console.log("Ride Url before filter By Destination" + this.rideUrl);
    this.filterByDestination(searchedDestination);
    console.log("Ride Url after filter By Destination" + this.rideUrl);

    console.log("Ride Url before filter By Origin" + this.rideUrl);
    this.filterByOrigin(searchedOrigin);
    console.log("Ride Url after filter By Origin" + this.rideUrl);


    return this.http.get<Ride[]>(this.rideUrl);
  }


  //This could be changed into a getRideById if we decide to ad id as a field
  getRideByDestination(destination: string): Observable<Ride> {
    return this.http.get<Ride>(this.rideUrl + '/' + destination);
  }


  filterByDestination(rideDestination?: string): void {
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
  }

  filterByOrigin(rideOrigin?: string): void {
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

  addNewRide(newRide: Ride): Observable<string> {
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

  public hasSearched(): boolean {
    status = localStorage.getItem('searched');
    if (status == 'true') { return true;}
    else {return false;}
  }

}
