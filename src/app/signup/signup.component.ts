import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { AlertService, UserService } from '../_services';

// import { LoadingService } from './../../servies/loading.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
    loading = false;
    submitted = false;
    Password = 'password';
  token;


  constructor(
    
    private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
  ) {
    console.log("environment.apiUrl",environment.apiUrl);
   }
   
   
  ngOnInit() {
    
    this.token=this.userService.getToken();
    console.log("1");
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['',[ Validators.required,  Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['']
      }, {validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.Password.value;
  let confirmPass = group.controls.ConfirmPassword.value;
  let compare=pass === confirmPass ? null : { notSame: true }    
  // console.log("checkPasswords",group,compare,pass,confirmPass);
  return compare;
}
   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
       this.submitted = true;
       

       // stop here if form is invalid
       if (this.registerForm.invalid) {
        console.log("registerForm",this.registerForm);
           return;
       }

       this.loading = true;
       this.userService.register(this.registerForm.value)
           .pipe(first())
           .subscribe(
               data => {
                 if(data===undefined){
                  this.alertService.error('User Exist', true);
                  this.loading = false;
                   return 
                 }
                   this.alertService.success('Registration successful', true);
                   this.router.navigate(['/login']);
               },
               error => {
                   this.alertService.error(error);
                   this.loading = false;
               });
   }


}

