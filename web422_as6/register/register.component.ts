import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser = {
    userName: "",
    password: "",
    password2: ""
  };
  warning: any;
  success = false;
  loading = false;

  registerSub: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onSubmit(): void{
    if(this.registerUser.userName.length > 0 && this.registerUser.password.length > 0 && this.registerUser.password2.length > 0) {
      this.loading = true;
      this.registerSub =  this.authService.register(this.registerUser).subscribe(
        success => {
          this.warning = null;
          this.success = true;
          this.loading = false;
        }, err => {
          this.warning = err.error.message;
          this.success = false;
          this.loading = false;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.registerSub && this.registerSub.unsubscribe();
  }

}