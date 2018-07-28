import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import {FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:string;
  username:string;
  email:string;
  password:string;

  constructor(
    private validateService:ValidateService,
    private flashMessage: FlashMessagesService,
    private authService:AuthService,
    private router:Router){ }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user ={
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }
    console.log(user);
    //validate register
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Please fill in all the fields", { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //validate email

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Please use a valid email",{ cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show("You are now registered. Please login",{ cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);

      }else{
        this.flashMessage.show("Something went wrong",{ cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);


      }
    })

  }


}
