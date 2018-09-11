import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// used to create fake backend
// import { fakeBackendProvider } from "./_helpers";
import { AlertComponent } from "./_directives";
import { AlertService, AuthenticationService, UserService,  } from './_services';
import { ApiService } from './_services/api.service';
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { AuthGuard } from "./_guards";
import { ListMessageComponent } from "./list-message/list-message.component";
import { ListTestComponent } from "./list-test/list-test.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { NavbarComponent } from "./navbar/navbar.component";
// import { CompareValidatorDirective } from './_directives/compare-validator.directive';
// import { MyNavComponent } from './my-nav/my-nav.component';
// import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
// Modules

// import { LoadingModule } from 'ngx-loading';

// Guards

// Services

// import { LoadingService } from './servies/loading.service';

const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "/home" },
  { path: "home", component: ListMessageComponent, canActivate: [AuthGuard] },
  // { path: "home", component: ListMessageComponent},
  { path: "test", component: ListTestComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent }
  // { path: '**', redirectTo: '/login' }
  // { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    ListMessageComponent,
    ListTestComponent,
    SignupComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent
   
  ],
  imports: [
  
  BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    UserService,
    AlertService,
    AuthenticationService,
    ApiService ,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
