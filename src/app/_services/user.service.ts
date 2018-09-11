import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, of } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, map, tap } from "rxjs/operators";
// import { AlertService,AuthenticationService } from '../_services';
import { User } from "../_models";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private currentUser = new Subject<User>();

  public userEmitter = this.currentUser.asObservable();
  userEmitChange(usr: User) {
    this.currentUser.next(usr);
  }
  token;
  // if (localStorage.getItem('token')) {
  //     // logged in so return true
  //     return true;
  // }
  // headerUser = {
  //     headers: {
  //         Authorization: `bearer ${token}`,
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*"
  //       }
  //   };
  // token
  getToken() {
    console.log("2", environment.apiUrlCall);
    const res = this.http.post(`${environment.apiUrlCall}token`, "");
    return res.subscribe(token => {
      console.log("2", JSON.parse(JSON.stringify(token)).token);

      localStorage.setItem("token", JSON.parse(JSON.stringify(token)).token);
      this.token = localStorage.getItem("token");

      console.log("3", this.token);
      return;
    });
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrlCall}/users`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrlCall}/users/` + id);
  }

  register1(user: User) {
    return this.http.post(`${environment.apiUrlCall}/users/register`, user);
  }
  register(user: User): Observable<User> {
    this.token = localStorage.getItem("token");
      
      const  header = {
                headers: {
                    Authorization: `bearer ${this.token}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                  }
               }
    
    return this.http.post<User>(`${environment.apiUrlCall}signup`, user, header).pipe(
       tap((user: User) => console.log("5",user)),
    catchError(this.handleError<User>('registrUser'))
  );
  }
  login(email: string, password: string): Observable<any> {
    this.token = localStorage.getItem("token");
      
      const  header = {
                headers: {
                    Authorization: `bearer ${this.token}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                  }
               }
    
    return this.http.post<any>(`${environment.apiUrlCall}signin`, {Email:email,Password:password}, header).pipe(
       tap((user: User) => this.userEmitChange(user)),
    catchError(this.handleError<User>('registrUser'))
  );
  }

//   update(user: User) {
//     return this.http.put(`${environment.apiUrlCall}/users/` + user.id, user);
//   }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrlCall}/users/` + id);
  }
  // getHeroes (): Observable<any[]> {
  //       return this.http.get<any[]>(`${environment.apiUrlCall}/users/`)
  //         .pipe(
  //           tap(heroes => this.log('fetched heroes')),
  //           catchError(this.handleError('getHeroes', []))
  //         );
  //     }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //   this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
