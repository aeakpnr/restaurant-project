import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  checkVal:any
  selected: boolean = false;
  authForm = new FormGroup ({
    switch: new FormControl(),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {


  }
  login(){
    this.authService.signinEmailService(this.authForm.value.email!,this.authForm.value.password!).then((res)=>{

    })
  }
}
