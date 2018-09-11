import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { Observable} from "rxjs";
import { User } from "../_models";
import { UserService } from "../_services";
import { AlertService,AuthenticationService } from '../_services';
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  currentUser: User;
    users: User[] = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
   
  ) {
    this.userService.userEmitter.subscribe(user => {
      this.currentUser = user;
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
    // this.loadAllUsers();
  }
  logout(){
    console.log("logout")
    this.authenticationService.logout();
    this.currentUser=null;
    this.router.navigate(["/login"]);

    
  }
  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => { 
        this.loadAllUsers() 
    });
}
  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => { 
        this.users = users; 
    });
}
}
