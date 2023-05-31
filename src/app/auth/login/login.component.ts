import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private commonService: CommonService) { }
  errorObj: any = {}
  userDetails: any = {}
  showLoginForm: boolean = true;
  registrationForm: FormGroup;
  successMsg: any = null;
  errorMsg: any = null;
  ngOnInit(): void {
    let emailID: any = null;
    this.getuserData()
    this.loginForm = this.formBuilder.group({
      emailId: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required, Validators.maxLength(6), Validators.minLength(6)]]
    })
    this.registrationForm = this.formBuilder.group({
      first_name: ['Ajinkya', [Validators.required]],
      last_name: ['Pingale', [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone_no: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      password: [null,[Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      conf_pass: [null,[Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      address: [null]
    })
  }

  getuserData(){
    let userData = this.commonService.fetchUserData()
    this.userDetails = userData;
    if(this.userDetails?.['email']){
      this.loginForm?.patchValue({
        emailId: this.userDetails['email'] ? this.userDetails['email'] : null
      })
    }
  }

  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      let data = this.commonService.login(this.loginForm.value);
      console.log(data, typeof data)
        if(data){
          this.commonService.navigateTo('/app')
        }else{
          this.errorObj = {
            emailId: 'Please enter valid email id',
            password:'Please check your password'
          }
        }
        if(typeof data === 'string'){
          console.log(data)
          this.errorMsg = data;
        }
    }else{
      this.errorObj = {
        emailId: 'Please enter valid email id',
        password:'Please check your password'
      }
    }
  }

  signUp(){
    if(this.registrationForm.valid){
      if(this.registrationForm.value['password'] === this.registrationForm.value['conf_pass']){
        console.log(this.registrationForm.value)
        let data = this.commonService.addNewUser(this.registrationForm.value)
        if(data){
          this.registrationForm.reset();
          this.successMsg = 'User added successfully';
          this.showLoginForm = true;
        }
      }else{
        this.errorObj={
          conf_pass: 'Password and confirm password should be match'
        }
      }
    }else{
      this.errorObj = {
        first_name: 'First name is required',
      last_name: 'Last name is required',
      email: 'Please enter valid email',
      phone_no:'Phone Number is required and should be 10 digits only',
      password: 'Password is required and should be 6 digits only',
      conf_pass: 'Password and confirm password should be match'
    }
    }
  }

}
